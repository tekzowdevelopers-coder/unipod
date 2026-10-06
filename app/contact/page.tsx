"use client";

import React, { useState } from "react";
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
  MapPin,
} from "lucide-react";
import UnipodLogo from "@/components/UnipodLogo";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    institutionType: "School / College / Organisation",
    requirement: "",
  });
  const [submitted, setSubmitted] = useState(false);

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
        institutionType: "School / College / Organisation",
        requirement: "",
      });
    }, 4500);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello UNIPOD, my name is ${formData.name || "an institution representative"}. I would like to inquire about uniforms for our institution.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <div className="w-full bg-[#071522] text-[#FFFDF9] min-h-screen">
      {/* ===================== HEADER SECTION ===================== */}
      <section className="pt-24 pb-6 px-6">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.08] text-white">
          Let's
          <br />
          Create
          <br />
          Your Uniform
          <br />
          <span className="text-[#FF6A21]">Story</span>
        </h1>
        <p className="text-xs text-white/70 font-normal mt-2 leading-relaxed max-w-[260px]">
          Get in touch for a tailored solution for your institution.
        </p>
      </section>

      {/* ===================== FLOATING INQUIRY FORM CARD ===================== */}
      <section className="px-6 pb-8">
        <div className="bg-[#FFFDF9] text-[#071522] rounded-[38px] p-6 shadow-2xl space-y-3.5 border border-white">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Your Name */}
            <div className="relative flex items-center bg-[#F7F0E6] rounded-2xl px-4 py-3">
              <User size={16} className="text-[#071522]/50 shrink-0 mr-3" />
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent text-xs font-semibold text-[#071522] placeholder-[#071522]/40 outline-none"
              />
            </div>

            {/* Phone Number */}
            <div className="relative flex items-center bg-[#F7F0E6] rounded-2xl px-4 py-3">
              <Phone size={16} className="text-[#071522]/50 shrink-0 mr-3" />
              <input
                type="tel"
                required
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-transparent text-xs font-semibold text-[#071522] placeholder-[#071522]/40 outline-none"
              />
            </div>

            {/* Email Address */}
            <div className="relative flex items-center bg-[#F7F0E6] rounded-2xl px-4 py-3">
              <Mail size={16} className="text-[#071522]/50 shrink-0 mr-3" />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent text-xs font-semibold text-[#071522] placeholder-[#071522]/40 outline-none"
              />
            </div>

            {/* School / College / Organisation */}
            <div className="relative flex items-center bg-[#F7F0E6] rounded-2xl px-4 py-3">
              <Building2 size={16} className="text-[#071522]/50 shrink-0 mr-3" />
              <select
                value={formData.institutionType}
                onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                className="w-full bg-transparent text-xs font-semibold text-[#071522] outline-none appearance-none cursor-pointer pr-6"
              >
                <option value="School / College / Organisation">School / College / Organisation</option>
                <option value="School">School / K-12</option>
                <option value="College">College / University</option>
                <option value="Sports Academy">Sports Academy / Club</option>
                <option value="Corporate Organisation">Corporate Organisation</option>
              </select>
              <ChevronDown size={14} className="text-[#071522]/50 absolute right-4 pointer-events-none" />
            </div>

            {/* Your Requirement */}
            <div className="relative flex items-center bg-[#F7F0E6] rounded-2xl px-4 py-3">
              <FileText size={16} className="text-[#071522]/50 shrink-0 mr-3" />
              <input
                type="text"
                placeholder="Your Requirement"
                value={formData.requirement}
                onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                className="w-full bg-transparent text-xs font-semibold text-[#071522] placeholder-[#071522]/40 outline-none"
              />
            </div>

            {/* Send Enquiry CTA Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-[#FF6A21] hover:bg-[#FF8A45] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-[#FF6A21]/30 transition-all duration-300 mt-2"
            >
              {submitted ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Enquiry Sent Successfully</span>
                </>
              ) : (
                <>
                  <span>Send Enquiry</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* ===================== OR CONNECT WITH US ===================== */}
      <section className="px-6 pb-8 text-center space-y-4">
        <span className="text-[11px] font-mono tracking-widest uppercase text-white/50 block">
          — Or Connect With Us —
        </span>

        {/* 3 Circular Contact Action Buttons */}
        <div className="flex items-center justify-center space-x-6">
          <a
            href="tel:+919876543210"
            className="flex flex-col items-center space-y-1.5 group"
          >
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 group-hover:bg-[#FF6A21] group-hover:border-[#FF6A21] group-hover:text-white transition-all shadow-md">
              <PhoneCall size={18} />
            </div>
            <span className="text-[11px] text-white/70 group-hover:text-white font-medium">Call</span>
          </a>

          <button
            onClick={handleWhatsApp}
            className="flex flex-col items-center space-y-1.5 group"
          >
            <div className="w-12 h-12 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all shadow-md">
              <MessageCircle size={18} />
            </div>
            <span className="text-[11px] text-white/70 group-hover:text-white font-medium">WhatsApp</span>
          </button>

          <a
            href="mailto:contact@unipod.in"
            className="flex flex-col items-center space-y-1.5 group"
          >
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 group-hover:bg-[#FF6A21] group-hover:border-[#FF6A21] group-hover:text-white transition-all shadow-md">
              <Mail size={18} />
            </div>
            <span className="text-[11px] text-white/70 group-hover:text-white font-medium">Email</span>
          </a>
        </div>
      </section>

      {/* ===================== OUR LOCATION MAP CARD ===================== */}
      <section className="px-6 pb-8">
        <a
          href="https://maps.google.com/?q=Chennai,Tamil+Nadu,India"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white text-[#071522] rounded-[34px] overflow-hidden shadow-xl border border-white group transition-all"
        >
          {/* Map Graphic Simulation */}
          <div className="relative w-full aspect-[16/9] bg-[#E5E3DF] overflow-hidden flex items-center justify-center">
            {/* Street Grid Graphic Pattern */}
            <svg
              className="absolute inset-0 w-full h-full opacity-60"
              viewBox="0 0 300 150"
              preserveAspectRatio="none"
            >
              <line x1="0" y1="40" x2="300" y2="40" stroke="#FFF" strokeWidth="4" />
              <line x1="0" y1="95" x2="300" y2="95" stroke="#FFF" strokeWidth="5" />
              <line x1="70" y1="0" x2="70" y2="150" stroke="#FFF" strokeWidth="4" />
              <line x1="180" y1="0" x2="180" y2="150" stroke="#FFF" strokeWidth="5" />
              <line x1="0" y1="20" x2="160" y2="150" stroke="#D3CFCA" strokeWidth="3" />
              <line x1="100" y1="0" x2="300" y2="130" stroke="#D3CFCA" strokeWidth="4" />
            </svg>

            {/* Glowing Orange Pin */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#FF6A21] text-white flex items-center justify-center shadow-lg shadow-[#FF6A21]/50 group-hover:scale-110 transition-transform">
                <MapPin size={20} className="fill-white" />
              </div>
            </div>
          </div>

          {/* Location Caption */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase text-[#071522] block">
                Our Location
              </span>
              <span className="text-[11px] text-[#071522]/70 font-medium">
                Chennai, Tamil Nadu, India
              </span>
            </div>
            <ArrowRight size={14} className="text-[#071522]/50 group-hover:text-[#FF6A21] group-hover:translate-x-1 transition-all" />
          </div>
        </a>
      </section>

      {/* ===================== STUDENTS PHOTO CARD ===================== */}
      <section className="px-6 pb-6">
        <div className="relative w-full aspect-[4/5] rounded-[36px] overflow-hidden shadow-2xl border border-white/10">
          <Image
            src="/images/school-students.jpg"
            alt="School students in uniform"
            fill
            sizes="(max-width: 440px) 100vw, 440px"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ===================== EDITORIAL SCRIPT CARD ===================== */}
      <section className="px-6 pb-12">
        <div className="relative w-full bg-[#F7F0E6] text-[#071522] rounded-[36px] p-8 shadow-xl overflow-hidden flex flex-col items-center text-center">
          <p className="font-script text-3xl md:text-4xl text-[#071522] leading-tight select-none pt-2 pb-1 rotate-[-2deg]">
            Partnering
            <br />
            in Education
            <br />
            for a Brighter
            <br />
            Tomorrow
          </p>

          <div className="flex flex-col items-center space-y-1 mt-3">
            <div className="w-24 h-[2px] bg-[#FF6A21] rounded-full rotate-[-2deg]" />
            <div className="w-16 h-[2px] bg-[#FF6A21]/70 rounded-full rotate-[-2deg]" />
          </div>
        </div>
      </section>

      {/* ===================== CLEAN DARK FOOTER ===================== */}
      <footer className="w-full bg-[#071522] border-t border-white/10 pt-12 pb-14 px-6 flex flex-col items-center text-center space-y-6">
        <UnipodLogo size="md" />

        {/* Social Icons */}
        <div className="flex items-center space-x-3 pt-2">
          {["f", "ig", "in", "yt"].map((s) => (
            <a
              key={s}
              href="#"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#FF6A21] hover:bg-[#FF6A21]/10 transition-colors"
            >
              <span className="font-bold text-xs uppercase">{s}</span>
            </a>
          ))}
        </div>

        <p className="text-[11px] text-white/40 tracking-wider">
          © 2024 Unipod. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
