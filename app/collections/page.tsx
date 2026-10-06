"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import CircularButton from "@/components/CircularButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const allCollections = [
  {
    id: "school",
    title: "School Uniforms",
    category: "Schools",
    badge: "Grades K-12",
    features: ["Breathable Cotton Rich", "Fade-Resistant Dyes", "Reinforced Knees & Elbows"],
    image: "/images/collections-school.jpg",
    alt: "Happy school students in uniform",
    href: "/custom?category=school",
  },
  {
    id: "college",
    title: "College Uniforms",
    category: "Colleges",
    badge: "Degree & Professional",
    features: ["Bespoke Navy Blazers", "Anti-Wrinkle Poly-Wool", "Institutional Crest"],
    image: "/images/collections-college.jpg",
    alt: "College student in tailored blazer",
    href: "/custom?category=college",
  },
  {
    id: "sportswear",
    title: "Sportswear",
    category: "Sports",
    badge: "Athletics & Teams",
    features: ["Moisture-Wicking Tech", "High Elasticity Stretch", "Vibrant Institutional Color"],
    image: "/images/collections-sports.jpg",
    alt: "Students in athletic sports polo uniform",
    href: "/custom?category=sports",
  },
  {
    id: "corporate",
    title: "Corporate Attire",
    category: "Corporate",
    badge: "Staff & Faculty",
    features: ["Formal Tailoring", "Premium Suiting Wool", "Crisp Fit Finish"],
    image: "/images/collections-corporate.jpg",
    alt: "Mannequin dressed in corporate blazer and tie",
    href: "/custom?category=corporate",
  },
  {
    id: "accessories",
    title: "Accessories",
    category: "Accessories",
    badge: "Complete Uniform Kit",
    features: ["Ergonomic Backpacks", "Jacquard Woven Ties", "Genuine Leather Belts"],
    image: "/images/collections-accessories.jpg",
    alt: "School backpack, belt, bow tie and socks",
    href: "/custom?category=accessories",
  },
];

const categories = ["All", "Schools", "Colleges", "Sports", "Corporate", "Accessories"];

export default function CollectionsPage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filtered =
    selectedCat === "All"
      ? allCollections
      : allCollections.filter((c) => c.category === selectedCat);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cardRefs.current.filter(Boolean).forEach((card) => {
        // Entrance animation
        gsap.fromTo(
          card,
          {
            y: 50,
            scale: 0.95,
            opacity: 0.8,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Internal photo parallax scrub
        const img = card?.querySelector(".parallax-img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -10, scale: 1.08 },
            {
              yPercent: 10,
              scale: 1.02,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selectedCat]);

  return (
    <div ref={containerRef} className="w-full bg-[#071522] text-[#FFFDF9] min-h-screen">
      {/* ===================== HEADER SECTION ===================== */}
      <section className="pt-24 pb-8 px-6 relative">
        <div className="space-y-2">
          <p className="text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase">
            OUR COLLECTIONS
          </p>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.12]">
            Designed
            <br />
            for Every
            <br />
            <span className="text-[#FF6A21]">Journey</span>
          </h1>
          {/* Accent small horizontal line */}
          <div className="w-8 h-1 bg-white/40 rounded-full mt-3" />
        </div>

        {/* Filter categories pill bar */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-6 pb-2 -mx-6 px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCat === cat
                  ? "bg-[#FF6A21] text-white shadow-md shadow-[#FF6A21]/30"
                  : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ===================== CURVED BACKGROUND WRAPPER ===================== */}
      <div className="relative bg-[#F7F0E6] rounded-t-[44px] pt-10 px-6 pb-16 shadow-2xl text-[#071522]">
        {/* Visual Cards */}
        <div className="flex flex-col space-y-8">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="relative w-full aspect-[4/5] rounded-[38px] overflow-hidden shadow-2xl border-2 border-white/60 group"
            >
              {/* Inner Parallax Image */}
              <div className="absolute inset-[-10%] w-[120%] h-[120%] parallax-img pointer-events-none">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 440px) 100vw, 440px"
                  className="object-cover object-center"
                />
              </div>

              {/* Exact Dark Gradient Vignette for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071522]/95 via-[#071522]/30 to-transparent" />

              {/* Top Floating Badge */}
              <div className="absolute top-5 left-6 z-10">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono tracking-wider text-white uppercase border border-white/30">
                  {item.badge}
                </span>
              </div>

              {/* Card Label & Circular Arrow Button */}
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between z-10 text-white">
                <div>
                  <h3 className="text-xl font-black tracking-tight uppercase drop-shadow-md">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.features.slice(0, 2).map((f) => (
                      <span
                        key={f}
                        className="text-[10px] font-medium text-white/80 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-md"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href={item.href} aria-label={`View ${item.title}`}>
                  <CircularButton
                    variant="solid-light"
                    size="sm"
                    className="shadow-lg group-hover:scale-110 ml-3"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-12 p-6 rounded-3xl bg-white shadow-lg border border-[#EDE3D5] space-y-4">
          <div className="flex items-center space-x-2 text-[#FF6A21]">
            <Sparkles size={16} />
            <span className="text-xs font-black uppercase tracking-wider">
              Fabric Engineering
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs text-[#071522]">
            <div className="flex items-center space-x-2">
              <CheckCircle2 size={14} className="text-[#FF6A21] shrink-0" />
              <span>Anti-Pilling Finish</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 size={14} className="text-[#FF6A21] shrink-0" />
              <span>Color Fastness Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 size={14} className="text-[#FF6A21] shrink-0" />
              <span>Skin-Safe Dyes</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 size={14} className="text-[#FF6A21] shrink-0" />
              <span>All-Day Breathability</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="pt-10 flex flex-col items-center">
          <Link
            href="/custom"
            className="inline-flex items-center justify-between pl-6 pr-2 py-2 rounded-full border border-[#071522]/20 bg-[#071522] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#FF6A21] transition-all duration-300 group shadow-md"
          >
            <span>Request Custom Catalogue</span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-colors ml-4 text-white">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
