import { buildGlossaryPrompt, getNavigateToolPaths, getPageLabel } from './marco-glossary';

/**
 * Marco Agent -- LLM-powered agent that observes the page and acts on it.
 *
 * Responsibilities:
 *  1. Scan the DOM for interactive elements (buttons, links, tabs, inputs)
 *  2. Build context (page hints + visible elements + conversation history)
 *  3. Call Claude via /api/marco proxy
 *  4. Execute tool calls (click, navigate, go_back) returned by Claude
 *  5. Return text responses to the UI
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AgentMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AgentAction {
  type: "click" | "navigate" | "go_back" | "highlight" | "fill_input" | "select_option" | "check_checkbox" | "set_timeout";
  /** For click: the element index from the scanned list */
  elementIndex?: number;
  /** For navigate: the path */
  path?: string;
  /** For fill_input / select_option / check_checkbox: the value to set */
  value?: string;
  /** Human-readable narration */
  narration?: string;
  /** For set_timeout: delay in milliseconds */
  delayMs?: number;
  /** For set_timeout: the follow-up message to inject when the timer fires */
  message?: string;
}

export interface AgentResponse {
  text: string;
  actions: AgentAction[];
  /** Whether Claude wants to continue after tool execution */
  continueLoop: boolean;
  /** Raw content blocks from Claude (needed for tool-result follow-up) */
  rawContent: Array<{ type: string; [key: string]: unknown }>;
}

export interface InteractiveElement {
  index: number;
  tag: string;
  text: string;
  type?: string;      // "button" | "link" | "tab" | "input" | "select"
  href?: string;
  ariaLabel?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  label?: string;
}

// ---------------------------------------------------------------------------
// DOM Scanner
// ---------------------------------------------------------------------------

const INTERACTIVE_SELECTOR = [
  'button:not([aria-label="Close Marco"]):not([aria-label="Ask Marco for help"])',
  'a[href]',
  '[role="button"]',
  '[role="tab"]',
  '[role="link"]',
  'input:not([type="hidden"])',
  'select',
  'textarea',
].join(', ');

/** Scan the current page for visible interactive elements. */
export function scanInteractiveElements(): InteractiveElement[] {
  const els = Array.from(document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTOR));
  const results: InteractiveElement[] = [];
  const seen = new Set<string>();

  for (const el of els) {
    // Skip invisible — use getComputedStyle + bounding rect instead of offsetParent
    // (offsetParent is null for position:fixed elements and their children in some browsers)
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    // Skip Marco's own UI
    if (el.closest('[data-marco-ui]')) continue;

    const tag = el.tagName.toLowerCase();
    const text = (el.textContent || '').trim().substring(0, 80);
    const ariaLabel = el.getAttribute('aria-label') || undefined;
    const href = (el as HTMLAnchorElement).href ? (el as HTMLAnchorElement).getAttribute('href') || undefined : undefined;
    const disabled = (el as HTMLButtonElement).disabled || el.getAttribute('aria-disabled') === 'true';

    // Determine element type
    let type: string;
    if (el.getAttribute('role') === 'tab') type = 'tab';
    else if (tag === 'a') type = 'link';
    else if (tag === 'button' || el.getAttribute('role') === 'button') type = 'button';
    else if (tag === 'input') type = 'input';
    else if (tag === 'select') type = 'select';
    else if (tag === 'textarea') type = 'textarea';
    else type = 'button';

    // Capture input-specific fields
    const isFormEl = type === 'input' || type === 'select' || type === 'textarea';
    const placeholder = isFormEl ? (el.getAttribute('placeholder') || undefined) : undefined;
    const value = isFormEl ? ((el as HTMLInputElement).value || el.getAttribute('defaultValue') || '') : undefined;

    // Resolve label: data-agent-label > <label> sibling/parent > .space-y-2 parent label > placeholder > ariaLabel
    let label: string | undefined;
    if (isFormEl) {
      label = el.getAttribute('data-agent-label') || undefined;
      if (!label) {
        // Check for <label> with for=el.id
        if (el.id) {
          const forLabel = document.querySelector<HTMLLabelElement>(`label[for="${el.id}"]`);
          if (forLabel) label = forLabel.textContent?.trim();
        }
        // Check parent if it's a <label>
        if (!label && el.parentElement?.tagName === 'LABEL') {
          label = el.parentElement.textContent?.trim();
        }
      }
      if (!label) {
        const spaceParent = el.closest('.space-y-2');
        if (spaceParent) {
          const firstLabel = spaceParent.querySelector('label');
          if (firstLabel) label = firstLabel.textContent?.trim();
        }
      }
      if (!label) label = placeholder;
      if (!label) label = ariaLabel;
    }

    // Deduplicate — use label/placeholder for form elements, text+ariaLabel for others
    const key = isFormEl ? `${type}:${label || ''}:${placeholder || ''}` : `${type}:${text}:${ariaLabel || ''}:${href || ''}`;
    if (seen.has(key)) continue;
    seen.add(key);

    // Skip empty text elements (except inputs/selects)
    if (!text && !ariaLabel && !isFormEl) continue;

    results.push({
      index: results.length,
      tag,
      text: text || ariaLabel || '',
      type,
      href,
      ariaLabel,
      disabled,
      placeholder,
      value,
      label,
    });
  }

  return results;
}

/** Find the real DOM element corresponding to a scanned InteractiveElement index. */
function findElementByIndex(index: number): HTMLElement | null {
  const allScanned = scanInteractiveElements();
  const target = allScanned[index];
  if (!target) return null;

  const els = Array.from(document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTOR));
  const seen = new Set<string>();
  let currentIndex = 0;

  for (const el of els) {
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    if (el.closest('[data-marco-ui]')) continue;

    const tag = el.tagName.toLowerCase();
    const text = (el.textContent || '').trim().substring(0, 80);
    const ariaLabel = el.getAttribute('aria-label') || undefined;
    const href = (el as HTMLAnchorElement).href ? (el as HTMLAnchorElement).getAttribute('href') || undefined : undefined;

    let type: string;
    if (el.getAttribute('role') === 'tab') type = 'tab';
    else if (tag === 'a') type = 'link';
    else if (tag === 'button' || el.getAttribute('role') === 'button') type = 'button';
    else if (tag === 'input') type = 'input';
    else if (tag === 'select') type = 'select';
    else if (tag === 'textarea') type = 'textarea';
    else type = 'button';

    const isFormEl = type === 'input' || type === 'select' || type === 'textarea';
    const placeholder = isFormEl ? (el.getAttribute('placeholder') || undefined) : undefined;

    let label: string | undefined;
    if (isFormEl) {
      label = el.getAttribute('data-agent-label') || undefined;
      if (!label && el.id) {
        const forLabel = document.querySelector<HTMLLabelElement>(`label[for="${el.id}"]`);
        if (forLabel) label = forLabel.textContent?.trim();
      }
      if (!label && el.parentElement?.tagName === 'LABEL') {
        label = el.parentElement.textContent?.trim();
      }
      if (!label) {
        const spaceParent = el.closest('.space-y-2');
        if (spaceParent) {
          const firstLabel = spaceParent.querySelector('label');
          if (firstLabel) label = firstLabel.textContent?.trim();
        }
      }
      if (!label) label = placeholder;
      if (!label) label = ariaLabel;
    }

    const key = isFormEl ? `${type}:${label || ''}:${placeholder || ''}` : `${type}:${text}:${ariaLabel || ''}:${href || ''}`;
    if (seen.has(key)) continue;
    seen.add(key);

    if (!text && !ariaLabel && !isFormEl) continue;


    if (currentIndex === index) return el;
    currentIndex++;
  }
  return null;
}

// ---------------------------------------------------------------------------
// DOM Actions
// ---------------------------------------------------------------------------

function highlightElement(el: HTMLElement) {
  const ring = document.createElement('div');
  const rect = el.getBoundingClientRect();
  Object.assign(ring.style, {
    position: 'fixed',
    top: `${rect.top - 3}px`,
    left: `${rect.left - 3}px`,
    width: `${rect.width + 6}px`,
    height: `${rect.height + 6}px`,
    border: '2px solid #06b6d4',
    borderRadius: '8px',
    pointerEvents: 'none',
    zIndex: '99999',
    boxShadow: '0 0 12px rgba(6, 182, 212, 0.4)',
    transition: 'opacity 0.3s ease-out',
  });
  document.body.appendChild(ring);
  setTimeout(() => { ring.style.opacity = '0'; }, 1500);
  setTimeout(() => { ring.remove(); }, 1800);
}

function clickElement(el: HTMLElement) {
  el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  highlightElement(el);
  setTimeout(() => {
    el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  }, 600);
}

// ---------------------------------------------------------------------------
// System prompt
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are Marco, an AI assistant embedded in the Matcherino tournament platform. You help users operate the website by clicking buttons, filling forms, navigating pages, and answering questions.

## Personality
- Friendly, direct, efficient. Not robotic.
- Short, clear sentences. No rambling.
- Narrate what you're doing so the user isn't surprised.

## Critical Rules
1. ALWAYS check CURRENT PAGE PATH before using navigate. If the user is already on that page, say so — do NOT navigate again.
2. To interact with anything on the current page (buttons, links, tabs, tournament cards, etc.), use click_element with the matching index from INTERACTIVE ELEMENTS. Do NOT use navigate for on-page actions.
3. To change a field value, use fill_input with the element's index and the new value. Do NOT click an input and then try to type.
4. Confirm before destructive actions (publishing, deleting, payouts).
5. Never guess. If info is missing, ask.
6. Stay on Matcherino. Don't navigate to external sites unless asked.
7. For Brawl Stars PIN / Supercell ID issues, redirect to Brawl Stars Discord: https://discord.gg/AYna5z4RtF

## How to Act

### Filling form fields
The interactive elements list shows inputs with their label, current value, and placeholder.
To change a field:
1. Find the input in the list by matching its label (e.g., label="Tournament Name").
2. Use fill_input with that element's index and the new value.
3. After filling, tell the user what you changed and remind them to click Save if needed.
4. For dropdowns, use select_option with the option text.
5. For checkboxes, use check_checkbox with checked=true/false.

### Clicking on-page elements
You receive a numbered list of INTERACTIVE ELEMENTS visible on the page. Each has an index, type, text label, and optional href. To click anything on the current page:
1. Find the element in the list by matching its text/label to what the user asked for.
2. Use click_element with that element's index number.
3. If the user says something vague like \"click on a tournament\", find the first tournament link in the interactive elements list and click it.
4. Users often refer to elements by their visual icon (heart, bell, gear, arrow, etc.). Icon-only buttons include the icon name in parentheses in their label, e.g. \"Liked tournaments (heart icon)\". When a user says \"click the heart\" or \"the bell icon\", match against labels containing that icon name.
5. If you can't find a matching element, tell the user what you see and ask them to clarify.

### Admin operations
When the user asks to change tournament settings (name, dates, format, etc.):
1. Check if you're already in Admin Mode by looking for admin-prefixed tabs in the interactive elements.
2. If NOT in admin mode, click the "Enter Admin Mode" button first, then tell the user you're entering admin mode.
3. Once in admin mode, navigate to the right admin tab (e.g., "General" for name/description, "Bracket" for format).
4. Find the input by its label and use fill_input to set the new value.
5. Click the Save button to persist changes.
6. Do NOT stop after entering admin mode — complete the full operation.

### Navigation
- Use navigate ONLY to go to a different page (different path).
- ALWAYS compare the requested path to CURRENT PAGE PATH first.
- If the user is already on the requested page, tell them and ask what they'd like to do there instead.

### General questions
For general questions about Matcherino, just respond with text — no tool needed.

### Setting timeouts
- Use set_timeout when you need to wait before checking or doing something.
- Examples: "check if the bracket updated in 30 seconds", "remind me to save in 2 minutes".
- When the timer fires, you receive the message as a new turn and can act on it (click, navigate, check state, respond).
- Maximum delay: 300 seconds (5 minutes). Minimum: 1 second.
- Tell the user what you're scheduling and why.

## Matcherino Knowledge
- Tournaments have: title, game, format, dates, entry fee, prize pool, rules
- Bracket formats: Single Elim, Double Elim, Round Robin, Swiss
- Prize pools grow via crowdfunding contributions (marketplace pins/items)
- Tax interview required before payouts. Retake: Profile icon > Retake Interview.
- W-8BEN \"submit disabled\" = not all checkboxes checked (not a bug)
- PayPal cashouts: automatic. Bank wire: email brian@matcherino.com
- Discord unlinking: must be done by Matcherino support
- ESL/FACEIT prizes: https://matcherino.com/esl

${buildGlossaryPrompt()}`;

// ---------------------------------------------------------------------------
// Tool schemas for Claude
// ---------------------------------------------------------------------------

const TOOLS = [
  {
    name: "click_element",
    description: "Click an interactive element on the current page. Use the element's index from the interactive_elements list provided in context. The element will be highlighted briefly before clicking.",
    input_schema: {
      type: "object" as const,
      properties: {
        element_index: {
          type: "number" as const,
          description: "The index of the element to click from the interactive_elements list",
        },
        narration: {
          type: "string" as const,
          description: "Brief description of what you're clicking and why (shown to user)",
        },
      },
      required: ["element_index", "narration"],
    },
  },
  {
    name: "navigate",
    description: `Navigate to a different page on Matcherino. Available pages: ${getNavigateToolPaths()}. Check the current_path first — if already there, tell the user instead.`,
    input_schema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string" as const,
          description: "The path to navigate to (e.g. '/profile', '/events')",
        },
        narration: {
          type: "string" as const,
          description: "Brief description shown to user",
        },
      },
      required: ["path", "narration"],
    },
  },
  {
    name: "go_back",
    description: "Go back to the previous page in browser history.",
    input_schema: {
      type: "object" as const,
      properties: {
        narration: {
          type: "string" as const,
          description: "Brief description shown to user",
        },
      },
      required: ["narration"],
    },
  },
  {
    name: "fill_input",
    description: "Type a value into a text input, textarea, or contentEditable field on the current page. Use the element's index from the interactive_elements list. This clears the existing value and types the new one.",
    input_schema: {
      type: "object" as const,
      properties: {
        element_index: {
          type: "number" as const,
          description: "The index of the input element from the interactive_elements list",
        },
        value: {
          type: "string" as const,
          description: "The text value to type into the input",
        },
        narration: {
          type: "string" as const,
          description: "Brief description of what you're doing (shown to user)",
        },
      },
      required: ["element_index", "value", "narration"],
    },
  },
  {
    name: "select_option",
    description: "Select an option from a dropdown/select element. Use the element's index and provide the option text or value to select.",
    input_schema: {
      type: "object" as const,
      properties: {
        element_index: {
          type: "number" as const,
          description: "The index of the select element from the interactive_elements list",
        },
        value: {
          type: "string" as const,
          description: "The option text or value to select",
        },
        narration: {
          type: "string" as const,
          description: "Brief description shown to user",
        },
      },
      required: ["element_index", "value", "narration"],
    },
  },
  {
    name: "check_checkbox",
    description: "Check or uncheck a checkbox input. Use the element's index from the interactive_elements list.",
    input_schema: {
      type: "object" as const,
      properties: {
        element_index: {
          type: "number" as const,
          description: "The index of the checkbox element from the interactive_elements list",
        },
        checked: {
          type: "boolean" as const,
          description: "Whether to check (true) or uncheck (false) the checkbox",
        },
        narration: {
          type: "string" as const,
          description: "Brief description shown to user",
        },
      },
      required: ["element_index", "checked", "narration"],
    },
  },
  {
    name: "set_timeout",
    description: "Set a timer that will send a follow-up message to yourself after a delay. Use this when you need to wait before checking something (e.g., wait for a bracket to update, poll for registration changes, remind the user about something). When the timer fires, you will receive the message as a new user message and can act on it. Maximum delay: 300 seconds (5 minutes).",
    input_schema: {
      type: "object" as const,
      properties: {
        delay_seconds: {
          type: "number" as const,
          description: "How many seconds to wait before firing (1–300)",
        },
        message: {
          type: "string" as const,
          description: "The instruction/reminder that will be sent to you when the timer fires (e.g., 'Check if the bracket has been updated' or 'Remind the user to save their changes')",
        },
        narration: {
          type: "string" as const,
          description: "Brief description shown to user (e.g., 'Setting a 30-second reminder')",
        },
      },
      required: ["delay_seconds", "message", "narration"],
    },
  },

];

// ---------------------------------------------------------------------------
// LLM API call
// ---------------------------------------------------------------------------

export interface ClaudeMessage {
  role: "user" | "assistant";
  content: string | Array<{ type: string; [key: string]: unknown }>;
}

interface ClaudeToolUse {
  type: "tool_use";
  id: string;
  name: string;
  input: Record<string, unknown>;
}

interface ClaudeTextBlock {
  type: "text";
  text: string;
}

interface ClaudeResponse {
  content: Array<ClaudeTextBlock | ClaudeToolUse>;
  stop_reason: string;
  error?: { message: string };
}

/**
 * Build the context-enriched user message with current page state.
 */
export function buildContextBlock(
  userMessage: string,
  pageContext: string | null,
  elements: InteractiveElement[],
): string {
  const elementList = elements.map((el) => {
    const isFormEl = el.type === 'input' || el.type === 'select' || el.type === 'textarea';
    let desc: string;
    if (isFormEl) {
      desc = `[${el.index}] ${el.type} (label="${el.label || ''}", value="${el.value || ''}", placeholder="${el.placeholder || ''}")`;
    } else {
      desc = `[${el.index}] ${el.type}: "${el.text}"`;
    }
    if (el.href) desc += ` (href=${el.href})`;
    if (el.disabled) desc += ` [disabled]`;
    return desc;
  }).join('\n');

  const currentPath = window.location.pathname;
  return [
    `## Current State`,
    `CURRENT PAGE PATH: ${currentPath}`,
    `YOU ARE ON: ${getPageLabel(currentPath)}`,
    '',
    pageContext ? `## Page Context\n${pageContext}` : '## Page Context\n(none available)',
    '',
    `## Interactive Elements on Page (use these indices with click_element)`,
    elementList || '(no interactive elements found)',
    '',
    `## User Message`,
    userMessage,
  ].join('\n');
}

/**
 * Call Claude via the /api/marco proxy.
 *
 * Supports two modes:
 * 1. Initial call: pass userMessage + history + context
 * 2. Continuation: pass rawMessages directly (for tool-result follow-up)
 */
export async function callMarco(
  userMessage: string,
  history: AgentMessage[],
  pageContext: string | null,
  elements: InteractiveElement[],
  /** If provided, these raw messages are sent instead of building from history */
  rawMessages?: ClaudeMessage[],
): Promise<AgentResponse> {
  let messages: ClaudeMessage[];

  if (rawMessages) {
    messages = rawMessages;
  } else {
    const contextBlock = buildContextBlock(userMessage, pageContext, elements);
    messages = [];
    for (const msg of history) {
      messages.push({ role: msg.role, content: msg.content });
    }
    messages.push({ role: "user", content: contextBlock });
  }

  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    tools: TOOLS,
    messages,
  };

  const resp = await fetch('/api/marco', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (resp.status === 503) {
    throw new Error('no_api_key');
  }

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`API error ${resp.status}: ${err}`);
  }

  const data: ClaudeResponse = await resp.json();
  if (data.error) {
    throw new Error(data.error.message);
  }

  // Parse response
  const textParts: string[] = [];
  const actions: AgentAction[] = [];

  for (const block of data.content) {
    if (block.type === 'text') {
      textParts.push((block as ClaudeTextBlock).text);
    } else if (block.type === 'tool_use') {
      const tool = block as ClaudeToolUse;
      const input = tool.input;
      switch (tool.name) {
        case 'click_element':
          actions.push({
            type: 'click',
            elementIndex: input.element_index as number,
            narration: input.narration as string,
          });
          break;
        case 'navigate':
          actions.push({
            type: 'navigate',
            path: input.path as string,
            narration: input.narration as string,
          });
          break;
        case 'go_back':
          actions.push({
            type: 'go_back',
            narration: input.narration as string,
          });
          break;
        case 'fill_input':
          actions.push({
            type: 'fill_input',
            elementIndex: input.element_index as number,
            value: input.value as string,
            narration: input.narration as string,
          });
          break;
        case 'select_option':
          actions.push({
            type: 'select_option',
            elementIndex: input.element_index as number,
            value: input.value as string,
            narration: input.narration as string,
          });
          break;
        case 'check_checkbox':
          actions.push({
            type: 'check_checkbox',
            elementIndex: input.element_index as number,
            value: String(input.checked),
            narration: input.narration as string,
          });
          break;
        case 'set_timeout': {
          const delaySec = Math.max(1, Math.min(300, input.delay_seconds as number));
          actions.push({
            type: 'set_timeout',
            delayMs: delaySec * 1000,
            message: input.message as string,
            narration: input.narration as string,
          });
          break;
        }
      }
    }
  }

  return {
    text: textParts.join('\n\n') || (actions.length > 0 ? '' : 'I\'m not sure how to help with that. Could you rephrase?'),
    actions,
    continueLoop: data.stop_reason === 'tool_use',
    rawContent: data.content as unknown as Array<{ type: string; [key: string]: unknown }>,
  };
}

// ---------------------------------------------------------------------------
// Action executor
// ---------------------------------------------------------------------------

/**
 * Execute an agent action on the DOM.
 * Returns a brief status message for the chat.
 */
export function executeAction(action: AgentAction): string {
  switch (action.type) {
    case 'click': {
      const el = findElementByIndex(action.elementIndex!);
      if (el) {
        clickElement(el);
        return action.narration || 'Clicked.';
      }
      return `Could not find element #${action.elementIndex} on the page. It may have changed.`;
    }

    case 'navigate': {
      const path = action.path!;
      const currentPath = window.location.pathname;
      if (currentPath === path || (path !== '/' && currentPath.startsWith(path))) {
        return `Already on ${path}.`;
      }
      const link = document.querySelector<HTMLAnchorElement>(`a[href='${path}']`);
      if (link) {
        clickElement(link);
      } else {
        window.location.href = path;
      }
      return action.narration || `Navigating to ${path}...`;
    }

    case 'go_back': {
      window.history.back();
      return action.narration || 'Going back...';
    }

    case 'fill_input': {
      const el = findElementByIndex(action.elementIndex!);
      if (!el) return `Could not find input #${action.elementIndex} on the page.`;
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      highlightElement(el);
      setTimeout(() => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          const inp = el as HTMLInputElement;
          // Use native setter to trigger React's onChange
          const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
            || Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
          if (nativeSetter) {
            nativeSetter.call(inp, action.value || '');
          } else {
            inp.value = action.value || '';
          }
          inp.dispatchEvent(new Event('input', { bubbles: true }));
          inp.dispatchEvent(new Event('change', { bubbles: true }));
        } else if (el.isContentEditable) {
          el.textContent = action.value || '';
          el.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, 600);
      return action.narration || 'Filled input.';
    }

    case 'select_option': {
      const el = findElementByIndex(action.elementIndex!);
      if (!el) return `Could not find select #${action.elementIndex} on the page.`;
      if (el.tagName !== 'SELECT') return `Element #${action.elementIndex} is not a select element.`;
      const sel = el as HTMLSelectElement;
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      highlightElement(el);
      const option = Array.from(sel.options).find(
        (o) => o.text.toLowerCase() === (action.value || '').toLowerCase() || o.value === action.value
      );
      if (!option) return `Option "${action.value}" not found in select.`;
      setTimeout(() => {
        sel.value = option.value;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }, 600);
      return action.narration || 'Selected option.';
    }

    case 'check_checkbox': {
      const el = findElementByIndex(action.elementIndex!);
      if (!el) return `Could not find checkbox #${action.elementIndex} on the page.`;
      const cb = el as HTMLInputElement;
      if (cb.type !== 'checkbox') return `Element #${action.elementIndex} is not a checkbox.`;
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      highlightElement(el);
      const shouldCheck = action.value === 'true';
      setTimeout(() => {
        if (cb.checked !== shouldCheck) {
          cb.checked = shouldCheck;
          cb.dispatchEvent(new Event('change', { bubbles: true }));
          cb.dispatchEvent(new Event('click', { bubbles: true }));
        }
      }, 600);
      return action.narration || (shouldCheck ? 'Checked.' : 'Unchecked.');
    }
    case 'set_timeout': {
      // Timer scheduling is handled by the chat bubble component, not here.
      // executeAction just returns the narration for the chat UI.
      const secs = Math.round((action.delayMs || 0) / 1000);
      return action.narration || `Timer set for ${secs} seconds.`;
    }
    default:
      return '';
  }
}
