"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Feather,
  Users,
  Play,
  ArrowRight,
  ArrowDown,
  X,
} from "lucide-react";
import CircularButton from "@/components/CircularButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const rangeCards = [
  {
    title: "School Uniforms",
    image: "/images/collections-school.jpg",
    href: "/collections",
  },
  {
    title: "College Uniforms",
    image: "/images/collections-college.jpg",
    href: "/collections",
  },
  {
    title: "Sportswear",
    image: "/images/collections-sports.jpg",
    href: "/collections",
  },
  {
    title: "Corporate Attire",
    image: "/images/collections-corporate.jpg",
    href: "/collections",
  },
  {
    title: "Accessories",
    image: "/images/collections-accessories.jpg",
    href: "/collections",
  },
];

export default function HomePage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const trustedSectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const studentsCardRef = useRef<HTMLDivElement>(null);
  const exploreHeaderRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // 1. Initial Hero Entry
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        heroImageRef.current,
        { scale: 1.15, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 1.5 }
      )
        .fromTo(
          heroTextRef.current?.children || [],
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.85 },
          "-=1.0"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        );

      // 2. Parallax on Scroll for Hero Image & Text
      if (heroSectionRef.current && heroImageRef.current && heroTextRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 25,
          scale: 1.08,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(heroTextRef.current, {
          yPercent: -25,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom 35%",
            scrub: true,
          },
        });
      }

      // 3. Staggered Feature Badges
      if (featuresRef.current) {
        gsap.fromTo(
          featuresRef.current.children,
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 4. Students Photo Card
      if (studentsCardRef.current) {
        gsap.fromTo(
          studentsCardRef.current,
          { y: 50, scale: 0.94, opacity: 0.8 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: studentsCardRef.current,
              start: "top 88%",
            },
          }
        );
      }

      // 5. Explore Range Cards
      cardRefs.current.filter(Boolean).forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0.7, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#071522] text-[#FFFDF9] overflow-hidden">
      {/* ===================== SECTION 1: HERO ===================== */}
      <section
        ref={heroSectionRef}
        className="relative min-h-[96vh] flex flex-col justify-between pt-24 pb-8 px-6 overflow-hidden"
      >
        {/* Background Student Photo with Parallax */}
        <div
          ref={heroImageRef}
          className="absolute inset-0 z-0 origin-center pointer-events-none"
        >
          <Image
            src="/images/hero-student.jpg"
            alt="Smiling school student in uniform"
            fill
            priority
            sizes="(max-width: 440px) 100vw, 440px"
            className="object-cover object-top"
          />
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#071522]/90 via-[#071522]/30 to-[#071522]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071522] via-[#071522]/65 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 my-auto pt-16">
          <div ref={heroTextRef} className="space-y-5">
            <h1 className="text-4xl md:text-5xl font-black leading-[1.08] tracking-tight uppercase">
              Uniforms
              <br />
              That Shape
              <br />
              <span className="text-[#FF6A21] drop-shadow-md">Brighter</span>
              <br />
              Tomorrows
            </h1>

            {/* Play Button CTA: Watch Our Story */}
            <div className="pt-2">
              <button
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center space-x-3.5 group select-none active:scale-95 transition-transform"
              >
                <div className="w-11 h-11 rounded-full bg-[#FF6A21] text-white flex items-center justify-center shadow-lg shadow-[#FF6A21]/40 group-hover:bg-[#FF8A45] group-hover:scale-105 transition-all">
                  <Play size={16} className="fill-white translate-x-0.5" />
                </div>
                <span className="text-sm font-bold tracking-wide text-white group-hover:text-[#FF6A21] transition-colors">
                  Watch Our Story
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Bottom: Scroll prompt */}
        <div
          ref={scrollIndicatorRef}
          className="relative z-10 flex flex-col items-center mx-auto pt-6 text-white/70 select-none"
        >
          <span className="text-xs text-white/60 tracking-widest uppercase mb-1">Scroll</span>
          <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center animate-bounce">
            <ArrowDown size={12} className="text-[#FF6A21]" />
          </div>
        </div>
      </section>

      {/* ===================== SECTION 2: TRUSTED UNIFORM PARTNER ===================== */}
      <section
        ref={trustedSectionRef}
        className="w-full bg-[#FFFDF9] text-[#071522] pt-12 pb-10 px-6 rounded-t-[44px] shadow-2xl relative"
      >
        <div className="space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tight leading-[1.1] text-[#071522]">
            Trusted
            <br />
            Uniform Partner
            <br />
            for Schools
            <br />
            & Colleges
          </h2>

          {/* 3 Feature Icons */}
          <div
            ref={featuresRef}
            className="grid grid-cols-3 gap-2.5 pt-3 border-t border-[#EDE3D5]"
          >
            <div className="flex flex-col items-center text-center p-2.5 rounded-2xl bg-[#F7F0E6]/70 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-[#EDE3D5]/80 flex items-center justify-center text-[#071522] mb-2">
                <ShieldCheck size={18} className="stroke-[2.2] text-[#FF6A21]" />
              </div>
              <span className="text-[11px] font-extrabold leading-tight uppercase tracking-tight text-[#071522]">
                Premium
                <br />
                Quality
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-2.5 rounded-2xl bg-[#F7F0E6]/70 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-[#EDE3D5]/80 flex items-center justify-center text-[#071522] mb-2">
                <Feather size={18} className="stroke-[2.2] text-[#FF6A21]" />
              </div>
              <span className="text-[11px] font-extrabold leading-tight uppercase tracking-tight text-[#071522]">
                Comfort
                <br />
                First
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-2.5 rounded-2xl bg-[#F7F0E6]/70 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-[#EDE3D5]/80 flex items-center justify-center text-[#071522] mb-2">
                <Users size={18} className="stroke-[2.2] text-[#FF6A21]" />
              </div>
              <span className="text-[11px] font-extrabold leading-tight uppercase tracking-tight text-[#071522]">
                For Schools
                <br />
                & Colleges
              </span>
            </div>
          </div>

          {/* Students Photograph */}
          <div
            ref={studentsCardRef}
            className="relative w-full aspect-[4/5] rounded-[34px] overflow-hidden shadow-xl"
          >
            <Image
              src="/images/school-students.jpg"
              alt="School students in uniform"
              fill
              sizes="(max-width: 440px) 100vw, 440px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ===================== SECTION 3: EXPLORE OUR RANGE ===================== */}
      <section className="relative bg-[#071522] py-14 px-6">
        {/* Section Header */}
        <div
          ref={exploreHeaderRef}
          className="flex items-center justify-between pb-8"
        >
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight text-white">
            Explore
            <br />
            Our Range
          </h2>
          <Link href="/collections" aria-label="Explore All Collections">
            <CircularButton
              variant="outline"
              size="md"
              className="hover:border-[#FF6A21] hover:text-[#FF6A21]"
            />
          </Link>
        </div>

        {/* 5 Compact Range Cards Stacked Vertically */}
        <div className="space-y-4">
          {rangeCards.map((item, idx) => (
            <div
              key={item.title}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="relative w-full aspect-[16/9] rounded-[28px] overflow-hidden shadow-xl border border-white/10 group"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 440px) 100vw, 440px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071522]/95 via-[#071522]/30 to-transparent" />

              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between z-10">
                <span className="text-base font-bold text-white tracking-tight uppercase drop-shadow-md">
                  {item.title}
                </span>
                <Link href={item.href} aria-label={`View ${item.title}`}>
                  <CircularButton
                    variant="glass"
                    size="sm"
                    className="group-hover:scale-110"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Scroll/Explore Prompt */}
        <div className="pt-12 pb-6 flex flex-col items-center space-y-2 select-none">
          <Link href="/collections" aria-label="Go to Products">
            <CircularButton
              variant="solid-orange"
              size="md"
              className="shadow-xl hover:scale-105"
            />
          </Link>
          <span className="text-xs font-medium text-white/60 tracking-wider">
            Scroll to Explore
          </span>
        </div>
      </section>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative w-full max-w-sm bg-[#101D2A] rounded-3xl p-6 border border-white/20 text-center space-y-4">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white"
            >
              <X size={18} />
            </button>
            <div className="w-16 h-16 rounded-full bg-[#FF6A21]/20 text-[#FF6A21] flex items-center justify-center mx-auto">
              <Play size={28} className="fill-[#FF6A21]" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">
              Our Story
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              UNIPOD manufactures premium school, college, and corporate uniforms tailored with precision, craftsmanship, and comfort.
            </p>
            <button
              onClick={() => setVideoModalOpen(false)}
              className="w-full py-3 rounded-full bg-[#FF6A21] text-white font-bold text-xs uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
