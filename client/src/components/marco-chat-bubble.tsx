import { useState, useRef, useEffect, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { X, Send, Bot, Loader2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Mock responses -- simulates Marco reading the page and acting on it.
// In production this would be the LLM observe-think-act loop.
// ---------------------------------------------------------------------------

interface MockResponse {
  text: string;
  delay: number;          // ms before this message appears
  action?: string;        // optional "action" narration shown in accent color
}

function getGreeting(ctx: string | null): MockResponse[] {
  if (!ctx) {
    return [
      { text: "Hey! I'm Marco, your Matcherino assistant. I can help you navigate the platform, find tournaments, manage your account, and more.", delay: 600 },
      { text: "What can I help you with?", delay: 1000 },
    ];
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
    return [
      { text: `Hey! I'm Marco, your Matcherino assistant. I can see you're viewing ${tournament}${game ? ` (${game})` : ''}.${prize ? ` Prize pool: ${prize}.` : ''}`, delay: 600 },
      { text: "I can help you register, view the bracket, contribute to the prize pool, check teams, or answer any questions about this tournament. What do you need?", delay: 1200 },
    ];
  }

  if (pageName.includes('Events')) {
    return [
      { text: "Hey! I'm Marco, your Matcherino assistant. I can see you're browsing events.", delay: 600 },
      { text: "I can help you find tournaments for a specific game, check out what's popular, or navigate to tournament registration. What are you looking for?", delay: 1200 },
    ];
  }

  return [
    { text: `Hey! I'm Marco, your Matcherino assistant. I can see you're on the ${pageName} page.`, delay: 600 },
    { text: "What can I help you with?", delay: 1000 },
  ];
}

const KEYWORD_RESPONSES: Record<string, MockResponse[]> = {
  register: [
    { text: "I'll get you registered for this tournament.", delay: 500 },
    {
      text: "Scrolling to the registration section...",
      delay: 1200,
      action: "Navigating to Registration tab",
    },
    {
      text: "Looks like registration is open. I need your team name and player tag. What are they?",
      delay: 2000,
    },
  ],
  bracket: [
    { text: "Let me pull up the bracket for you.", delay: 500 },
    {
      text: "Opening bracket view...",
      delay: 1000,
      action: "Clicking Bracket tab",
    },
    {
      text: "This is a Single Elimination bracket. Hotel Moscow and Russians Unite are in the finals. Want me to find a specific team?",
      delay: 1800,
    },
  ],
  contribute: [
    { text: "Great, I'll help you contribute to the prize pool.", delay: 500 },
    {
      text: "Opening the contribution dialog...",
      delay: 1200,
      action: "Clicking 'Contribute to Prize Pool'",
    },
    {
      text: "There are two pin options: Spike Contributor's Pin ($5.00) and Mandy Contributor's Pin ($2.50). You can also get both for $7.50. Which one would you like?",
      delay: 2200,
    },
  ],
  prize: [
    { text: "The current prize pool is $4,250.00 -- that's 85% of the $5,000 goal.", delay: 600 },
    {
      text: "Contributors receive in-game pins. The Spike pin costs $5, the Mandy pin costs $2.50. Winners also receive a Winner Pin.",
      delay: 1400,
    },
  ],
  help: [
    { text: "Here's what I can help you with on this page:", delay: 500 },
    {
      text: "- Register for the tournament\n- View and navigate the bracket\n- Contribute to the prize pool\n- Check prize pool status\n- Find team information\n- Open the stream view\n\nJust tell me what you need!",
      delay: 1200,
    },
  ],
  stream: [
    { text: "Let me switch to the stream view for you.", delay: 500 },
    {
      text: "Opening streams...",
      delay: 1000,
      action: "Clicking Stream tab",
    },
    {
      text: "There are a few streamers for this event: ikobs, Zeider, dummypotato, ProCaster, and BrawlFan99. Want me to open one of their streams?",
      delay: 1800,
    },
  ],
  team: [
    { text: "This tournament has 207 registered teams.", delay: 500 },
    {
      text: "Scrolling to the participants section...",
      delay: 1000,
      action: "Clicking Teams tab",
    },
    {
      text: "Looking for a specific team? Give me the name and I'll find them for you.",
      delay: 1600,
    },
  ],
};

const FALLBACK: MockResponse[] = [
  {
    text: "I can help with that. Let me look at the page to figure out the best way forward.",
    delay: 600,
  },
  {
    text: "Could you tell me a bit more about what you're trying to do? I can register you, show the bracket, help with contributions, or answer questions about this tournament.",
    delay: 1400,
  },
];

function findResponse(input: string, ctx: string | null): MockResponse[] {
  const lower = input.toLowerCase();
  for (const [keyword, responses] of Object.entries(KEYWORD_RESPONSES)) {
    if (lower.includes(keyword)) return responses;
  }

  if (ctx && (lower.includes('pin') || lower.includes('supercell'))) {
    return [
      { text: "For Brawl Stars PIN or Supercell ID issues, you'll need to open a ticket in the Brawl Stars Discord: https://discord.gg/AYna5z4RtF \u2014 that team handles all BS-related support.", delay: 800 },
    ];
  }
  if (ctx && (lower.includes('payout') || lower.includes('cash out') || lower.includes('cashout'))) {
    return [
      { text: "For payouts, make sure you've completed your tax interview first (click your profile icon in the top right, then 'Retake Interview'). PayPal cashouts process automatically. For bank wire payouts, email brian@matcherino.com \u2014 those typically complete within one week.", delay: 800 },
    ];
  }
  if (ctx && (lower.includes('tax') || lower.includes('w-8') || lower.includes('w8') || lower.includes('w-9') || lower.includes('w9'))) {
    return [
      { text: "You can retake your tax interview by clicking your profile icon in the top right and selecting 'Retake Interview.' If the submit button seems disabled, double-check that every single checkbox is checked \u2014 it stays disabled until all are confirmed.", delay: 800 },
      { text: "If you're still stuck, email brian@matcherino.com with your account details and they'll reset it for you.", delay: 1400 },
    ];
  }
  if (ctx && (lower.includes('account') || lower.includes('link') || lower.includes('discord'))) {
    return [
      { text: "For account linking issues (Discord showing 'already authorized to another account'), contact support via a Discord ticket and we can unlink it on our end. Note: de-authorizing from Discord's settings won't fix it \u2014 it has to be done from our side.", delay: 800 },
    ];
  }

  return FALLBACK;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface Message {
  id: number;
  role: "user" | "marco";
  text: string;
  action?: string;
}

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
      {/* Simple robot/agent head */}
      <rect x="4" y="6" width="16" height="14" rx="3" />
      <circle cx="9" cy="13" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1.5" fill="currentColor" stroke="none" />
      <line x1="12" y1="3" x2="12" y2="6" />
      <circle cx="12" cy="2" r="1" fill="currentColor" stroke="none" />
      <path d="M9.5 17h5" />
    </svg>
  );
}

export function MarcoChatBubble() {
  const [open, setOpen] = useState(false);
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
  const [pageContext, setPageContext] = useState<string | null>(null);
  const pageContextRef = useRef<string | null>(null);

  // Read page context hints from DOM
  useEffect(() => {
    const el = document.querySelector('[data-agent-context]');
    const ctx = el?.textContent?.trim() || null;
    setPageContext(ctx);
    pageContextRef.current = ctx;
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
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

  // Persist messages and nextId to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('marco-messages', JSON.stringify(messages));
    sessionStorage.setItem('marco-next-id', String(nextId.current));
  }, [messages]);

  // Persist greeted flag to sessionStorage
  useEffect(() => {
    if (greeted) {
      sessionStorage.setItem('marco-greeted', 'true');
    }
  }, [greeted]);

  // Send greeting on first open
  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      streamResponses(getGreeting(pageContextRef.current));
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, greeted]);

  function streamResponses(responses: MockResponse[]) {
    setTyping(true);
    let cumulative = 0;
    responses.forEach((r, i) => {
      cumulative += r.delay;
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId.current++,
            role: "marco",
            text: r.text,
            action: r.action,
          },
        ]);
        if (i === responses.length - 1) {
          setTyping(false);
        }
      }, cumulative);
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || typing) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "user", text: trimmed },
    ]);
    setInput("");

    const responses = findResponse(trimmed, pageContextRef.current);
    streamResponses(responses);
  }

  return (
    <div className="fixed bottom-[68px] right-[84px] z-50 flex flex-col items-end gap-3 xl:bottom-6 xl:right-[88px]">
      {/* Chat panel */}
      <div
        ref={panelRef}
        className={cn(
          "origin-bottom-right transition-all duration-200 ease-out",
          open
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-2 pointer-events-none"
        )}
      >
        <div className="w-[380px] h-[520px] rounded-2xl border border-white/10 bg-[#1a1f2e] shadow-2xl overflow-hidden flex flex-col">
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
                    Matcherino AI Assistant
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.action && (
                  <div className="flex items-center gap-1.5 mb-1.5 ml-1">
                    <Bot className="w-3 h-3 text-cyan-400" />
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
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < msg.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
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
