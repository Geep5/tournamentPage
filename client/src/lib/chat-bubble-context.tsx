import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type ActiveBubble = "marco" | "discord" | null;

interface ChatBubbleContextValue {
  active: ActiveBubble;
  open: (bubble: "marco" | "discord") => void;
  close: () => void;
  toggle: (bubble: "marco" | "discord") => void;
}

const ChatBubbleContext = createContext<ChatBubbleContextValue | null>(null);

export function ChatBubbleProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ActiveBubble>(() => {
    // Restore Marco's open state from sessionStorage across page refreshes
    if (sessionStorage.getItem('marco-chat-open') === 'true') return 'marco';
    return null;
  });

  const open = useCallback((bubble: "marco" | "discord") => {
    setActive(bubble);
  }, []);

  const close = useCallback(() => {
    setActive(null);
  }, []);

  const toggle = useCallback((bubble: "marco" | "discord") => {
    setActive((prev) => (prev === bubble ? null : bubble));
  }, []);

  return (
    <ChatBubbleContext.Provider value={{ active, open, close, toggle }}>
      {children}
    </ChatBubbleContext.Provider>
  );
}

export function useChatBubble() {
  const ctx = useContext(ChatBubbleContext);
  if (!ctx) throw new Error("useChatBubble must be used within ChatBubbleProvider");
  return ctx;
}
