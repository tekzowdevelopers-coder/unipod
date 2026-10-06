"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowRight, PhoneCall, Mail } from "lucide-react";
import UnipodLogo from "./UnipodLogo";
import gsap from "gsap";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { id: "01", label: "Home", href: "/" },
  { id: "02", label: "Collections", href: "/collections" },
  { id: "03", label: "Custom Uniforms", href: "/custom" },
  { id: "04", label: "Our Work", href: "/our-work" },
  { id: "05", label: "Contact", href: "/contact" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();

      tl.set(overlayRef.current, { display: "flex", opacity: 0, scale: 0.98 })
        .to(overlayRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        })
        .fromTo(
          lineRef.current,
          { width: "0%" },
          { width: "100%", duration: 0.6, ease: "power2.inOut" },
          "-=0.2"
        )
        .fromTo(
          itemsRef.current.filter(Boolean),
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.45,
            ease: "back.out(1.2)",
          },
          "-=0.4"
        );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = "none";
          }
        },
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      style={{ display: "none" }}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#071522]/98 backdrop-blur-2xl text-white px-6 py-6 md:px-12 select-none overflow-hidden"
    >
      {/* Top bar inside menu */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <UnipodLogo size="sm" />
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-[#FF6A21] hover:border-[#FF6A21] transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Decorative dynamic orange accent line */}
      <div className="w-full h-[2px] bg-white/5 relative overflow-hidden my-2">
        <div
          ref={lineRef}
          className="h-full bg-gradient-to-r from-transparent via-[#FF6A21] to-[#FF8A45]"
        />
      </div>

      {/* Navigation list */}
      <div ref={contentRef} className="flex flex-col space-y-4 my-auto py-6">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className={`group flex items-center justify-between py-3 border-b border-white/5 transition-all duration-300 ${
                isActive ? "text-[#FF6A21]" : "text-white/80 hover:text-white"
              }`}
            >
              <div className="flex items-baseline space-x-4">
                <span className="font-mono text-xs text-white/40 tracking-widest group-hover:text-[#FF6A21] transition-colors">
                  {item.id}
                </span>
                <span className="text-2xl md:text-3xl font-extrabold tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {item.label}
                </span>
              </div>
              <div
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "border-[#FF6A21] bg-[#FF6A21] text-white"
                    : "border-white/20 text-white/40 group-hover:border-[#FF6A21] group-hover:text-[#FF6A21]"
                }`}
              >
                <ArrowRight size={14} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer contact quick info */}
      <div className="pt-6 border-t border-white/10 flex flex-col space-y-4">
        <div className="flex items-center justify-between text-xs text-white/50">
          <span>Premium Uniform Supplier</span>
          <span className="text-[#FF6A21] font-mono">01 - 05</span>
        </div>
        <div className="flex items-center justify-between text-xs text-white/70">
          <a
            href="tel:+919876543210"
            className="flex items-center space-x-1.5 hover:text-[#FF6A21] transition-colors"
          >
            <PhoneCall size={13} className="text-[#FF6A21]" />
            <span>+91 (0) 98765 43210</span>
          </a>
          <a
            href="mailto:contact@unipod.in"
            className="flex items-center space-x-1.5 hover:text-[#FF6A21] transition-colors"
          >
            <Mail size={13} className="text-[#FF6A21]" />
            <span>contact@unipod.in</span>
          </a>
        </div>
      </div>
    </div>
  );
}
