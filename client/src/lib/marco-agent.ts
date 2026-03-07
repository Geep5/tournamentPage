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
  type: "click" | "navigate" | "go_back" | "highlight";
  /** For click: the element index from the scanned list */
  elementIndex?: number;
  /** For navigate: the path */
  path?: string;
  /** Human-readable narration */
  narration?: string;
}

export interface AgentResponse {
  text: string;
  actions: AgentAction[];
}

export interface InteractiveElement {
  index: number;
  tag: string;
  text: string;
  type?: string;      // "button" | "link" | "tab" | "input" | "select"
  href?: string;
  ariaLabel?: string;
  disabled?: boolean;
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
    // Skip invisible
    if (el.offsetParent === null && el.tagName !== 'BODY') continue;
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

    // Deduplicate by text+type (many identical buttons)
    const key = `${type}:${text}:${href || ''}`;
    if (seen.has(key)) continue;
    seen.add(key);

    // Skip empty text elements (except inputs/selects)
    if (!text && !ariaLabel && type !== 'input' && type !== 'select' && type !== 'textarea') continue;

    results.push({
      index: results.length,
      tag,
      text: text || ariaLabel || '',
      type,
      href,
      ariaLabel,
      disabled,
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
    if (el.offsetParent === null && el.tagName !== 'BODY') continue;
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

    const key = `${type}:${text}:${href || ''}`;
    if (seen.has(key)) continue;
    seen.add(key);

    if (!text && !ariaLabel && type !== 'input' && type !== 'select' && type !== 'textarea') continue;

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

const SYSTEM_PROMPT = `You are Marco, an AI assistant embedded in the Matcherino tournament platform. You help users operate the website by clicking buttons, navigating pages, and answering questions.

## Personality
- Friendly, direct, efficient. Not robotic.
- Short, clear sentences. No rambling.
- Narrate what you're doing so the user isn't surprised.

## Critical Rules
1. ALWAYS check CURRENT PAGE PATH before using navigate. If the user is already on that page, say so — do NOT navigate again.
2. To interact with anything on the current page (buttons, links, tabs, tournament cards, etc.), use click_element with the matching index from INTERACTIVE ELEMENTS. Do NOT use navigate for on-page actions.
3. Confirm before destructive actions (publishing, deleting, payouts).
4. Never guess. If info is missing, ask.
5. Stay on Matcherino. Don't navigate to external sites unless asked.
6. For Brawl Stars PIN / Supercell ID issues, redirect to Brawl Stars Discord: https://discord.gg/AYna5z4RtF

## How to Act

### Clicking on-page elements
You receive a numbered list of INTERACTIVE ELEMENTS visible on the page. Each has an index, type, text label, and optional href. To click anything on the current page:
1. Find the element in the list by matching its text/label to what the user asked for.
2. Use click_element with that element's index number.
3. If the user says something vague like \"click on a tournament\", find the first tournament link in the interactive elements list and click it.
4. If you can't find a matching element, tell the user what you see and ask them to clarify.

### Navigation
- Use navigate ONLY to go to a different page (different path).
- ALWAYS compare the requested path to CURRENT PAGE PATH first.
- If the user is already on the requested page, tell them and ask what they'd like to do there instead.

### General questions
For general questions about Matcherino, just respond with text — no tool needed.

## Matcherino Knowledge
- Tournaments have: title, game, format, dates, entry fee, prize pool, rules
- Bracket formats: Single Elim, Double Elim, Round Robin, Swiss
- Prize pools grow via crowdfunding contributions (marketplace pins/items)
- Tax interview required before payouts. Retake: Profile icon > Retake Interview.
- W-8BEN \"submit disabled\" = not all checkboxes checked (not a bug)
- PayPal cashouts: automatic. Bank wire: email brian@matcherino.com
- Discord unlinking: must be done by Matcherino support
- ESL/FACEIT prizes: https://matcherino.com/esl

## Site Pages
/events — Browse tournaments
/create — Create tournament
/ — Tournament detail (overview, bracket, teams, contributions, streams)
/profile — User profile, settings, cashout, linked accounts
/partnership — Partnership program`;

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
    description: "Navigate to a different page on Matcherino. Available pages: / (home/tournament), /events, /create, /profile, /partnership. Check the current_path first — if already there, tell the user instead.",
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
];

// ---------------------------------------------------------------------------
// LLM API call
// ---------------------------------------------------------------------------

interface ClaudeMessage {
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
 * Call Claude via the /api/marco proxy.
 *
 * @param userMessage - The latest user message
 * @param history - Conversation history (excluding the latest user message)
 * @param pageContext - The data-agent-context text from the page (or null)
 * @param elements - Scanned interactive elements on the current page
 * @returns AgentResponse with text and actions
 */
export async function callMarco(
  userMessage: string,
  history: AgentMessage[],
  pageContext: string | null,
  elements: InteractiveElement[],
): Promise<AgentResponse> {
  // Build the element list for context
  const elementList = elements.map((el) => {
    let desc = `[${el.index}] ${el.type}: "${el.text}"`;
    if (el.href) desc += ` (href=${el.href})`;
    if (el.disabled) desc += ` [disabled]`;
    return desc;
  }).join('\n');

  // Build the user message with context — current path is emphasized
  const currentPath = window.location.pathname;
  const contextBlock = [
    `## Current State`,
    `CURRENT PAGE PATH: ${currentPath}`,
    `YOU ARE ON: ${currentPath === '/profile' ? 'User Profile' : currentPath === '/events' ? 'Events Browser' : currentPath === '/create' ? 'Create Tournament' : currentPath === '/partnership' ? 'Partnership' : currentPath === '/' ? 'Tournament Detail' : currentPath}`,
    '',
    pageContext ? `## Page Context\n${pageContext}` : '## Page Context\n(none available)',
    '',
    `## Interactive Elements on Page (use these indices with click_element)`,
    elementList || '(no interactive elements found)',
    '',
    `## User Message`,
    userMessage,
  ].join('\n');

  // Build messages array
  const messages: ClaudeMessage[] = [];
  for (const msg of history) {
    messages.push({ role: msg.role, content: msg.content });
  }
  messages.push({ role: "user", content: contextBlock });

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
    // No API key configured
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
      }
    }
  }

  return {
    text: textParts.join('\n\n') || (actions.length > 0 ? '' : 'I\'m not sure how to help with that. Could you rephrase?'),
    actions,
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

    default:
      return '';
  }
}
