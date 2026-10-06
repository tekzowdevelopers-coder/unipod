"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CircularButton from "@/components/CircularButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const products = [
  {
    id: "school",
    title: "School Uniforms",
    image: "/images/hero-student.jpg",
    alt: "Smiling school student in uniform",
    href: "/custom?category=school",
  },
  {
    id: "college",
    title: "College Uniforms",
    image: "/images/collections-college.jpg",
    alt: "College student in tailored blazer",
    href: "/custom?category=college",
  },
  {
    id: "sports",
    title: "Sports Wear",
    image: "/images/collections-sports.jpg",
    alt: "Students in sports polo uniform",
    href: "/custom?category=sports",
  },
  {
    id: "corporate",
    title: "Corporate Attire",
    image: "/images/collections-corporate.jpg",
    alt: "Corporate tailored attire",
    href: "/custom?category=corporate",
  },
  {
    id: "accessories",
    title: "Accessories",
    image: "/images/collections-accessories.jpg",
    alt: "School backpack, belt, socks",
    href: "/custom?category=accessories",
  },
];

export default function ProductsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cardRefs.current.filter(Boolean).forEach((card) => {
        gsap.fromTo(
          card,
          { y: 35, opacity: 0.8, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      if (bottomCardRef.current) {
        gsap.fromTo(
          bottomCardRef.current,
          { y: 40, opacity: 0.8 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomCardRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#071522] text-[#FFFDF9] min-h-screen">
      {/* ===================== HEADER SECTION ===================== */}
      <section className="pt-24 pb-8 px-6 relative bg-[#071522]">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.08] text-white">
          Our
          <br />
          Products
        </h1>
        <p className="text-xs text-white/70 mt-2 leading-relaxed max-w-[200px]">
          Designed for Every
          <br />
          Occasion
        </p>

        {/* Decorative orange wave curve swoop */}
        <div className="absolute -bottom-6 right-0 w-36 h-16 bg-[#F7F0E6] rounded-tl-full pointer-events-none" />
      </section>

      {/* ===================== PRODUCT CARDS LIST (CREAM BACKGROUND) ===================== */}
      <div className="relative bg-[#F7F0E6] rounded-t-[44px] pt-8 px-6 pb-16 shadow-2xl text-[#071522]">
        <div className="space-y-8">
          {products.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="space-y-3 group"
            >
              {/* Product Photograph */}
              <div className="relative w-full aspect-[4/5] rounded-[34px] overflow-hidden shadow-xl border-2 border-white">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 440px) 100vw, 440px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Title & View Collection CTA */}
              <div className="px-1">
                <h3 className="text-xl font-black text-[#071522] uppercase tracking-tight">
                  {item.title}
                </h3>
                <Link
                  href={item.href}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#FF6A21] hover:text-[#FF8A45] tracking-wide pt-1 transition-colors"
                >
                  <span>View Collection</span>
                  <ArrowRight size={13} className="stroke-[2.5]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ===================== BOTTOM PHOTO BANNER ===================== */}
        <div
          ref={bottomCardRef}
          className="mt-12 relative w-full aspect-[4/5] rounded-[38px] overflow-hidden shadow-2xl"
        >
          <Image
            src="/images/students-campus.jpg"
            alt="Students on campus"
            fill
            sizes="(max-width: 440px) 100vw, 440px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071522]/95 via-[#071522]/40 to-transparent" />

          {/* Banner Heading & Action Button */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10 text-white">
            <h4 className="text-2xl font-black uppercase tracking-tight leading-tight max-w-[220px]">
              Complete
              <br />
              Uniform Solutions
              <br />
              Under One Roof
            </h4>

            <Link href="/custom" aria-label="Explore Customization">
              <CircularButton
                variant="solid-orange"
                size="md"
                className="shadow-xl hover:scale-105 ml-2"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
