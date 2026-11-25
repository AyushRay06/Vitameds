"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Landmark,
  HeartHandshake,
  Store,
  Microscope,
  BriefcaseMedical,
  ArrowRight,
} from "lucide-react";

const SEGMENTS = [
  {
    num: "01",
    title: "Hospitals and clinics",
    tag: "TURNKEY & WARD SUPPLY",
    detail:
      "Multi-specialty hospitals, ICU trauma wings, surgical centers, and outpatient clinics relying on consolidated, reliable equipment and consumable replenishment.",
    supply: ["Motorized ICU Beds", "Patient Monitors", "Surgical Instruments"],
    icon: Building2,
  },
  {
    num: "02",
    title: "Government and tender buyers",
    tag: "PUBLIC HEALTH PROCUREMENT",
    detail:
      "Ministry of Health tenders, GeM portal procurement, and public hospital turnkey orders backed by complete BOQ itemization and regulatory dossiers.",
    supply: ["ISO & CE Dossiers", "GeM Tender Support", "Factory Calibration"],
    icon: Landmark,
  },
  {
    num: "03",
    title: "NGOs and relief organisations",
    tag: "HUMANITARIAN & EMERGENCY",
    detail:
      "Humanitarian health missions, emergency response kits, and mobile clinical camps requiring rapid air-freight readiness and ruggedized packaging.",
    supply: ["Rapid Test Kits", "Sterile Dressings", "Emergency Field Kits"],
    icon: HeartHandshake,
  },
  {
    num: "04",
    title: "Pharmacies and distributors",
    tag: "REGIONAL WHOLESALE",
    detail:
      "Regional medical wholesalers, retail pharmacy networks, and national stockists benefiting from volume pricing and consistent SKU availability.",
    supply: ["Medical Disposables", "Pharma Formulations", "Private Label OEM"],
    icon: Store,
  },
  {
    num: "05",
    title: "Diagnostic labs",
    tag: "PATHOLOGY & TESTING",
    detail:
      "Clinical pathology laboratories, rapid test centers, and automated diagnostic suites needing precision analyzers and cold-chain reagent handling.",
    supply: ["Lab Analyzers", "Rapid Diagnostic Kits", "Cold-Chain Freight"],
    icon: Microscope,
  },
  {
    num: "06",
    title: "Medical procurement agents",
    tag: "GLOBAL SOURCING DESKS",
    detail:
      "International sourcing desks and institutional healthcare project consultants consolidating multi-category orders with 24-hour quotation turnaround.",
    supply: ["24h Quotations", "Multi-Category LCL/FCL", "Export Paperwork"],
    icon: BriefcaseMedical,
  },
];

const CARD_TEAR_BOTTOM =
  "M0,0 L480,0 L480,6 L458,11 L436,4 L414,12 L392,5 L370,10 L348,4 L326,12 L304,5 L282,11 L260,3 L238,12 L216,5 L194,10 L172,4 L150,12 L128,5 L106,11 L84,4 L62,12 L40,5 L18,10 L0,6 Z";

export default function WhoWeServeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SEGMENTS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SEGMENTS.length);
  };

  return (
    <section id="who-we-serve" className="relative w-full bg-white py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="mx-auto max-w-[1312px]">
        <div className="mb-14 max-w-2xl space-y-3">
          <span className="doe-tag block">05 · Who We Serve</span>
          <h2 className="font-editorial text-[clamp(40px,4.8vw,74px)] font-normal tracking-[-0.035em] leading-[0.98] text-[#0b0f0d]">
            Built for institutional{" "}
            <em className="italic font-light text-[#163f35]">healthcare buyers.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left 5 Columns: Interactive Buyer Index */}
          <div className="lg:col-span-5 divide-y divide-[rgba(11,15,13,0.12)] border-y border-[rgba(11,15,13,0.12)]">
            {SEGMENTS.map((seg, idx) => {
              const isActive = idx === activeIndex;
              const Icon = seg.icon;
              return (
                <button
                  key={seg.num}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full py-4 px-3 flex items-center justify-between gap-4 text-left cursor-pointer transition-all duration-200 ${
                    isActive ? "bg-[#f2efe6]/70" : "hover:bg-[#f2efe6]/35"
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span
                      className={`font-mono text-xs transition-colors ${
                        isActive ? "text-[#163f35] font-bold" : "text-[#454c48]/60"
                      }`}
                    >
                      {seg.num}
                    </span>
                    <span
                      className={`text-base sm:text-lg tracking-[-0.015em] truncate transition-all ${
                        isActive
                          ? "font-editorial italic text-[#163f35] translate-x-1"
                          : "font-medium text-[#0b0f0d]"
                      }`}
                    >
                      {seg.title}
                    </span>
                  </div>
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isActive
                        ? "border-[#163f35] bg-[#163f35] text-white"
                        : "border-[rgba(22,63,53,0.16)] bg-white text-[#163f35]/70"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right 7 Columns: Interactive Pinned Paper Dossier Stack */}
          <div className="lg:col-span-7 relative flex items-center justify-center py-6 px-3 sm:px-0">
            <div className="relative w-full max-w-[520px]">
              {/* Back-most rotated green paper sheet for depth */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rotate-[2.6deg] bg-[#163f35] opacity-90 shadow-lg"
              />
              {/* Second offset cream paper sheet */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -translate-x-2 translate-y-1.5 -rotate-[1.8deg] border border-[rgba(22,63,53,0.18)] bg-[#e7e2d4] shadow-md"
              />

              {/* Active Front Pinned Paper Dossier Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.num}
                  initial={{ opacity: 0, y: 14, rotate: -1.5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -12, rotate: 1.5 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  onClick={handleNext}
                  className="relative cursor-pointer pt-3 drop-shadow-[0_18px_36px_rgba(11,15,13,0.14)]"
                >
                  {/* Mini glossy #163f35 pushpin */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 32 32"
                      className="drop-shadow-[0_4px_5px_rgba(11,15,13,0.3)]"
                    >
                      <circle cx="16" cy="14" r="7.5" fill="#163f35" />
                      <circle cx="16" cy="13" r="6" fill="#1e5447" />
                      <ellipse cx="14" cy="11" rx="2.4" ry="1.3" fill="#ffffff" opacity="0.55" />
                    </svg>
                  </div>

                  {/* Cream paper card body */}
                  <div
                    className="border border-b-0 border-[rgba(22,63,53,0.18)] bg-[#f2efe6] px-7 sm:px-9 pt-9 pb-7"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(22,63,53,0.04) 1px, transparent 0)",
                      backgroundSize: "14px 14px",
                    }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#163f35]">
                        DOSSIER {active.num} · {active.tag}
                      </span>
                      <span className="font-mono text-[10.5px] text-[#454c48]">
                        {activeIndex + 1} / {SEGMENTS.length}
                      </span>
                    </div>

                    <div className="flex items-start gap-4 mb-5">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#163f35] text-white">
                        <active.icon className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <h3 className="font-editorial text-3xl sm:text-4xl font-normal tracking-[-0.025em] leading-[1.05] text-[#0b0f0d]">
                        {active.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-[15px] text-[#454c48] leading-relaxed mb-7">
                      {active.detail}
                    </p>

                    <div className="pt-5 border-t border-dashed border-[rgba(22,63,53,0.22)] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        {active.supply.map((item) => (
                          <span
                            key={item}
                            className="inline-block border border-[rgba(22,63,53,0.18)] bg-white/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#163f35]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#163f35]">
                        <span>Next</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Torn bottom paper edge */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 480 14"
                    preserveAspectRatio="none"
                    className="block h-[12px] w-full"
                  >
                    <path d={CARD_TEAR_BOTTOM} fill="#ffffff" transform="translate(0,1.4)" />
                    <path d={CARD_TEAR_BOTTOM} fill="#f2efe6" />
                  </svg>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
