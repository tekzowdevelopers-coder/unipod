import React from "react";
import Link from "next/link";

interface UnipodLogoProps {
  light?: boolean;
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function UnipodLogo({
  light = false,
  className = "",
  showText = true,
  size = "md",
}: UnipodLogoProps) {
  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const textSizes = {
    sm: "text-xs tracking-[0.2em]",
    md: "text-sm tracking-[0.22em]",
    lg: "text-lg tracking-[0.24em]",
  };

  return (
    <Link href="/" className={`inline-flex flex-col items-center group select-none ${className}`}>
      {/* Monogram Icon */}
      <svg
        className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`}
        viewBox="0 0 36 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 6 C6 2, 14 2, 18 8 C22 14, 30 14, 30 22 C30 26, 22 26, 18 20 C14 14, 6 14, 6 6 Z"
          fill="url(#unipodCoral)"
        />
        <path
          d="M10 22 C10 26, 18 26, 22 20 C26 14, 30 8, 26 4 C22 0, 14 6, 14 14 Z"
          fill="url(#unipodOrange)"
          opacity="0.9"
        />
        <defs>
          <linearGradient id="unipodCoral" x1="0" y1="0" x2="36" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF8A45" />
            <stop offset="1" stopColor="#FF6A21" />
          </linearGradient>
          <linearGradient id="unipodOrange" x1="10" y1="26" x2="30" y2="4" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6A21" />
            <stop offset="1" stopColor="#FF5000" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span
          className={`font-black font-sans uppercase ${textSizes[size]} mt-0.5 ${
            light ? "text-[#071522]" : "text-white"
          }`}
        >
          UNIPOD
        </span>
      )}
    </Link>
  );
}
