"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PenTool,
  Layers,
  Scissors,
  ShieldCheck,
  Truck,
  ArrowDown,
  Sparkles,
  Palette,
  Ruler,
  Clock,
} from "lucide-react";
import CircularButton from "@/components/CircularButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    number: "01",
    icon: PenTool,
    title: "Design",
    desc: "Create a unique look tailored to your institution's heritage, crest, and core values.",
    highlight: "Initial Sketch & 3D Renders",
  },
  {
    number: "02",
    icon: Layers,
    title: "Fabric Selection",
    desc: "Choose from certified breathable, anti-pilling, and climate-adaptive textiles.",
    highlight: "Lab-Tested Durability",
  },
  {
    number: "03",
    icon: Scissors,
    title: "Stitching",
    desc: "Precision industrial tailoring ensuring comfort, reinforced seams, and perfect fit.",
    highlight: "Double-Stitch Seams",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Quality Check",
    desc: "Every single garment is individually inspected for sizing, finish, and stitching.",
    highlight: "Zero-Defect Inspection",
  },
  {
    number: "05",
    icon: Truck,
    title: "Delivery",
    desc: "Direct, on-time campus delivery packaged by student size and section.",
    highlight: "Student-Wise Packaging",
  },
];

const bespokePerks = [
  {
    icon: Palette,
    title: "Custom Dyeing",
    desc: "Exact Pantone matching to your school or university colors.",
  },
  {
    icon: Ruler,
    title: "Fit Measurement Camps",
    desc: "On-campus measurement drives conducted by trained stylists.",
  },
  {
    icon: Clock,
    title: "Guaranteed Turnaround",
    desc: "Reliable production scheduling ahead of the academic term.",
  },
];

export default function CustomPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // 1. Hero Image Parallax
      if (heroImgRef.current) {
        gsap.to(heroImgRef.current, {
          yPercent: 18,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: heroImgRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 2. Timeline Line Scrub Animation
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: "#timeline-container",
              start: "top 70%",
              end: "bottom 85%",
              scrub: 0.8,
            },
          }
        );
      }

      // 3. Step Activation Animations
      stepRefs.current.filter(Boolean).forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0.3, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
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
      <section className="pt-24 pb-6 px-6">
        <div className="space-y-2">
          <p className="text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase">
            BESPOKE PROCESS
          </p>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.12]">
            YOUR UNIFORM
            <br />
            YOUR <span className="text-[#FF6A21]">IDENTITY</span>
          </h1>
          <p className="text-xs md:text-sm text-white/70 font-normal mt-2 leading-relaxed max-w-[280px]">
            Custom designs tailored to your institution's values and heritage.
          </p>
        </div>
      </section>

      {/* ===================== TAILORING HERO IMAGE ===================== */}
      <section className="px-6 pb-12">
        <div className="relative w-full aspect-[4/5] rounded-[38px] overflow-hidden shadow-2xl border-2 border-white/10 group">
          <div ref={heroImgRef} className="absolute inset-[-10%] w-[120%] h-[120%] pointer-events-none">
            <Image
              src="/images/custom-tailoring.jpg"
              alt="Tailor hands stitching fabric with UNIPOD label"
              fill
              sizes="(max-width: 440px) 100vw, 440px"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#071522]/85 via-transparent to-black/20" />

          {/* UNIPOD Woven Tag */}
          <div className="absolute bottom-6 right-6 bg-[#101D2A]/90 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-xl shadow-xl flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6A21] animate-ping" />
            <span className="text-[10px] font-black tracking-widest text-[#FF6A21] uppercase">
              UNIPOD ATELIER
            </span>
          </div>
        </div>
      </section>

      {/* ===================== TIMELINE SECTION ===================== */}
      <section className="bg-[#F7F0E6] text-[#071522] rounded-t-[44px] pt-14 px-6 pb-16 shadow-2xl relative">
        <div className="text-center pb-8 space-y-1">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#FF6A21]">
            STEP-BY-STEP JOURNEY
          </span>
          <h2 className="text-2xl font-black uppercase tracking-tight text-[#071522]">
            From Concept to Campus
          </h2>
        </div>

        <div id="timeline-container" className="relative max-w-sm mx-auto pl-2">
          {/* Vertical Track Background Line */}
          <div className="absolute left-[31px] top-6 bottom-8 w-[2px] bg-[#EDE3D5]" />

          {/* Animated Growing Timeline Line (GSAP Scrub) */}
          <div
            ref={timelineLineRef}
            className="absolute left-[31px] top-6 bottom-8 w-[2px] bg-gradient-to-b from-[#FF6A21] via-[#FF8A45] to-[#071522] origin-top"
          />

          {/* Steps */}
          <div className="space-y-10 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === steps.length - 1;
              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className="flex items-start space-x-5 group"
                >
                  {/* Left Orange Indicator Dot & Dark Navy Circle Icon */}
                  <div className="flex items-center space-x-3 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A21] shadow-sm shadow-[#FF6A21]/40" />
                    <div className="w-12 h-12 rounded-full bg-[#071522] text-white flex items-center justify-center border-2 border-white shadow-lg group-hover:bg-[#FF6A21] transition-colors duration-300">
                      <Icon size={18} className="stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black uppercase tracking-tight text-[#071522] group-hover:text-[#FF6A21] transition-colors">
                        {step.title}
                      </h3>
                      <span className="text-[10px] font-mono text-[#071522]/40 font-bold">
                        {step.number}
                      </span>
                    </div>

                    <p className="text-xs text-[#071522]/70 font-normal leading-relaxed mt-1 max-w-[210px]">
                      {step.desc}
                    </p>

                    <div className="mt-2">
                      <span className="inline-block text-[10px] font-semibold text-[#FF6A21] bg-[#FF6A21]/10 px-2.5 py-0.5 rounded-full">
                        {step.highlight}
                      </span>
                    </div>

                    {/* Subtle Down Arrow between steps */}
                    {!isLast && (
                      <div className="pt-5 pb-1 pl-1">
                        <ArrowDown size={14} className="text-[#071522]/30" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bespoke Perks Section */}
        <div className="mt-14 space-y-3 pt-6 border-t border-[#EDE3D5]">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#071522]/60 text-center mb-4">
            Institutional Advantages
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {bespokePerks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="p-4 rounded-2xl bg-white border border-[#EDE3D5] shadow-sm flex items-start space-x-3.5"
                >
                  <div className="w-9 h-9 rounded-full bg-[#EDE3D5]/60 flex items-center justify-center text-[#FF6A21] shrink-0">
                    <Icon size={17} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#071522] uppercase tracking-wide">
                      {perk.title}
                    </h5>
                    <p className="text-[11px] text-[#071522]/70 mt-0.5 leading-snug">
                      {perk.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== BOTTOM QUALITY PINSTRIPE SECTION ===================== */}
      <section className="relative px-6 py-12 bg-[#071522]">
        <div className="relative w-full aspect-[16/10] rounded-[36px] overflow-hidden shadow-2xl border border-white/10 group">
          <Image
            src="/images/pinstripe-texture.jpg"
            alt="Navy wool pinstripe texture"
            fill
            sizes="(max-width: 440px) 100vw, 440px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071522]/95 via-[#071522]/70 to-transparent" />

          {/* Text and Button overlay */}
          <div className="absolute inset-0 p-6 flex items-center justify-between z-10">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#FF6A21] uppercase block mb-1">
                Material Excellence
              </span>
              <h4 className="text-2xl font-black uppercase tracking-tight leading-tight text-white">
                Quality
                <br />
                in Every
                <br />
                Detail
              </h4>
            </div>
            <Link href="/contact" aria-label="Book Consultation">
              <CircularButton
                variant="solid-orange"
                size="md"
                className="group-hover:scale-110"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
