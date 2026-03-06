import { useState } from "react";
import { PanelLeftOpen, PanelRightOpen, X } from "lucide-react";

interface MobileSidebarBarProps {
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  centerActions?: React.ReactNode;
}

export function MobileSidebarBar({ leftSidebar, rightSidebar, centerActions }: MobileSidebarBarProps) {
  const [openPanel, setOpenPanel] = useState<"left" | "right" | null>(null);

  if (!leftSidebar && !rightSidebar) return null;

  return (
    <>
      {/* Overlay panel */}
      {openPanel && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpenPanel(null)}
          />
          {/* Panel */}
          <div
            className={`absolute top-0 bottom-0 w-[85%] max-w-[340px] bg-[#131620] border-white/5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col ${
              openPanel === "left"
                ? "left-0 border-r"
                : "right-0 border-l"
            }`}
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 shrink-0">
              <span className="text-sm font-semibold text-white">
                {openPanel === "left" ? "Navigation" : "Sidebar"}
              </span>
              <button
                onClick={() => setOpenPanel(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {openPanel === "left" ? leftSidebar : rightSidebar}
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-between h-12 bg-[#131620]/95 backdrop-blur-md border-t border-white/5 px-2">
          {/* Left button */}
          <div className="flex justify-start">
            {leftSidebar && (
              <button
                onClick={() => setOpenPanel(openPanel === "left" ? null : "left")}
                className={`p-2.5 rounded-lg transition-all ${
                  openPanel === "left"
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                <PanelLeftOpen className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Center actions */}
          {centerActions && (
            <div className="flex items-center gap-2">
              {centerActions}
            </div>
          )}

          {/* Right button */}
          <div className="flex justify-end">
            {rightSidebar && (
              <button
                onClick={() => setOpenPanel(openPanel === "right" ? null : "right")}
                className={`p-2.5 rounded-lg transition-all ${
                  openPanel === "right"
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                <PanelRightOpen className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
