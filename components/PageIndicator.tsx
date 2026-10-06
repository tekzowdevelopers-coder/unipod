import React from "react";

interface PageIndicatorProps {
  current: string; // e.g. "01", "02"
  total?: string;  // e.g. "05"
  light?: boolean;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export default function PageIndicator({
  current,
  total = "05",
  light = false,
  orientation = "vertical",
  className = "",
}: PageIndicatorProps) {
  if (orientation === "horizontal") {
    return (
      <div className={`flex items-center space-x-1.5 font-mono text-xs tracking-wider ${className}`}>
        <span className={light ? "text-[#071522] font-semibold" : "text-white font-semibold"}>{current}</span>
        <span className={light ? "text-[#071522]/40" : "text-white/40"}>/</span>
        <span className={light ? "text-[#071522]/50" : "text-white/40"}>{total}</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center font-mono text-[11px] leading-tight select-none ${className}`}>
      <span className={`font-semibold tracking-wider ${light ? "text-[#071522]" : "text-white"}`}>
        {current}
      </span>
      <span className={`h-3 w-[1px] my-0.5 ${light ? "bg-[#071522]/30" : "bg-white/30"}`} />
      <span className={`text-[10px] tracking-wider ${light ? "text-[#071522]/50" : "text-white/40"}`}>
        {total}
      </span>
    </div>
  );
}
