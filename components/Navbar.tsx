"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Wifi, Battery } from "lucide-react";
import UnipodLogo from "./UnipodLogo";
import PageIndicator from "./PageIndicator";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Page index mapping
  const pageMap: Record<string, string> = {
    "/": "01",
    "/collections": "02",
    "/custom": "03",
    "/our-work": "04",
    "/contact": "05",
  };

  const currentPage = pageMap[pathname] || "01";
  const isHome = pathname === "/";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 w-full max-w-[440px] mx-auto pointer-events-none transition-all duration-300">
        <div className="px-5 pt-3 pb-2 flex flex-col pointer-events-auto bg-gradient-to-b from-[#071522]/90 via-[#071522]/50 to-transparent backdrop-blur-[2px]">
          {/* Subtle Mobile Status Bar Simulation (As seen in reference 09:41, wifi, battery) */}
          <div className="flex items-center justify-between text-[11px] font-medium text-white/70 tracking-tight pb-1 select-none">
            <span className="font-semibold">09:41</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] tracking-tighter">5G</span>
              <Wifi size={12} className="stroke-[2.5]" />
              <Battery size={13} className="stroke-[2.5]" />
            </div>
          </div>

          {/* Actual UNIPOD Brand Bar */}
          <div className="flex items-center justify-between pt-1 pb-1">
            {/* Left: Page indicator (hidden on home hero where it is lower down, or shown on inner pages) */}
            <div className="w-10 flex items-center justify-start">
              {!isHome ? (
                <PageIndicator current={currentPage} total="05" />
              ) : (
                <div className="w-4" />
              )}
            </div>

            {/* Center: UNIPOD Logo */}
            <div className="flex-1 flex justify-center">
              <UnipodLogo size="sm" />
            </div>

            {/* Right: Hamburger button */}
            <div className="w-10 flex justify-end">
              <button
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open Navigation Menu"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/90 hover:text-[#FF6A21] hover:bg-white/10 active:scale-95 transition-all"
              >
                <Menu size={22} className="stroke-[2.2]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Drawer */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
