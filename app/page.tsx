"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Feather,
  Users,
  ArrowRight,
  ArrowDown,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import CircularButton from "@/components/CircularButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const rangeCards = [
  {
    title: "School Uniforms",
    category: "K-12 & High School",
    image: "/images/collections-school.jpg",
    href: "/collections",
  },
  {
    title: "College Uniforms",
    category: "Higher Education & Academies",
    image: "/images/collections-college.jpg",
    href: "/collections",
  },
  {
    title: "Sportswear",
    category: "Performance & Athletic Kits",
    image: "/images/collections-sports.jpg",
    href: "/collections",
  },
  {
    title: "Corporate Attire",
    category: "Executive & Staff Apparel",
    image: "/images/collections-corporate.jpg",
    href: "/collections",
  },
  {
    title: "Accessories",
    category: "Backpacks, Ties, Belts & Socks",
    image: "/images/collections-accessories.jpg",
    href: "/collections",
  },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const crestCardRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const rangeHeaderRef = useRef<HTMLDivElement>(null);
  const rangeCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // 1. Initial Hero Entry Animation
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(
          heroImageRef.current,
          { scale: 1.15, opacity: 0.7 },
          { scale: 1, opacity: 1, duration: 1.5 }
        )
        .fromTo(
          heroTextRef.current?.children || [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.9 },
          "-=1.0"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );

      // 2. Clean Hero Scroll Parallax & Dissolve
      if (heroSectionRef.current && heroImageRef.current && heroTextRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 30,
          scale: 1.1,
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
          yPercent: -35,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom 30%",
            scrub: true,
          },
        });

        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "20% top",
            scrub: true,
          },
        });
      }

      // 3. Crest Cutout Card Reveal with 3D Float
      if (crestCardRef.current) {
        gsap.fromTo(
          crestCardRef.current,
          { y: 80, scale: 0.9, opacity: 0.5 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: crestCardRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 4. Staggered Feature Cards / Icons
      if (featuresRef.current) {
        const featureItems = featuresRef.current.querySelectorAll(".feature-box");
        gsap.fromTo(
          featureItems,
          { y: 35, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
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

      // 5. Explore Our Range Header Reveal
      if (rangeHeaderRef.current) {
        gsap.fromTo(
          rangeHeaderRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rangeHeaderRef.current,
              start: "top 88%",
            },
          }
        );
      }

      // 6. Explore Range Cards Parallax and Scroll Entry
      rangeCardRefs.current.filter(Boolean).forEach((card, idx) => {
        // Card frame entry
        gsap.fromTo(
          card,
          { y: 60, opacity: 0.7, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Internal image parallax scrub
        const innerImg = card?.querySelector(".card-image");
        if (innerImg) {
          gsap.fromTo(
            innerImg,
            { yPercent: -8, scale: 1.08 },
            {
              yPercent: 8,
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
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#071522] text-[#FFFDF9] overflow-hidden">
      {/* ===================== SECTION 1: FULLSCREEN HERO ===================== */}
      <section
        ref={heroSectionRef}
        className="relative min-h-[96vh] flex flex-col justify-between pt-24 pb-8 px-6 overflow-hidden"
      >
        {/* Background Photo with Parallax Zoom */}
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
          {/* Cinematic Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#071522]/90 via-[#071522]/35 to-[#071522]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071522] via-[#071522]/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 my-auto pt-16">
          <div ref={heroTextRef} className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-widest text-[#FF6A21] uppercase">
              <Sparkles size={12} />
              <span>Premium Uniform Manufacturer</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black leading-[1.06] tracking-tight uppercase">
              Uniforms
              <br />
              That Inspire
              <br />
              <span className="text-[#FF6A21] drop-shadow-md">Brighter</span>
              <br />
              Tomorrows
            </h1>

            <p className="text-sm md:text-base text-white/80 font-normal leading-snug max-w-[250px]">
              Professional uniforms for schools, colleges and institutions.
            </p>

            {/* Pill CTA [ Explore → ] */}
            <div className="pt-2">
              <Link
                href="/collections"
                className="inline-flex items-center justify-between pl-5 pr-1.5 py-1.5 rounded-full border border-white/35 bg-white/10 backdrop-blur-md text-sm font-semibold tracking-wide hover:border-[#FF6A21] hover:bg-[#FF6A21] transition-all duration-300 group min-w-[145px] shadow-lg"
              >
                <span>Explore</span>
                <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white group-hover:text-[#071522] flex items-center justify-center transition-colors ml-4 text-white">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Bottom: Scroll indicator and counter */}
        <div
          ref={scrollIndicatorRef}
          className="relative z-10 flex flex-col items-start pt-6 text-white/70 select-none"
        >
          <div className="flex flex-col items-start font-mono text-[11px] leading-tight mb-2">
            <span className="font-bold text-white">01</span>
            <span className="h-3 w-[1px] bg-white/40 my-0.5" />
            <span className="text-white/50">05</span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-white/60 tracking-wider">
            <span>Scroll</span>
            <ArrowDown size={13} className="text-[#FF6A21] animate-bounce" />
          </div>
        </div>
      </section>

      {/* ===================== SECTION 2: TRANSITION & CREST CUTOUT ===================== */}
      <section className="relative bg-[#071522] pt-4">
        {/* Blazer Crest Cutout Card */}
        <div className="relative w-full px-6 -mb-8 z-10">
          <div
            ref={crestCardRef}
            className="relative w-full aspect-[4/5] rounded-[38px] overflow-hidden border-2 border-white/15 shadow-2xl group"
          >
            <Image
              src="/images/blazer-crest.jpg"
              alt="Closeup of tailored blazer with gold crest and tie"
              fill
              sizes="(max-width: 440px) 100vw, 440px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071522]/85 via-transparent to-black/20" />
            {/* Orange glowing corner glow */}
            <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-[#FF6A21]/30 blur-2xl pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-10">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#FF6A21] uppercase block">
                  Artisan Quality
                </span>
                <span className="text-base font-bold uppercase tracking-tight">
                  Handcrafted Embroidery
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <CheckCircle size={15} className="text-[#FF6A21]" />
              </div>
            </div>
          </div>
        </div>

        {/* Cream Transition Section: Trusted Uniform Partner */}
        <div className="w-full bg-[#F7F0E6] text-[#071522] pt-16 pb-10 px-6 rounded-t-[44px] shadow-inner">
          <div className="space-y-6">
            {/* Heading with Circular Arrow Button */}
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black uppercase tracking-tight leading-[1.08] text-[#071522]">
                Trusted
                <br />
                Uniform
                <br />
                Partner
              </h2>
              <Link href="/our-work" aria-label="Explore our work">
                <CircularButton
                  variant="solid-dark"
                  size="md"
                  ariaLabel="View Our Work"
                />
              </Link>
            </div>

            {/* Three Minimal Feature Badges */}
            <div
              ref={featuresRef}
              className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#EDE3D5]"
            >
              <div className="feature-box flex flex-col items-center text-center p-3 rounded-2xl bg-white/60 shadow-sm border border-white">
                <div className="w-10 h-10 rounded-full bg-[#EDE3D5]/80 flex items-center justify-center text-[#071522] mb-2 shadow-inner">
                  <ShieldCheck size={20} className="stroke-[2.2] text-[#FF6A21]" />
                </div>
                <span className="text-[11px] font-extrabold leading-tight uppercase tracking-tight text-[#071522]">
                  Premium
                  <br />
                  Quality
                </span>
              </div>

              <div className="feature-box flex flex-col items-center text-center p-3 rounded-2xl bg-white/60 shadow-sm border border-white">
                <div className="w-10 h-10 rounded-full bg-[#EDE3D5]/80 flex items-center justify-center text-[#071522] mb-2 shadow-inner">
                  <Feather size={20} className="stroke-[2.2] text-[#FF6A21]" />
                </div>
                <span className="text-[11px] font-extrabold leading-tight uppercase tracking-tight text-[#071522]">
                  Comfort
                  <br />
                  First
                </span>
              </div>

              <div className="feature-box flex flex-col items-center text-center p-3 rounded-2xl bg-white/60 shadow-sm border border-white">
                <div className="w-10 h-10 rounded-full bg-[#EDE3D5]/80 flex items-center justify-center text-[#071522] mb-2 shadow-inner">
                  <Users size={20} className="stroke-[2.2] text-[#FF6A21]" />
                </div>
                <span className="text-[11px] font-extrabold leading-tight uppercase tracking-tight text-[#071522]">
                  For Schools
                  <br />
                  & Colleges
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Photographic Highlight Card */}
        <div className="w-full bg-[#F7F0E6] px-6 pb-12">
          <div className="relative w-full aspect-[4/5] rounded-[34px] overflow-hidden shadow-2xl">
            <Image
              src="/images/school-students.jpg"
              alt="School students in uniform"
              fill
              sizes="(max-width: 440px) 100vw, 440px"
              className="object-cover object-center"
            />
            {/* Curved Orange Swoop at bottom right */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-[#FF6A21] pointer-events-none" />
            <div className="absolute -bottom-12 -right-4 w-52 h-36 rounded-full bg-[#FF8A45]/40 blur-lg pointer-events-none" />

            <div className="absolute bottom-6 left-6 z-10 max-w-[200px]">
              <span className="text-white text-xs font-bold uppercase tracking-wider block drop-shadow-md">
                Empowering Over
              </span>
              <span className="text-white text-2xl font-black uppercase tracking-tight drop-shadow-lg">
                250+ Campuses
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 3: EXPLORE OUR RANGE (VISUAL CARDS) ===================== */}
      <section className="relative bg-[#071522] py-16 px-6">
        <div ref={rangeHeaderRef} className="space-y-3 mb-8">
          <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#FF6A21] uppercase">
            <span>02</span>
            <span>/</span>
            <span>CATALOGUE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.08] text-white">
            Explore
            <br />
            Our Range
          </h2>
          <p className="text-xs text-white/70 max-w-[260px] leading-relaxed">
            Engineered uniforms built for durability, elegance, and daily institutional pride.
          </p>
        </div>

        {/* Staggered Range Cards */}
        <div className="space-y-7">
          {rangeCards.map((card, idx) => (
            <div
              key={card.title}
              ref={(el) => {
                rangeCardRefs.current[idx] = el;
              }}
              className="relative w-full aspect-[4/5] rounded-[38px] overflow-hidden shadow-2xl border-2 border-white/10 group"
            >
              {/* Inner Parallax Image */}
              <div className="absolute inset-[-10%] w-[120%] h-[120%] card-image pointer-events-none">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 440px) 100vw, 440px"
                  className="object-cover object-center"
                />
              </div>

              {/* Gradient Vignette for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071522]/90 via-[#071522]/25 to-transparent" />

              {/* Card Details & Circular Action Button */}
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between z-10">
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-[#FF6A21] uppercase block">
                    {card.category}
                  </span>
                  <span className="text-xl font-black text-white tracking-tight uppercase drop-shadow-md">
                    {card.title}
                  </span>
                </div>
                <Link href={card.href} aria-label={`View ${card.title}`}>
                  <CircularButton
                    variant="solid-light"
                    size="sm"
                    className="shadow-xl group-hover:scale-110"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="pt-10 flex justify-center">
          <Link
            href="/collections"
            className="inline-flex items-center justify-between pl-6 pr-2 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white hover:bg-[#FF6A21] hover:border-[#FF6A21] transition-all duration-300 group shadow-lg"
          >
            <span>View Full Collection</span>
            <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white group-hover:text-[#071522] flex items-center justify-center transition-colors ml-4 text-white">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ===================== SECTION 4: CALL TO ACTION BANNER ===================== */}
      <section className="relative px-6 pb-16 bg-[#071522]">
        <div className="relative w-full rounded-[36px] bg-gradient-to-br from-[#101D2A] to-[#071522] border border-white/15 p-8 text-center overflow-hidden shadow-2xl space-y-4">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6A21]/20 rounded-full blur-2xl pointer-events-none" />

          <p className="text-[11px] font-mono tracking-widest text-[#FF6A21] uppercase">
            BESPOKE UNIFORM ATELIER
          </p>
          <h3 className="text-2xl font-black uppercase tracking-tight leading-tight text-white">
            Ready to Design
            <br />
            Your Institution's
            <br />
            Identity?
          </h3>

          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#FF6A21] hover:bg-[#FF8A45] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#FF6A21]/30 transition-all duration-300"
            >
              <span>Get in Touch</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
