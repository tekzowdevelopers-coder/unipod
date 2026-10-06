"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!curtainRef.current) return;

    // Fast cinematic curtain reveal on route change
    const tl = gsap.timeline();

    tl.set(curtainRef.current, { scaleY: 1, transformOrigin: "bottom" })
      .to(curtainRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.55,
        ease: "power3.inOut",
      })
      .fromTo(
        contentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        "-=0.3"
      );
  }, [pathname]);

  return (
    <div className="relative w-full">
      {/* Cinematic Navy Curtain */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="fixed inset-0 z-50 bg-[#071522] pointer-events-none"
      />
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </div>
  );
}
