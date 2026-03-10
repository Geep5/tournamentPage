import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { X, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  scanInteractiveElements,
  callMarco,
  buildContextBlock,
  executeAction,
  type AgentMessage,
  type AgentAction,
  type ClaudeMessage,
} from "@/lib/marco-agent";
import { matchOfflineRoute } from "@/lib/marco-glossary";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Message {
  id: number;
  role: "user" | "marco";
  text: string;
  action?: string; // narration label shown in accent color
}

// ---------------------------------------------------------------------------
// Fallback mock (used when no API key is configured)
// ---------------------------------------------------------------------------

function mockResponse(input: string, ctx: string | null): { text: string; actions: AgentAction[] } {
  const lower = input.toLowerCase();

  // Navigation
  const navMatch = lower.match(/(?:go\s+to|take\s+me\s+to|navigate\s+to|open|switch\s+to|head\s+to)\s+(?:my\s+|the\s+)?(.+?)$/);
  if (navMatch) {
    const target = navMatch[1].trim();
    const match = matchOfflineRoute(target);
    if (match) {
      const cur = window.location.pathname;
      if (cur === match.path || (match.path !== '/' && cur.startsWith(match.path))) {
        return { text: `You're already on the ${match.label} page. What would you like to do here?`, actions: [] };
      }
      return {
        text: `Navigating to ${match.label}...`,
        actions: [{ type: 'navigate', path: match.path, narration: `Going to ${match.label}` }],
      };
    }
  }

  // Go back
  if (/\b(go\s+back|previous\s+page|back\s+to)\b/.test(lower)) {
    return {
      text: "Going back to the previous page...",
      actions: [{ type: 'go_back', narration: 'Navigating back' }],
    };
  }

  return {
    text: "I'm running in offline mode (no API key configured). I can still navigate pages — try 'go to profile' or 'go back'. For full capabilities, set ANTHROPIC_API_KEY in .env and restart.",
    actions: [],
  };
}

// ---------------------------------------------------------------------------
// Greeting (always local, no LLM call needed)
// ---------------------------------------------------------------------------

function getGreeting(ctx: string | null): string {
  if (!ctx) {
    return "Hey! I'm Marco, your Matcherino assistant. I can help you navigate the platform, find tournaments, manage your account, and more. What can I help you with?";
  }

  const pageMatch = ctx.match(/^PAGE:\s*(.+)$/m);
  const pageName = pageMatch?.[1] || 'this page';
  const tournMatch = ctx.match(/^TOURNAMENT:\s*(.+)$/m);
  const tournament = tournMatch?.[1];
  const gameMatch = ctx.match(/^GAME:\s*(.+)$/m);
  const game = gameMatch?.[1];
  const prizeMatch = ctx.match(/^PRIZE POOL:\s*(.+)$/m);
  const prize = prizeMatch?.[1];

  if (tournament) {
    return `Hey! I'm Marco, your Matcherino assistant. I can see you're viewing ${tournament}${game ? ` (${game})` : ''}.${prize ? ` Prize pool: ${prize}.` : ''} I can help you register, view the bracket, contribute to the prize pool, check teams, or answer questions. What do you need?`;
  }
  if (pageName.includes('Events')) {
    return "Hey! I'm Marco, your Matcherino assistant. I can see you're browsing events. I can help you find tournaments, check out what's popular, or navigate to registration. What are you looking for?";
  }
  return `Hey! I'm Marco, your Matcherino assistant. I can see you're on the ${pageName} page. What can I help you with?`;
}

// ---------------------------------------------------------------------------
// Icon
// ---------------------------------------------------------------------------

function MarcoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="6" width="16" height="14" rx="3" />
      <circle cx="9" cy="13" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1.5" fill="currentColor" stroke="none" />
      <line x1="12" y1="3" x2="12" y2="6" />
      <circle cx="12" cy="2" r="1" fill="currentColor" stroke="none" />
      <path d="M9.5 17h5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Discord link resolution
// ---------------------------------------------------------------------------

const DISCORD_LINKS: Record<string, string> = {
  "/metalstorm": "https://discord.gg/ZWVDYQYRmv",
  "/bazaar": "https://discord.gg/VXfN3C6M2y",
};

const DEFAULT_DISCORD_LINK = "https://discord.gg/matcherino";

function getDiscordLink(path: string): string {
  for (const [prefix, link] of Object.entries(DISCORD_LINKS)) {
    if (path.startsWith(prefix)) return link;
  }
  return DEFAULT_DISCORD_LINK;
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  );
}
// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MarcoChatBubble() {
  const [open, setOpen] = useState(() => {
    return sessionStorage.getItem('marco-chat-open') === 'true';
  });
  const [location] = useLocation();
  const discordLink = getDiscordLink(location);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const raw = sessionStorage.getItem('marco-messages');
      if (raw) return JSON.parse(raw) as Message[];
    } catch { /* corrupted – start fresh */ }
    return [];
  });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [greeted, setGreeted] = useState(() => {
    return sessionStorage.getItem('marco-greeted') === 'true';
  });
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef((() => {
    try {
      const raw = sessionStorage.getItem('marco-next-id');
      if (raw) return parseInt(raw, 10) || 0;
    } catch { /* corrupted */ }
    return 0;
  })());
  const pageContextRef = useRef<string | null>(null);
  /** Tracks whether the LLM API is available (false = no API key). */
  const llmAvailable = useRef(true);

  // Read page context hints from DOM — re-read on every route change
  function readPageContext(): string | null {
    const el = document.querySelector('[data-agent-context]');
    const ctx = el?.textContent?.trim() || null;
    pageContextRef.current = ctx;
    return ctx;
  }

  // Set initial page context
  useEffect(() => {
    readPageContext();
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      // Only close on real user clicks, not Marco's programmatic ones
      if (!e.isTrusted) return;
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  // Persist messages and nextId
  useEffect(() => {
    sessionStorage.setItem('marco-messages', JSON.stringify(messages));
    sessionStorage.setItem('marco-next-id', String(nextId.current));
  }, [messages]);

  // Persist open state
  useEffect(() => {
    sessionStorage.setItem('marco-chat-open', open ? 'true' : 'false');
  }, [open]);

  // Persist greeted flag
  useEffect(() => {
    if (greeted) sessionStorage.setItem('marco-greeted', 'true');
  }, [greeted]);

  // Send greeting on first open
  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      const greeting = getGreeting(readPageContext());
      addMarcoMessage(greeting);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, greeted]);

  // -----------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------

  function addMarcoMessage(text: string, action?: string) {
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "marco", text, action },
    ]);
  }

  /** Build the conversation history for the LLM from the Message[] state. */
  function buildHistory(): AgentMessage[] {
    return messages.map((m) => ({
      role: m.role === "user" ? "user" as const : "assistant" as const,
      content: m.text,
    }));
  }

  // -----------------------------------------------------------------------
  // Submit handler — async, calls LLM or falls back to mock
  // -----------------------------------------------------------------------

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || typing) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "user", text: trimmed },
    ]);
    setInput("");
    setTyping(true);

    try {
      if (!llmAvailable.current) {
        const freshContext = readPageContext();
        const response = mockResponse(trimmed, freshContext);
        if (response.text) addMarcoMessage(response.text);
        setTyping(false);
        return;
      }

      // --- Agentic tool-use loop ---
      // Claude may return stop_reason="tool_use" meaning it wants to
      // continue after we execute the tools. We loop: call Claude,
      // execute tools, feed tool results back, repeat until end_turn.
      const MAX_LOOPS = 6; // safety cap
      let loopMessages: ClaudeMessage[] | undefined = undefined;

      for (let loop = 0; loop < MAX_LOOPS; loop++) {
        const freshContext = readPageContext();
        const elements = scanInteractiveElements();
        let response;

        try {
          if (loop === 0) {
            // First call: build from history + user message
            const history = buildHistory();
            response = await callMarco(trimmed, history, freshContext, elements, undefined);
          } else {
            // Continuation: send accumulated messages with tool results
            response = await callMarco(trimmed, [], freshContext, elements, loopMessages);
          }
        } catch (err: any) {
          if (err.message === 'no_api_key') {
            llmAvailable.current = false;
            const fallback = mockResponse(trimmed, freshContext);
            if (fallback.text) addMarcoMessage(fallback.text);
          } else {
            throw err;
          }
          break;
        }

        // Show any text response
        if (response.text) {
          addMarcoMessage(response.text);
        }

        // Execute actions
        const toolResults: Array<{ tool_use_id: string; result: string }> = [];
        for (const block of response.rawContent) {
          if (block.type === 'tool_use') {
            const toolUse = block as unknown as { id: string; name: string; input: Record<string, unknown> };
            // Find the matching parsed action
            const action = response.actions.find((a) => a.narration === (toolUse.input.narration as string));
            if (action) {
              await new Promise((r) => setTimeout(r, 800));
              const result = executeAction(action);
              if (result && action.narration) {
                addMarcoMessage(result, action.narration);
              }
              toolResults.push({ tool_use_id: toolUse.id, result: result || 'Done.' });
            } else {
              toolResults.push({ tool_use_id: toolUse.id, result: 'Action executed.' });
            }
          }
        }

        // If Claude doesn't want to continue, we're done
        if (!response.continueLoop) break;

        // Build continuation messages: previous messages + assistant response + tool results
        // Wait for DOM to settle after clicks/navigation
        await new Promise((r) => setTimeout(r, 1200));

        if (!loopMessages) {
          // First continuation: start from the initial call's messages
          const history = buildHistory();
          const contextBlock = buildContextBlock(trimmed, freshContext, elements);
          loopMessages = [
            ...history.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content as string })),
            { role: 'user' as const, content: contextBlock },
          ];
        }

        // Append assistant's raw response
        loopMessages.push({
          role: 'assistant' as const,
          content: response.rawContent as Array<{ type: string; [key: string]: unknown }>,
        });

        // Append tool results (re-scan page for fresh context)
        const freshElements = scanInteractiveElements();
        const freshCtx = readPageContext();
        const updatedContext = buildContextBlock(trimmed, freshCtx, freshElements);

        loopMessages.push({
          role: 'user' as const,
          content: [
            ...toolResults.map((tr) => ({
              type: 'tool_result' as const,
              tool_use_id: tr.tool_use_id,
              content: tr.result,
            })),
            {
              type: 'text' as const,
              text: `[Updated page state after tool execution]\n${updatedContext}`,
            },
          ],
        });
      }
    } catch (err: any) {
      addMarcoMessage(`Something went wrong: ${err.message}. Try again?`);
    } finally {
      setTyping(false);
    }
  }, [input, typing, messages]);

  return (
    <div
      data-marco-ui
      className="fixed bottom-[68px] right-[84px] z-[9999] flex flex-col items-end gap-3 xl:bottom-6 xl:right-[88px] pointer-events-none max-sm:right-4"
    >
      {/* Chat panel */}
      <div
        ref={panelRef}
        className={cn(
          "origin-bottom-right transition-all duration-200 ease-out",
          open
            ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
            : "scale-95 opacity-0 translate-y-2 pointer-events-none"
        )}
      >
        <div className="w-[380px] max-sm:w-[calc(100vw-2rem)] h-[520px] rounded-2xl border border-white/10 bg-[#1a1f2e] shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-cyan-600 to-blue-600 px-5 pt-4 pb-4 shrink-0">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MarcoIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-sans font-semibold text-white text-base tracking-tight">
                  Marco
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[11px] text-white/70">
                    {llmAvailable.current ? 'Matcherino AI Assistant' : 'Offline Mode'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Discord support link */}
          <a
            href={discordLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border-b border-white/5 text-xs text-[#5865F2] hover:text-white transition-colors group"
          >
            <DiscordIcon className="h-3.5 w-3.5 shrink-0" />
            <span>Need to open a support ticket? <span className="underline underline-offset-2 group-hover:no-underline">Join our Discord</span></span>
          </a>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.action && (
                  <div className="flex items-center gap-1.5 mb-1.5 ml-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[11px] text-cyan-400 font-medium italic">
                      {msg.action}
                    </span>
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "ml-auto bg-cyan-600 text-white rounded-br-md"
                      : "bg-white/[0.07] text-white/90 rounded-bl-md border border-white/5"
                  )}
                >
                  {msg.role === "user" ? (
                    msg.text.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < msg.text.split("\n").length - 1 && <br />}
                      </span>
                    ))
                  ) : (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                        ul: ({ children }) => <ul className="list-disc pl-4 mb-1.5 space-y-0.5">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-4 mb-1.5 space-y-0.5">{children}</ol>,
                        li: ({ children }) => <li className="text-sm">{children}</li>,
                        a: ({ href, children }) => (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{children}</a>
                        ),
                        code: ({ children }) => <code className="bg-white/10 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                        pre: ({ children }) => <pre className="bg-white/10 p-2 rounded-lg text-xs overflow-x-auto my-1.5">{children}</pre>,
                        h1: ({ children }) => <h1 className="text-base font-bold mb-1">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-sm font-bold mb-1">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-semibold mb-0.5">{children}</h3>,
                        hr: () => <hr className="border-white/10 my-2" />,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-2 text-white/40 text-sm pl-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Marco is thinking...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="shrink-0 border-t border-white/5 px-4 py-3 flex items-center gap-2 bg-[#151a27]"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Marco anything..."
              disabled={typing}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl h-10 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white transition-colors disabled:opacity-30 disabled:hover:bg-cyan-600 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* FAB trigger */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "pointer-events-auto",
          "group flex items-center justify-center rounded-full shadow-lg transition-all duration-200",
          "h-14 w-14 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:from-cyan-600 active:to-blue-700",
          "hover:scale-105 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
        aria-label={open ? "Close Marco" : "Ask Marco for help"}
      >
        <MarcoIcon
          className={cn(
            "h-7 w-7 text-white transition-all duration-200",
            open && "scale-0 opacity-0 absolute"
          )}
        />
        <X
          className={cn(
            "h-6 w-6 text-white transition-all duration-200",
            !open && "scale-0 opacity-0 absolute"
          )}
        />
      </button>
    </div>
  );
}
