"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Division {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  description: string;
  slug: string;
  image: string;
}

const DIVISIONS: Division[] = [
  {
    id: "medical-equipment",
    num: "01",
    name: "Medical Equipment",
    subtitle: "ICU Monitors · Infusion & Suction",
    description: "Multi-parameter patient monitors, defibrillators, and high-vacuum clinical suction units.",
    slug: "medical-equipment",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hospital-furniture",
    num: "02",
    name: "Hospital Furniture",
    subtitle: "5-Function ICU Beds · OT Tables",
    description: "Motorized ICU beds, emergency crash carts, and hydraulic surgical examination tables.",
    slug: "hospital-furniture",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pharma",
    num: "03",
    name: "Pharma",
    subtitle: "IV Fluids · Sterile Formulations",
    description: "Sterile infusion solutions, clinical injectables, and hospital-grade formulations.",
    slug: "medical-disposables",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "medical-disposable",
    num: "04",
    name: "Medical Disposable",
    subtitle: "Syringes · IV Cannulas · PPE",
    description: "Gamma-sterilized syringes, infusion sets, cannulas, and sterile surgical drapes.",
    slug: "medical-disposables",
    image: "https://images.unsplash.com/photo-1583912267670-6575ad3726f9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hospital-dressing",
    num: "05",
    name: "Hospital Dressing",
    subtitle: "Sterile Gauze · Surgical Swabs",
    description: "Absorbent cotton rolls, sterile gauze pads, and surgical wound care dressings.",
    slug: "ward-icu-holloware",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "diagnostics",
    num: "06",
    name: "Diagnostics",
    subtitle: "Ultrasound · ECG · Analyzers",
    description: "Digital ECG machines, ultrasound scanners, and automated clinical lab analyzers.",
    slug: "medical-equipment",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "surgical-equipment",
    num: "07",
    name: "Surgical Equipment",
    subtitle: "OT Lights · Forceps · Autoclaves",
    description: "Shadowless LED OT lights, German-grade forceps, and horizontal CSSD autoclaves.",
    slug: "surgical-instruments",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ProductCategoriesSection() {
  const [activeId, setActiveId] = useState<string>(DIVISIONS[0].id);
  const current = DIVISIONS.find((d) => d.id === activeId) ?? DIVISIONS[0];

  return (
    <section id="categories" className="relative w-full bg-[#f2efe6] py-24 md:py-36 px-6 md:px-12 overflow-hidden">
      <div className="mx-auto max-w-[1312px]">
        {/* Editorial Section Header */}
        <div className="mb-14 space-y-3">
          <span className="doe-tag block">02 · Clinical Divisions</span>
          <h2 className="font-editorial text-[clamp(40px,4.8vw,74px)] font-normal tracking-[-0.035em] leading-[0.98] text-[#0b0f0d]">
            Seven specialized <em className="italic font-light text-[#163f35]">divisions.</em>
          </h2>
        </div>

        {/* DOE 12-Column Editorial Split (.duo__grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left 7 Columns: Paper-Cutout Image Showcase (zero text on image) */}
          <div className="lg:col-span-7 relative pt-3">
            {/* Mini glossy #163f35 pushpin */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 32 32"
                className="drop-shadow-[0_4px_5px_rgba(11,15,13,0.28)]"
              >
                <circle cx="16" cy="14" r="7.5" fill="#163f35" />
                <circle cx="16" cy="13" r="6" fill="#1e5447" />
                <ellipse cx="14" cy="11" rx="2.4" ry="1.3" fill="#ffffff" opacity="0.55" />
              </svg>
            </div>

            <div className="drop-shadow-[0_18px_36px_rgba(11,15,13,0.14)]">
              {/* White paper mat */}
              <div className="bg-white p-3 sm:p-4 pb-2 border border-b-0 border-[rgba(22,63,53,0.14)]">
                <motion.div
                  initial={{ clipPath: "inset(6% 4% 6% 4%)" }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#e2dfd5]"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={current.id}
                      src={current.image}
                      alt={current.name}
                      initial={{ opacity: 0.35, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.35 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Torn bottom paper edge */}
              <svg
                aria-hidden="true"
                viewBox="0 0 600 16"
                preserveAspectRatio="none"
                className="block h-[13px] w-full"
              >
                <path
                  d="M0,0 L600,0 L600,5 L574,11 L548,4 L522,12 L496,5 L470,10 L444,3 L418,12 L392,5 L366,11 L340,4 L314,13 L288,5 L262,11 L236,3 L210,12 L184,5 L158,10 L132,4 L106,12 L80,5 L54,11 L28,4 L0,9 Z"
                  fill="#dce2df"
                  transform="translate(0,1.5)"
                />
                <path
                  d="M0,0 L600,0 L600,5 L574,11 L548,4 L522,12 L496,5 L470,10 L444,3 L418,12 L392,5 L366,11 L340,4 L314,13 L288,5 L262,11 L236,3 L210,12 L184,5 L158,10 L132,4 L106,12 L80,5 L54,11 L28,4 L0,9 Z"
                  fill="#ffffff"
                />
              </svg>
            </div>

            {/* Clean caption & CTA below the paper cutout */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
              <p className="text-xs sm:text-sm text-[#454c48] max-w-md leading-relaxed">
                <strong className="text-[#0b0f0d] font-semibold">{current.name}:</strong>{" "}
                {current.description}
              </p>
              <Link
                href="#contact"
                className="shrink-0 inline-flex items-center gap-2.5 h-10 pl-4 pr-1.5 rounded-full bg-[#163f35] text-white text-xs font-semibold hover:bg-[#11332b] transition-colors"
              >
                <span>Request Division Catalogue</span>
                <span className="w-7 h-7 rounded-full bg-white text-[#163f35] flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right 5 Columns: Hairline Editorial Division List */}
          <div className="lg:col-span-5 divide-y divide-[rgba(11,15,13,0.13)] border-y border-[rgba(11,15,13,0.13)]">
            {DIVISIONS.map((div) => {
              const isActive = div.id === activeId;
              return (
                <button
                  key={div.id}
                  type="button"
                  onMouseEnter={() => setActiveId(div.id)}
                  onClick={() => setActiveId(div.id)}
                  className="w-full py-4 px-2 flex items-center justify-between gap-4 text-left group cursor-pointer transition-colors"
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span
                      className={`text-xs font-mono transition-colors ${
                        isActive ? "text-[#163f35] font-bold" : "text-[#454c48]/60"
                      }`}
                    >
                      {div.num}
                    </span>
                    <div className="min-w-0">
                      <span
                        className={`block text-lg sm:text-xl tracking-[-0.02em] transition-all ${
                          isActive
                            ? "font-editorial italic text-[#163f35] translate-x-1"
                            : "font-medium text-[#0b0f0d] group-hover:translate-x-1"
                        }`}
                      >
                        {div.name}
                      </span>
                      <span className="block text-xs text-[#454c48] truncate mt-0.5">
                        {div.subtitle}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={`w-4 h-4 shrink-0 transition-all ${
                      isActive
                        ? "text-[#163f35] translate-x-0.5 -translate-y-0.5"
                        : "text-[#454c48]/40 group-hover:text-[#0b0f0d]"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
