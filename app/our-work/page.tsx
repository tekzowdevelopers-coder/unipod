"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  PenTool,
  Layers,
  Settings,
  Truck,
  ArrowDown,
  Sparkles,
  Shirt,
  ShieldCheck,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const processSteps = [
  {
    icon: MessageSquare,
    title: "Discuss Your Needs",
    desc: "Understand your requirements.",
  },
  {
    icon: PenTool,
    title: "Design & Sampling",
    desc: "Develop designs and samples.",
  },
  {
    icon: Layers,
    title: "Fabric Selection",
    desc: "Choose the right materials.",
  },
  {
    icon: Settings,
    title: "Production",
    desc: "Skilled manufacturing with quality checks.",
  },
  {
    icon: Truck,
    title: "Delivery",
    desc: "On-time delivery to your campus.",
  },
];

const campusThumbnails = [
  "/images/institution-campus.jpg",
  "/images/gallery-college.jpg",
  "/images/gallery-school.jpg",
];

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState("Schools");
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      stepRefs.current.filter(Boolean).forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.3, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#071522] text-[#FFFDF9] min-h-screen">
      {/* ===================== HEADER SECTION ===================== */}
      <section className="pt-24 pb-8 px-6 bg-[#071522]">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.08] text-white">
          How
          <br />
          It Works
        </h1>
        <p className="text-xs text-white/70 mt-2 leading-relaxed">
          Design. Fabric. to Campus
        </p>
      </section>

      {/* ===================== 5 PROCESS STEPS (CREAM BACKGROUND) ===================== */}
      <section className="bg-[#F7F0E6] text-[#071522] rounded-t-[44px] pt-12 px-6 pb-12 shadow-2xl relative">
        <div className="space-y-8 max-w-sm mx-auto">
          {processSteps.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === processSteps.length - 1;
            return (
              <div
                key={item.title}
                ref={(el) => {
                  stepRefs.current[idx] = el;
                }}
                className="flex flex-col items-center text-center space-y-2 group"
              >
                {/* Circular Navy Badge */}
                <div className="w-12 h-12 rounded-full bg-[#071522] text-white flex items-center justify-center shadow-lg group-hover:bg-[#FF6A21] transition-colors duration-300">
                  <Icon size={18} className="stroke-[2.2]" />
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-black uppercase tracking-tight text-[#071522]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#071522]/70 mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>

                {/* Down Arrow */}
                {!isLast && (
                  <div className="pt-2 pb-1">
                    <ArrowDown size={14} className="text-[#071522]/30" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== TRUSTED BY LEADING INSTITUTIONS ===================== */}
      <section className="bg-[#FFFDF9] text-[#071522] pt-8 px-6 pb-10">
        <div className="relative w-full aspect-[16/11] rounded-[34px] overflow-hidden shadow-xl mb-6">
          <Image
            src="/images/institution-campus.jpg"
            alt="Institution campus building"
            fill
            sizes="(max-width: 440px) 100vw, 440px"
            className="object-cover object-center"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-black uppercase tracking-tight text-[#071522]">
            Trusted by Leading Institutions
          </h2>

          {/* Category Tabs: Schools, Colleges, Corporate */}
          <div className="flex items-center space-x-2">
            {["Schools", "Colleges", "Corporate"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                  activeTab === tab
                    ? "bg-[#071522] text-white shadow-sm"
                    : "bg-[#EDE3D5]/60 text-[#071522]/70 hover:bg-[#EDE3D5]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 3 Campus Thumbnails */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {campusThumbnails.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[#EDE3D5]"
              >
                <Image
                  src={src}
                  alt="Campus building thumbnail"
                  fill
                  sizes="120px"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== QUALITY IN EVERY DETAIL (DARK NAVY) ===================== */}
      <section className="bg-[#071522] text-white py-12 px-6">
        <div className="space-y-6">
          <h3 className="text-2xl font-black uppercase tracking-tight text-white">
            Quality
            <br />
            in Every Detail
          </h3>

          {/* 3 Minimal Icons */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FF6A21] mb-2">
                <Layers size={18} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-tight">
                Premium
                <br />
                Fabric
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FF6A21] mb-2">
                <Shirt size={18} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-tight">
                Perfect
                <br />
                Fitting
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FF6A21] mb-2">
                <ShieldCheck size={18} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-tight">
                Long
                <br />
                Lasting
              </span>
            </div>
          </div>

          {/* Bottom UNIPOD Label Photo Card */}
          <div className="relative w-full aspect-[16/10] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 mt-6">
            <Image
              src="/images/custom-tailoring.jpg"
              alt="UNIPOD woven garment label"
              fill
              sizes="(max-width: 440px) 100vw, 440px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071522]/90 via-transparent to-black/20" />
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white z-10">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF6A21]">
                Guaranteed Craftsmanship
              </span>
              <span className="text-sm font-black uppercase">UNIPOD Certified</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
