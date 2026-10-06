import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface CircularButtonProps {
  variant?: "outline" | "solid-dark" | "solid-light" | "solid-orange" | "glass";
  size?: "sm" | "md" | "lg";
  diagonal?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function CircularButton({
  variant = "outline",
  size = "md",
  diagonal = false,
  className = "",
  onClick,
  ariaLabel = "Action",
}: CircularButtonProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 20,
  };

  const variantClasses = {
    outline: "border border-white/30 text-white hover:border-[#FF6A21] hover:text-[#FF6A21] hover:bg-white/5",
    "solid-dark": "bg-[#071522] border border-[#101D2A] text-white hover:bg-[#FF6A21]",
    "solid-light": "bg-white text-[#071522] shadow-sm hover:bg-[#FF6A21] hover:text-white",
    "solid-orange": "bg-[#FF6A21] text-white hover:bg-[#FF8A45] shadow-md shadow-[#FF6A21]/20",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
  };

  const Icon = diagonal ? ArrowUpRight : ArrowRight;

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-95 group shrink-0 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <Icon
        size={iconSizes[size]}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </button>
  );
}
