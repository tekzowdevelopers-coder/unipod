"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import CircularButton from "@/components/CircularButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    step: "1",
    title: "Design",
    desc: "Create a look that reflects your institution's identity.",
    type: "design",
    swatches: ["#071522", "#C8B69B", "#5C1D24"],
  },
  {
    step: "2",
    title: "Fabric",
    desc: "Choose from premium & comfortable fabrics.",
    type: "fabric",
    image: "/images/pinstripe-texture.jpg",
  },
  {
    step: "3",
    title: "Stitching",
    desc: "Precision tailoring for the perfect fit.",
    type: "stitching",
    image: "/images/custom-tailoring.jpg",
  },
  {
    step: "4",
    title: "Final Look",
    desc: "Uniforms that inspire confidence.",
    type: "final",
    image: "/images/blazer-crest.jpg",
  },
];

export default function CustomPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 18,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: "#custom-timeline",
              start: "top 70%",
              end: "bottom 85%",
              scrub: 0.6,
            },
          }
        );
      }

      stepRefs.current.filter(Boolean).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.4, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
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
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.08] text-white">
          Customized
          <br />
          for Your
          <br />
          <span className="text-[#FF6A21]">Identity</span>
        </h1>
        <p className="text-xs text-white/70 font-normal mt-2 leading-relaxed">
          Design. Fabric. Perfect Fit.
        </p>
      </section>

      {/* ===================== HERO SUIT MANNEQUIN PHOTO ===================== */}
      <section className="px-6 pb-10">
        <div className="relative w-full aspect-[4/5] rounded-[38px] overflow-hidden shadow-2xl border-2 border-white/10 group">
          <div ref={heroImageRef} className="absolute inset-[-10%] w-[120%] h-[120%] pointer-events-none">
            <Image
              src="/images/collections-corporate.jpg"
              alt="Tailored mannequin suit with pocket crest"
              fill
              sizes="(max-width: 440px) 100vw, 440px"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#071522]/85 via-transparent to-black/20" />
        </div>
      </section>

      {/* ===================== 4-STEP TIMELINE (CREAM BACKGROUND) ===================== */}
      <section className="bg-[#F7F0E6] text-[#071522] rounded-t-[44px] pt-12 px-6 pb-16 shadow-2xl relative">
        <div id="custom-timeline" className="relative pl-7 max-w-sm mx-auto">
          {/* Vertical Track Background Line */}
          <div className="absolute left-[13px] top-4 bottom-8 w-[2px] bg-[#EDE3D5]" />

          {/* Animated Scrubbing Vertical Line */}
          <div
            ref={timelineLineRef}
            className="absolute left-[13px] top-4 bottom-8 w-[2px] bg-gradient-to-b from-[#FF6A21] to-[#FF8A45] origin-top"
          />

          {/* 4 Steps */}
          <div className="space-y-12">
            {steps.map((item, idx) => (
              <div
                key={item.step}
                ref={(el) => {
                  stepRefs.current[idx] = el;
                }}
                className="relative space-y-3"
              >
                {/* Numbered Orange Circle Node */}
                <div className="absolute -left-7 top-0 w-7 h-7 rounded-full bg-[#FF6A21] text-white font-bold text-xs flex items-center justify-center shadow-md shadow-[#FF6A21]/40 border-2 border-white z-10">
                  {item.step}
                </div>

                {/* Step Heading & Description */}
                <div className="pl-3">
                  <h3 className="text-xl font-black uppercase tracking-tight text-[#071522]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#071522]/70 leading-relaxed mt-0.5">
                    {item.desc}
                  </p>
                </div>

                {/* Step Visual Card */}
                <div className="pl-3 pt-1">
                  {item.type === "design" ? (
                    <div className="relative w-full aspect-[16/11] rounded-3xl bg-white p-4 shadow-lg border border-[#EDE3D5] flex flex-col justify-between">
                      {/* Blazer Sketch Simulation */}
                      <div className="flex-1 flex items-center justify-center">
                        <svg
                          viewBox="0 0 120 120"
                          className="w-24 h-24 stroke-[#071522]/70 fill-none"
                          strokeWidth="2"
                        >
                          {/* Blazer outline sketch */}
                          <path d="M40 20 L20 40 L30 110 L90 110 L100 40 L80 20 Z" />
                          <path d="M40 20 L60 65 L80 20" />
                          <path d="M60 65 L60 110" />
                          <path d="M30 60 L45 60 L45 75 L30 75 Z" />
                          <path d="M75 60 L90 60 L90 75 L75 75 Z" />
                          <path d="M35 38 L50 48" />
                          <path d="M85 38 L70 48" />
                        </svg>
                      </div>

                      {/* Swatch color dots */}
                      <div className="flex items-center justify-center space-x-2 pt-2 border-t border-[#EDE3D5]">
                        {item.swatches?.map((c) => (
                          <span
                            key={c}
                            className="w-4 h-4 rounded-full border border-black/10 shadow-sm"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[16/11] rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                      <Image
                        src={item.image || "/images/custom-tailoring.jpg"}
                        alt={item.title}
                        fill
                        sizes="(max-width: 440px) 100vw, 440px"
                        className="object-cover object-center"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================== BOTTOM CTA ===================== */}
        <div className="pt-14 pb-4 flex flex-col items-center text-center space-y-3">
          <Link href="/contact" aria-label="Start Customized Consultation">
            <CircularButton
              variant="solid-orange"
              size="md"
              className="shadow-xl hover:scale-105"
            />
          </Link>
          <div className="text-xs font-black uppercase tracking-wider text-[#071522]">
            <span>Your Vision</span>
            <br />
            <span className="text-[#071522]/60">Our Expertise</span>
          </div>
        </div>
      </section>
    </div>
  );
}
