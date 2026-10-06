"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  School,
  Trophy,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Award,
  Sparkles,
} from "lucide-react";
import CircularButton from "@/components/CircularButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const galleryCards = [
  {
    category: "Schools",
    icon: School,
    image: "/images/gallery-school.jpg",
    alt: "School student in courtyard",
    institution: "St. Xavier's International School",
    details: "Navy blazers, pleated skirts & tailored trousers",
  },
  {
    category: "Colleges",
    icon: GraduationCap,
    image: "/images/gallery-college.jpg",
    alt: "College student in uniform blazer",
    institution: "National College of Technology",
    details: "Single-breasted wool blazers with gold crests",
  },
  {
    category: "Sports",
    icon: Trophy,
    image: "/images/gallery-sports.jpg",
    alt: "Sports team students in uniform polo",
    institution: "Apex Athletic Sports Academy",
    details: "Dry-fit moisture-wicking team jerseys & tracksuits",
  },
  {
    category: "Corporate",
    icon: Briefcase,
    image: "/images/gallery-corporate.jpg",
    alt: "Corporate tailored attire with crest",
    institution: "Horizon Global Group",
    details: "Executive staff suiting & administrative attire",
  },
];

const testimonials = [
  {
    quote: "Excellent quality and perfect fit. Our students love it!",
    author: "Principal Dr. R. Sharma",
    institution: "Heritage World Academy",
    campus: "/images/institution-campus.jpg",
  },
  {
    quote: "UNIPOD elevated our institution's visual identity tremendously. The student-wise packaging saved our team days of work.",
    author: "Dean of Student Affairs",
    institution: "National College of Arts & Science",
    campus: "/images/institution-campus.jpg",
  },
  {
    quote: "Exceptional fabric durability that withstands intense sports training and regular wash cycles effortlessly.",
    author: "Athletic Director",
    institution: "Olympus International Sports Hub",
    campus: "/images/institution-campus.jpg",
  },
];

const stats = [
  { value: "250+", label: "Leading Institutions" },
  { value: "500K+", label: "Students Outfitted" },
  { value: "99.8%", label: "On-Time Dispatch" },
];

export default function OurWorkPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cardRefs.current.filter(Boolean).forEach((card) => {
        // Card entry
        gsap.fromTo(
          card,
          { opacity: 0.7, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
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
        const img = card?.querySelector(".parallax-inner");
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
  }, []);

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    animateQuoteChange();
  };

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    animateQuoteChange();
  };

  const animateQuoteChange = () => {
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-[#071522] text-[#FFFDF9] min-h-screen">
      {/* ===================== HEADER SECTION ===================== */}
      <section className="pt-24 pb-8 px-6">
        <p className="text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase mb-2">
          OUR WORK
        </p>
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.12]">
          Real Uniforms.
          <br />
          Real <span className="text-[#FF6A21]">Impact.</span>
        </h1>
        <p className="text-xs md:text-sm text-white/70 font-normal mt-2 leading-relaxed max-w-[280px]">
          Trusted by India's premier academic institutions and sports organizations.
        </p>
      </section>

      {/* ===================== STATS BAR ===================== */}
      <section className="px-6 pb-10">
        <div className="grid grid-cols-3 gap-2 py-4 px-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <span className="text-lg font-black text-[#FF6A21] block tracking-tight">
                {s.value}
              </span>
              <span className="text-[10px] text-white/60 font-medium leading-tight block mt-0.5">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== VISUAL GALLERY CARDS ===================== */}
      <section className="px-6 pb-14 flex flex-col space-y-7">
        {galleryCards.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.category}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="relative w-full aspect-[4/5] rounded-[38px] overflow-hidden shadow-2xl border-2 border-white/10 group"
            >
              {/* Inner Parallax Image */}
              <div className="absolute inset-[-10%] w-[120%] h-[120%] parallax-inner pointer-events-none">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 440px) 100vw, 440px"
                  className="object-cover object-center"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#071522]/95 via-[#071522]/20 to-transparent" />

              {/* Floating Glass Category Pill Badge */}
              <div className="absolute top-5 left-5 z-10">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg">
                  <Icon size={14} className="text-[#FF6A21] stroke-[2.2]" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Bottom Institution Title & Details */}
              <div className="absolute bottom-5 left-6 right-6 z-10 text-white">
                <h3 className="text-lg font-black uppercase tracking-tight leading-snug drop-shadow-md">
                  {item.institution}
                </h3>
                <p className="text-xs text-white/70 mt-1 line-clamp-1">
                  {item.details}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* ===================== TRUSTED INSTITUTIONS & TESTIMONIALS ===================== */}
      <section className="bg-[#F7F0E6] text-[#071522] rounded-t-[44px] pt-12 px-6 pb-14 shadow-2xl relative">
        {/* Header with Navigation Controls */}
        <div className="flex items-center justify-between pb-6">
          <h2 className="text-2xl font-black uppercase tracking-tight leading-tight text-[#071522] max-w-[210px]">
            Trusted by
            <br />
            Leading
            <br />
            Institutions
          </h2>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full bg-[#071522] text-white flex items-center justify-center hover:bg-[#FF6A21] active:scale-95 transition-all shadow-md"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-white text-[#071522] border border-[#071522]/20 flex items-center justify-center hover:bg-[#FF6A21] hover:text-white active:scale-95 transition-all shadow-md"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Institution Campus Image Card */}
        <div className="relative w-full aspect-[16/11] rounded-[32px] overflow-hidden shadow-xl border border-[#071522]/10 mb-6">
          <Image
            src={testimonials[activeTestimonial].campus}
            alt="Institution campus building"
            fill
            sizes="(max-width: 440px) 100vw, 440px"
            className="object-cover object-center"
          />
        </div>

        {/* Testimonial Quote & Attribution with Animated Transition */}
        <div ref={quoteRef} className="space-y-3 text-center px-2">
          <span className="text-3xl font-serif text-[#FF6A21] block leading-none">“</span>
          <p className="text-sm font-bold text-[#071522] leading-snug max-w-[270px] mx-auto">
            {testimonials[activeTestimonial].quote}
          </p>
          <div className="pt-1">
            <p className="text-xs font-black uppercase text-[#071522]">
              {testimonials[activeTestimonial].institution}
            </p>
            <p className="text-[11px] text-[#071522]/60 font-medium">
              {testimonials[activeTestimonial].author}
            </p>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center space-x-2 pt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveTestimonial(i);
                  animateQuoteChange();
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeTestimonial === i
                    ? "w-6 bg-[#FF6A21]"
                    : "w-2 bg-[#071522]/20 hover:bg-[#071522]/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Orange Wave Graphic */}
        <div className="relative w-full h-16 mt-8 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-6 -left-6 right-0 h-24 bg-gradient-to-r from-[#FF6A21] to-[#FF8A45] rounded-t-full opacity-90" />
        </div>
      </section>

      {/* Dark Footer Transition CTA */}
      <section className="bg-[#071522] py-12 px-6 text-center space-y-4">
        <h4 className="text-xl font-black uppercase tracking-tight text-white">
          Empower Your Institution
        </h4>
        <p className="text-xs text-white/70 max-w-[240px] mx-auto">
          Contact our uniform design team to schedule an on-campus consultation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#FF6A21] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#FF6A21]/30 hover:bg-[#FF8A45] transition-all"
        >
          <span>Request Campus Visit</span>
          <CircularButton variant="solid-orange" size="sm" className="w-5 h-5 bg-transparent border-none text-white" />
        </Link>
      </section>
    </div>
  );
}
