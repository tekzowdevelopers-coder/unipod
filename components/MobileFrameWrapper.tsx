"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Smartphone, Monitor } from "lucide-react";

export default function MobileFrameWrapper({ children }: { children: React.ReactNode }) {
  const [isFrameMode, setIsFrameMode] = useState(true);
  const pathname = usePathname();

  const pages = [
    { name: "01 Home", path: "/" },
    { name: "02 Collections", path: "/collections" },
    { name: "03 Custom", path: "/custom" },
    { name: "04 Our Work", path: "/our-work" },
    { name: "05 Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#030B12] text-white flex flex-col items-center justify-start overflow-x-hidden selection:bg-[#FF6A21] selection:text-white">
      {/* Desktop Floating Companion Switcher (visible on lg+ screens) */}
      <aside className="hidden lg:flex fixed top-4 right-6 z-50 bg-[#101D2A]/90 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 items-center space-x-3 text-xs shadow-2xl">
        <span className="text-[#FF6A21] font-black tracking-wider text-[11px]">UNIPOD PREVIEW</span>
        <div className="h-3 w-[1px] bg-white/20" />
        <div className="flex items-center space-x-1">
          {pages.map((p) => {
            const active = pathname === p.path;
            return (
              <Link
                key={p.path}
                href={p.path}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                  active
                    ? "bg-[#FF6A21] text-white font-bold shadow-md shadow-[#FF6A21]/30"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {p.name.split(" ")[0]}
              </Link>
            );
          })}
        </div>
        <div className="h-3 w-[1px] bg-white/20" />
        <button
          onClick={() => setIsFrameMode(!isFrameMode)}
          className="flex items-center space-x-1.5 text-white/70 hover:text-white text-[11px] font-medium transition-colors"
          title="Toggle Mobile Frame / Full View"
        >
          {isFrameMode ? <Monitor size={14} className="text-[#FF6A21]" /> : <Smartphone size={14} className="text-[#FF6A21]" />}
          <span>{isFrameMode ? "Full View" : "Mobile Phone"}</span>
        </button>
      </aside>

      {/* Main Page Container */}
      <div
        className={`w-full transition-all duration-300 relative bg-[#071522] ${
          isFrameMode
            ? "max-w-[420px] my-0 lg:my-6 min-h-screen shadow-2xl lg:rounded-[44px] lg:border-[8px] lg:border-[#1E2D3D] lg:ring-1 lg:ring-white/10"
            : "max-w-xl mx-auto min-h-screen"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
