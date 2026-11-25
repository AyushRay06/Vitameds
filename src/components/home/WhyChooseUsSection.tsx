"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PILLARS = [
  {
    num: "01",
    title: "One-stop sourcing",
    detail:
      "Consolidate multiple categories into a single order — from disposables and dressings to ICU furniture and pharmaceuticals.",
  },
  {
    num: "02",
    title: "Export-ready documentation",
    detail:
      "Commercial invoice, packing list, certificate of origin, and product registration or regulatory documents on request.",
  },
  {
    num: "03",
    title: "Competitive pricing",
    detail:
      "Direct relationships with globally trusted manufacturers and volume purchasing help us offer sharp quotations.",
  },
  {
    num: "04",
    title: "Reliable logistics",
    detail:
      "Air, sea and courier shipments, with cold-chain handling for temperature-sensitive items.",
  },
  {
    num: "05",
    title: "Responsive support",
    detail:
      "Quotes within 24 hours. Real people who answer your calls and emails.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="relative w-full bg-[#163f35] text-white py-24 md:py-32 px-6 md:px-12"
    >
      <div className="mx-auto max-w-[1312px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Intro */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
            <span className="inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-[#f2efe6]/75">
              06 · Why Choose Us
            </span>
            <h2 className="font-editorial text-[clamp(40px,4.6vw,68px)] font-normal tracking-[-0.035em] leading-[0.98] text-white">
              Sourcing built for{" "}
              <em className="italic font-light text-[#f2efe6]/90">
                speed &amp; certainty.
              </em>
            </h2>
            <p className="text-sm sm:text-base text-[#f2efe6]/80 leading-relaxed max-w-md">
              Genuine products, export-ready paperwork, and direct factory pricing designed to take friction out of global medical procurement.
            </p>
            <div className="pt-2">
              <Link
                href="#contact"
                className="inline-flex items-center gap-3 rounded-full bg-[#f2efe6] pl-6 pr-2 py-2 text-sm font-semibold text-[#163f35] transition-transform hover:-translate-y-0.5"
              >
                <span>Request 24h Quote</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#163f35] text-white">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right 5 Architectural Rows */}
          <div className="lg:col-span-7 divide-y divide-white/18 border-y border-white/18">
            {PILLARS.map((item) => (
              <div
                key={item.num}
                className="group py-7 sm:py-9 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 transition-colors hover:bg-white/[0.04] px-2 sm:px-4"
              >
                <span className="font-mono text-xs tracking-[0.16em] text-[#a7f3d0] pt-1.5 shrink-0">
                  {item.num}
                </span>
                <div className="space-y-2">
                  <h3 className="font-editorial text-2xl sm:text-[28px] font-normal tracking-[-0.025em] text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#f2efe6]/80 leading-relaxed max-w-xl">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
