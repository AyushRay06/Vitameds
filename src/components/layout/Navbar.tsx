"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import QuoteModal from "@/components/ui/QuoteModal";

const NAV_CATEGORIES = [
  { id: "medical-equipment", num: "01", name: "Medical Equipment", sub: "ICU Monitors · Infusion" },
  { id: "hospital-furniture", num: "02", name: "Hospital Furniture", sub: "5-Function ICU Beds · OT" },
  { id: "pharma", num: "03", name: "Pharma", sub: "IV Fluids · Formulations" },
  { id: "medical-disposable", num: "04", name: "Medical Disposable", sub: "Syringes · Cannulas · PPE" },
  { id: "hospital-dressing", num: "05", name: "Hospital Dressing", sub: "Sterile Gauze · Swabs" },
  { id: "diagnostics", num: "06", name: "Diagnostics", sub: "Ultrasound · ECG · Labs" },
  { id: "surgical-equipment", num: "07", name: "Surgical Equipment", sub: "OT Lights · Autoclaves" },
];

const NAV_TEAR_BOTTOM =
  "M0,0 L1200,0 L1200,2.5 L1164,5.5 L1128,2 L1092,6 L1056,2.5 L1020,5.5 L984,2 L948,6 L912,2.5 L876,5.5 L840,2 L804,6 L768,2.5 L732,5.5 L696,2 L660,6 L624,2.5 L588,5.5 L552,2 L516,6 L480,2.5 L444,5.5 L408,2 L372,6 L336,2.5 L300,5.5 L264,2 L228,6 L192,2.5 L156,5.5 L120,2 L84,6 L48,2.5 L18,5.5 L0,2.5 Z";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const selectDivision = (id: string) => {
    setCatOpen(false);
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("vitamed:select-division", { detail: id }));
  };

  const links = [
    { href: "#categories", label: "Categories" },
    { href: "#brands", label: "Brands" },
    { href: "#global", label: "Global Network" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <header className="fixed top-2.5 md:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
        <div className="relative max-w-6xl mx-auto w-full pointer-events-auto drop-shadow-[0_14px_30px_rgba(11,15,13,0.10)]">
          {/* Refined glossy #163f35 pushpin */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -top-2.5 z-20 -translate-x-1/2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              className="drop-shadow-[0_3px_4px_rgba(11,15,13,0.24)]"
            >
              <circle cx="16" cy="14" r="7.5" fill="#163f35" />
              <circle cx="16" cy="13" r="6" fill="#1e5447" />
              <ellipse cx="14" cy="11" rx="2.4" ry="1.3" fill="#ffffff" opacity="0.55" />
            </svg>
          </div>

          {/* Crisp Pure White Paper Bar */}
          <div className="border border-b-0 border-[#163f35]/12 bg-white px-4 sm:px-7 h-14 md:h-[60px] flex items-center justify-between gap-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <img
                src="/images/vitamed-logo-transparent.png?v=2"
                alt="VitaMed Surgicals"
                className="h-8 md:h-9 w-auto max-w-[145px] md:max-w-[165px] object-contain group-hover:opacity-85 transition-opacity"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {links.map((l) =>
                l.href === "#categories" ? (
                  <div
                    key={l.href}
                    className="relative"
                    onMouseEnter={() => setCatOpen(true)}
                    onMouseLeave={() => setCatOpen(false)}
                  >
                    <a
                      href={l.href}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[13px] font-medium tracking-[-0.01em] text-[#0b0f0d]/75 hover:text-[#163f35] hover:bg-[#163f35]/[0.06] transition-all duration-200"
                    >
                      <span>{l.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          catOpen ? "rotate-180 text-[#163f35]" : ""
                        }`}
                      />
                    </a>

                    <AnimatePresence>
                      {catOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.98 }}
                          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-0 top-full pt-3 z-50"
                        >
                          <div className="w-[460px] border border-[#163f35]/15 bg-white p-3 shadow-[0_20px_44px_-12px_rgba(11,15,13,0.18)]">
                            <div className="px-2.5 pb-2 mb-2 border-b border-dashed border-[#163f35]/15 flex items-center justify-between">
                              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#163f35]">
                                7 Clinical Divisions
                              </span>
                              <span className="font-mono text-[10px] text-[#454c48]">
                                VitaMed Catalogue
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              {NAV_CATEGORIES.map((cat) => (
                                <a
                                  key={cat.id}
                                  href="#categories"
                                  onClick={() => selectDivision(cat.id)}
                                  className="group/item flex items-start gap-2.5 rounded-md px-2.5 py-2 hover:bg-[#f2efe6] transition-colors"
                                >
                                  <span className="font-mono text-[10px] text-[#163f35]/70 pt-0.5">
                                    {cat.num}
                                  </span>
                                  <div className="min-w-0">
                                    <span className="block text-[13px] font-semibold text-[#0b0f0d] group-hover/item:text-[#163f35] leading-tight">
                                      {cat.name}
                                    </span>
                                    <span className="block text-[10.5px] text-[#454c48] truncate mt-0.5">
                                      {cat.sub}
                                    </span>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    className="px-3.5 py-1.5 rounded-full text-[13px] font-medium tracking-[-0.01em] text-[#0b0f0d]/75 hover:text-[#163f35] hover:bg-[#163f35]/[0.06] transition-all duration-200"
                  >
                    {l.label}
                  </a>
                )
              )}
            </nav>

            {/* Action Button */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <button
                onClick={() => setQuoteOpen(true)}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#163f35] pl-5 pr-1.5 py-1.5 text-xs font-semibold tracking-[0.01em] text-white cursor-pointer shadow-sm transition-all duration-200 hover:bg-[#11332b] hover:-translate-y-0.5"
              >
                <span>Request RFQ</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#163f35] transition-transform duration-200 group-hover:rotate-12">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>

            {/* Mobile hamburger */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-[#163f35] hover:bg-[#163f35]/8 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Delicate Torn Bottom Paper Edge */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 8"
            preserveAspectRatio="none"
            className="block h-[6px] w-full"
          >
            <path d={NAV_TEAR_BOTTOM} fill="#dce2df" transform="translate(0,1)" />
            <path d={NAV_TEAR_BOTTOM} fill="#ffffff" />
          </svg>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden mt-2 max-w-6xl mx-auto pointer-events-auto border border-[#163f35]/14 bg-white p-5 shadow-xl space-y-2 max-h-[80svh] overflow-y-auto"
            >
              {links.map((l) =>
                l.href === "#categories" ? (
                  <div key={l.href} className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => setMobileCatOpen((prev) => !prev)}
                      aria-expanded={mobileCatOpen}
                      className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-[#0b0f0d] hover:bg-[#163f35]/[0.06] hover:text-[#163f35] transition-colors cursor-pointer"
                    >
                      <span>{l.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileCatOpen ? "rotate-180 text-[#163f35]" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileCatOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mx-1 p-2.5 border border-[#163f35]/14 bg-[#faf9f5] grid grid-cols-1 gap-1">
                            {NAV_CATEGORIES.map((cat) => (
                              <a
                                key={cat.id}
                                href="#categories"
                                onClick={() => selectDivision(cat.id)}
                                className="flex items-center justify-between gap-2 rounded px-2.5 py-2 hover:bg-[#f2efe6] transition-colors"
                              >
                                <div className="flex items-baseline gap-2.5 min-w-0">
                                  <span className="font-mono text-[10px] text-[#163f35]/70">
                                    {cat.num}
                                  </span>
                                  <span className="text-xs font-semibold text-[#0b0f0d] truncate">
                                    {cat.name}
                                  </span>
                                </div>
                                <span className="text-[10px] text-[#454c48] shrink-0">
                                  {cat.sub}
                                </span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-[#0b0f0d] hover:bg-[#163f35]/[0.06] hover:text-[#163f35] transition-colors"
                  >
                    {l.label}
                  </a>
                )
              )}
              <div className="pt-3 border-t border-dashed border-[#163f35]/20">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setQuoteOpen(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#163f35] text-white text-xs font-semibold py-2.5 hover:bg-[#11332b] transition-colors"
                >
                  <span>Request Institutional RFQ</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
