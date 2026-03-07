import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

/**
 * Maps URL path prefixes to Discord invite links.
 * Add new program entries here as they're created.
 */
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

/** Discord "clyde" logo as inline SVG — avoids an external asset dependency. */
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  );
}

export function DiscordSupportBubble() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const discordLink = getDiscordLink(location);

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

  return (
    <div className="fixed bottom-[68px] right-5 z-50 flex flex-col items-end gap-3 xl:bottom-6 xl:right-6">
      {/* Expanded panel */}
      <div
        ref={panelRef}
        className={cn(
          "origin-bottom-right transition-all duration-200 ease-out",
          open
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-2 pointer-events-none",
        )}
      >
        <div className="w-[320px] rounded-2xl border border-white/10 bg-[#313338] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-[#5865F2] px-5 pt-5 pb-6">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2.5 mb-2">
              <DiscordIcon className="h-6 w-6 text-white" />
              <span className="font-sans font-semibold text-white text-base tracking-tight">
                Matcherino Support
              </span>
            </div>
            <p className="text-sm text-white/80 leading-snug">
              Need help? We've got you covered.
            </p>
          </div>

          {/* Body */}
          <div className="px-5 py-4">
            <p className="text-sm text-[#B5BAC1] leading-relaxed mb-4">
              Join the Matcherino Discord and use the{" "}
              <span className="text-white font-medium">
                ❓click-for-support
              </span>{" "}
              channel to create a ticket.
            </p>
            <a
              href={discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#5865F2] hover:bg-[#4752C4] active:bg-[#3C45A5] text-white font-medium text-sm h-10 transition-colors"
            >
              <DiscordIcon className="h-4.5 w-4.5" />
              Join Discord Server
            </a>
          </div>
        </div>
      </div>

      {/* FAB trigger */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group flex items-center justify-center rounded-full shadow-lg transition-all duration-200",
          "h-14 w-14 bg-[#5865F2] hover:bg-[#4752C4] active:bg-[#3C45A5]",
          "hover:scale-105 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5865F2] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
        aria-label={open ? "Close support" : "Get support"}
      >
        <DiscordIcon
          className={cn(
            "h-7 w-7 text-white transition-all duration-200",
            open && "scale-0 opacity-0 absolute",
          )}
        />
        <X
          className={cn(
            "h-6 w-6 text-white transition-all duration-200",
            !open && "scale-0 opacity-0 absolute",
          )}
        />
      </button>
    </div>
  );
}
