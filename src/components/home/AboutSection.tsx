"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
  Activity,
  Bed,
  Cross,
  Microscope,
  Pill,
  Stethoscope,
  Syringe,
} from "lucide-react";

const UnscrunchPaperAbout = dynamic(
  () => import("@/components/ui/unscrunch-paper-about"),
  { ssr: false }
);

const MARQUEE_ITEMS = [
  { label: "ICU PATIENT MONITORS", icon: Activity },
  { label: "PHARMA & STERILE INFUSIONS", icon: Pill },
  { label: "MOTORIZED HOSPITAL BEDS", icon: Bed },
  { label: "SURGICAL INSTRUMENTS & OT", icon: Stethoscope },
  { label: "DIAGNOSTICS & ANALYZERS", icon: Microscope },
  { label: "MEDICAL DISPOSABLES & PPE", icon: Syringe },
  { label: "HOSPITAL DRESSINGS & CSSD", icon: Cross },
];

const RIBBON_TEAR_TOP =
  "M0,12 L48,4 L96,11 L144,3 L192,10 L240,5 L288,12 L336,4 L384,9 L432,3 L480,11 L528,5 L576,12 L624,4 L672,10 L720,3 L768,11 L816,5 L864,12 L912,4 L960,10 L1008,3 L1056,11 L1104,5 L1152,12 L1200,4 L1248,10 L1296,3 L1344,11 L1392,5 L1440,10 L1440,16 L0,16 Z";

const RIBBON_TEAR_BOTTOM =
  "M0,0 L1440,0 L1440,6 L1392,12 L1344,5 L1296,13 L1248,6 L1200,11 L1152,4 L1104,12 L1056,6 L1008,13 L960,5 L912,11 L864,4 L816,12 L768,6 L720,13 L672,5 L624,11 L576,4 L528,12 L480,6 L432,13 L384,5 L336,11 L288,4 L240,12 L192,6 L144,13 L96,5 L48,11 L0,5 Z";

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full bg-white text-[#0b0f0d]">
      {/* Tilted Torn-Paper Strip Marquee Ribbon */}
      <div className="relative w-full overflow-x-clip py-8 sm:py-10">
        {/* Cream torn-paper back-ribbon for layered paper depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-4%] top-1/2 -translate-y-1/2 rotate-[1.2deg] drop-shadow-[0_8px_16px_rgba(11,15,13,0.06)]"
        >
          <svg
            viewBox="0 0 1440 16"
            preserveAspectRatio="none"
            className="block h-[11px] sm:h-[13px] w-full translate-y-[1px]"
          >
            <path d={RIBBON_TEAR_TOP} fill="#e2e5e3" transform="translate(0,-1.2)" />
            <path d={RIBBON_TEAR_TOP} fill="#f2efe6" />
          </svg>
          <div className="h-[54px] sm:h-[62px] w-full bg-[#f2efe6]" />
          <svg
            viewBox="0 0 1440 16"
            preserveAspectRatio="none"
            className="block h-[11px] sm:h-[13px] w-full -translate-y-[1px]"
          >
            <path d={RIBBON_TEAR_BOTTOM} fill="#e2e5e3" transform="translate(0,1.2)" />
            <path d={RIBBON_TEAR_BOTTOM} fill="#f2efe6" />
          </svg>
        </div>

        {/* Primary tilted torn-paper green strip */}
        <div className="relative w-[106%] -ml-[3%] -rotate-[1.4deg] drop-shadow-[0_14px_24px_rgba(14,42,35,0.22)]">
          {/* Top torn paper edge */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 16"
            preserveAspectRatio="none"
            className="block h-[12px] sm:h-[14px] w-full translate-y-[1px]"
          >
            <path d={RIBBON_TEAR_TOP} fill="#ffffff" transform="translate(0,-1.5)" />
            <path d={RIBBON_TEAR_TOP} fill="#163f35" />
          </svg>

          <div className="overflow-hidden bg-[#163f35] py-4 sm:py-5 text-[#f2efe6]">
            <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-10 text-sm sm:text-[15px] font-semibold tracking-[0.16em] uppercase"
                  >
                    <span className="inline-flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 border border-white/15 text-[#e5f075]">
                        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <span className="text-[#e5f075]/75 text-base font-light select-none" aria-hidden="true">
                      +
                    </span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Bottom torn paper edge */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 16"
            preserveAspectRatio="none"
            className="block h-[12px] sm:h-[14px] w-full -translate-y-[1px]"
          >
            <path d={RIBBON_TEAR_BOTTOM} fill="#ffffff" transform="translate(0,1.5)" />
            <path d={RIBBON_TEAR_BOTTOM} fill="#163f35" />
          </svg>
        </div>
      </div>

      {/* Scroll-Driven Unscrunching Paper About Section */}
      <UnscrunchPaperAbout />
    </section>
  );
}
