"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Phone,
  Mail,
  Building2,
  FileText,
  ChevronDown,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  PhoneCall,
  Clock,
  MapPin,
} from "lucide-react";
import UnipodLogo from "@/components/UnipodLogo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    institutionType: "School",
    requirement: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const campusImgRef = useRef<HTMLDivElement>(null);
  const scriptCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (campusImgRef.current) {
        gsap.to(campusImgRef.current, {
          yPercent: 12,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: campusImgRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (scriptCardRef.current) {
        gsap.fromTo(
          scriptCardRef.current,
          { y: 40, opacity: 0.8 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: scriptCardRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        institutionType: "School",
        requirement: "",
      });
    }, 4500);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello UNIPOD, my name is ${formData.name || "an institution representative"}. I would like to inquire about uniforms for our ${formData.institutionType}.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <div ref={containerRef} className="w-full bg-[#071522] text-[#FFFDF9] min-h-screen">
      {/* ===================== HEADER SECTION ===================== */}
      <section className="pt-24 pb-6 px-6">
        <p className="text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase mb-2">
          GET IN TOUCH
        </p>
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.12]">
          Let's Create
          <br />
          Your Uniform
          <br />
          <span className="text-[#FF6A21]">Story</span>
        </h1>
        <p className="text-xs md:text-sm text-white/70 font-normal mt-2 leading-relaxed max-w-[280px]">
          Share your requirements and our master tailoring team will reach out.
        </p>
      </section>

      {/* ===================== FAST CONTACT BUTTONS ===================== */}
      <section className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-2">
          <a
            href="tel:+919876543210"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF6A21] hover:bg-white/10 transition-colors group"
          >
            <PhoneCall size={18} className="text-[#FF6A21] mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-white">Call</span>
          </a>
          <button
            onClick={handleWhatsApp}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors group"
          >
            <MessageCircle size={18} className="text-[#25D366] mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#25D366]">WhatsApp</span>
          </button>
          <a
            href="mailto:contact@unipod.in"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF6A21] hover:bg-white/10 transition-colors group"
          >
            <Mail size={18} className="text-[#FF6A21] mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-white">Email</span>
          </a>
        </div>
      </section>

      {/* ===================== ENQUIRY FORM ===================== */}
      <section className="px-6 pb-12">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Your Name */}
          <div className="relative flex items-center bg-white rounded-2xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-[#FF6A21] transition-all">
            <User size={18} className="text-[#071522]/50 shrink-0 mr-3" />
            <input
              type="text"
              required
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent text-sm font-medium text-[#071522] placeholder-[#071522]/40 outline-none"
            />
          </div>

          {/* Phone Number */}
          <div className="relative flex items-center bg-white rounded-2xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-[#FF6A21] transition-all">
            <Phone size={18} className="text-[#071522]/50 shrink-0 mr-3" />
            <input
              type="tel"
              required
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-transparent text-sm font-medium text-[#071522] placeholder-[#071522]/40 outline-none"
            />
          </div>

          {/* Email Address */}
          <div className="relative flex items-center bg-white rounded-2xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-[#FF6A21] transition-all">
            <Mail size={18} className="text-[#071522]/50 shrink-0 mr-3" />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent text-sm font-medium text-[#071522] placeholder-[#071522]/40 outline-none"
            />
          </div>

          {/* School / College / Organisation Dropdown */}
          <div className="relative flex items-center bg-white rounded-2xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-[#FF6A21] transition-all">
            <Building2 size={18} className="text-[#071522]/50 shrink-0 mr-3" />
            <select
              value={formData.institutionType}
              onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
              className="w-full bg-transparent text-sm font-medium text-[#071522] outline-none appearance-none cursor-pointer pr-6"
            >
              <option value="School">School / K-12</option>
              <option value="College">College / University</option>
              <option value="Sports Academy">Sports Academy / Club</option>
              <option value="Corporate Organisation">Corporate Organisation</option>
            </select>
            <ChevronDown size={16} className="text-[#071522]/50 absolute right-4 pointer-events-none" />
          </div>

          {/* Your Requirement */}
          <div className="relative flex items-start bg-white rounded-2xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-[#FF6A21] transition-all">
            <FileText size={18} className="text-[#071522]/50 shrink-0 mr-3 mt-0.5" />
            <textarea
              rows={2}
              placeholder="Your Requirement (Approx. student count, uniform types)"
              value={formData.requirement}
              onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
              className="w-full bg-transparent text-sm font-medium text-[#071522] placeholder-[#071522]/40 outline-none resize-none"
            />
          </div>

          {/* Primary CTA: Send Enquiry */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-full bg-[#FF6A21] hover:bg-[#FF8A45] active:scale-[0.98] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-[#FF6A21]/30 transition-all duration-300"
          >
            {submitted ? (
              <>
                <CheckCircle2 size={18} />
                <span>Enquiry Sent Successfully</span>
              </>
            ) : (
              <>
                <span>Send Enquiry</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          {/* OR Divider */}
          <div className="flex items-center justify-center space-x-3 py-1 text-white/40 text-[11px] font-mono tracking-widest uppercase">
            <div className="h-[1px] w-12 bg-white/20" />
            <span>OR</span>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>

          {/* WhatsApp CTA Button */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-bold text-sm tracking-wide flex items-center justify-center space-x-2.5 shadow-xl shadow-[#25D366]/25 transition-all duration-300"
          >
            <MessageCircle size={18} className="fill-white/20 stroke-[2.2]" />
            <span>Enquire on WhatsApp</span>
          </button>
        </form>
      </section>

      {/* ===================== STUDENTS CAMPUS PHOTO CARD ===================== */}
      <section className="px-6 pb-8">
        <div className="relative w-full aspect-[4/5] rounded-[38px] overflow-hidden shadow-2xl border border-white/10 group">
          <div ref={campusImgRef} className="absolute inset-[-10%] w-[120%] h-[120%] pointer-events-none">
            <Image
              src="/images/students-campus.jpg"
              alt="Students walking towards campus"
              fill
              sizes="(max-width: 440px) 100vw, 440px"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#071522]/85 via-transparent to-black/20" />

          <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
            <span className="text-[10px] font-mono tracking-wider text-[#FF6A21] uppercase block">
              Direct Supply
            </span>
            <span className="text-lg font-bold uppercase tracking-tight">
              Campuses Across India
            </span>
          </div>
        </div>
      </section>

      {/* ===================== EDITORIAL SCRIPT CARD ===================== */}
      <section className="px-6 pb-14">
        <div
          ref={scriptCardRef}
          className="relative w-full bg-[#F7F0E6] text-[#071522] rounded-[38px] p-8 shadow-xl overflow-hidden flex flex-col items-center text-center"
        >
          {/* Handwritten Cursive Editorial Typography */}
          <p className="font-script text-3xl md:text-4xl text-[#071522] leading-tight select-none pt-2 pb-1 rotate-[-2deg]">
            Partnering
            <br />
            in Education
            <br />
            for a Brighter
            <br />
            Tomorrow
          </p>

          {/* Double orange brush swooshes underneath */}
          <div className="flex flex-col items-center space-y-1 mt-3">
            <div className="w-28 h-[2px] bg-[#FF6A21] rounded-full rotate-[-2deg]" />
            <div className="w-20 h-[2px] bg-[#FF6A21]/70 rounded-full rotate-[-2deg]" />
          </div>
        </div>
      </section>

      {/* ===================== CLEAN DARK FOOTER ===================== */}
      <footer className="w-full bg-[#071522] border-t border-white/10 pt-12 pb-14 px-6 flex flex-col items-center text-center space-y-6">
        {/* UNIPOD Logo */}
        <UnipodLogo size="md" />

        {/* Minimal Social Media Icons */}
        <div className="flex items-center space-x-3 pt-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#FF6A21] hover:bg-[#FF6A21]/10 transition-colors"
          >
            <span className="font-bold text-xs">f</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#FF6A21] hover:bg-[#FF6A21]/10 transition-colors"
          >
            <span className="font-bold text-xs">ig</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#FF6A21] hover:bg-[#FF6A21]/10 transition-colors"
          >
            <span className="font-bold text-xs">in</span>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#FF6A21] hover:bg-[#FF6A21]/10 transition-colors"
          >
            <span className="font-bold text-xs">yt</span>
          </a>
        </div>

        {/* Minimal Links */}
        <div className="flex items-center space-x-4 text-xs text-white/50 pt-1">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>•</span>
          <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
          <span>•</span>
          <Link href="/custom" className="hover:text-white transition-colors">Custom</Link>
          <span>•</span>
          <Link href="/our-work" className="hover:text-white transition-colors">Our Work</Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Copyright */}
        <p className="text-[11px] text-white/40 tracking-wider">
          © 2024 Unipod. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
