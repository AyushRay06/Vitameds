"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const BRAND_NAMES = [
  { name: "Siemens Healthineers", category: "Diagnostics & Imaging" },
  { name: "GE HealthCare", category: "Monitoring & USG" },
  { name: "Philips Healthcare", category: "Clinical Telemetry" },
  { name: "Mindray", category: "Vital Signs & Anesthesia" },
  { name: "Dräger", category: "Ventilation & CSSD" },
  { name: "Stryker", category: "OT Systems & Endoscopy" },
  { name: "B. Braun", category: "Infusion & Holloware" },
  { name: "Olympus", category: "Surgical Optics" },
  { name: "Baxter", category: "Renal Care & Dialysis" },
  { name: "Karl Storz", category: "Surgical Suites" },
  { name: "VitaMed OEM", category: "Delhi NCR · Faridabad" },
];

export default function BrandMarqueeSection() {
  return (
    <section id="brands" className="relative w-full bg-white py-20 md:py-28 px-6 md:px-12">
      <div className="mx-auto max-w-[1312px]">
        <div className="mb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8 border-b border-[rgba(11,15,13,0.13)]">
          <div className="lg:col-span-7 space-y-3">
            <span className="doe-tag block">03 · OEM &amp; Clinical Compatibility</span>
            <h2 className="font-editorial text-[clamp(36px,4.2vw,60px)] font-normal tracking-[-0.035em] leading-[1.0] text-[#0b0f0d]">
              Integrated <em className="italic font-light text-[#163f35]">global brands.</em>
            </h2>
          </div>
          <p className="lg:col-span-5 text-sm text-[#454c48] leading-relaxed lg:justify-self-end max-w-md">
            Authorized supply and OEM compatibility across 15+ trusted international clinical manufacturers.
          </p>
        </div>

        {/* Pure Typographic Brand Name Marquee (no brand logos) */}
        <div
          className="relative overflow-hidden py-4"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
            {[...BRAND_NAMES, ...BRAND_NAMES].map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="inline-flex items-center gap-12"
              >
                <div className="inline-flex flex-col">
                  <span className="font-editorial text-2xl sm:text-3xl font-normal tracking-[-0.025em] text-[#0b0f0d]">
                    {brand.name}
                  </span>
                  <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#163f35]">
                    {brand.category}
                  </span>
                </div>
                <span className="text-[#163f35]/30 text-xl font-light select-none" aria-hidden="true">
                  /
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Preferred brand sourcing note */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-[rgba(11,15,13,0.1)]">
          <p className="text-sm font-medium text-[#454c48]">
            Can&apos;t see your preferred brand?{" "}
            <span className="text-[#163f35] font-semibold">
              Ask us, we can source it.
            </span>
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#163f35] hover:underline shrink-0"
          >
            <span>Request Brand Sourcing</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
