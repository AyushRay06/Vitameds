"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { rng } from "@/components/ui/pushpin-tear-footer";

const INITIAL_FORM = {
  name: "",
  designation: "",
  company: "",
  country: "",
  email: "",
  whatsapp: "",
  phone: "",
  message: "",
};

const inputCls =
  "w-full px-0 py-2.5 bg-transparent border-b border-[rgba(11,15,13,0.14)] text-[14px] text-[#0b0f0d] placeholder:text-[#454c48]/38 focus:outline-none focus:border-[#163f35] transition-colors";

const labelCls =
  "block font-mono text-[10px] uppercase tracking-[0.14em] text-[#454c48]/80";

function buildTornSheetPath(W: number, H: number, inset = 10, seed = 42): string {
  if (!W || !H) return "";
  const r = rng(seed);
  const hSteps = 56;
  const vSteps = 40;
  const amp = 6.5;

  const pts: [number, number][] = [];

  // Top edge (left -> right)
  for (let i = 0; i < hSteps; i++) {
    const u = i / (hSteps - 1);
    const taper = 0.45 + 0.55 * Math.sin(u * Math.PI);
    const wave =
      (Math.sin(u * 10 + 1.1) * 0.5 +
        Math.cos(u * 23 + 2.4) * 0.3 +
        (r() - 0.5) * 0.85) *
      amp *
      taper;
    pts.push([inset + u * (W - inset * 2), inset + wave]);
  }
  // Right edge (top -> bottom)
  for (let i = 1; i < vSteps; i++) {
    const v = i / (vSteps - 1);
    const taper = 0.45 + 0.55 * Math.sin(v * Math.PI);
    const wave =
      (Math.sin(v * 9 + 0.7) * 0.5 +
        Math.cos(v * 21 + 1.9) * 0.3 +
        (r() - 0.5) * 0.85) *
      amp *
      taper;
    pts.push([W - inset + wave, inset + v * (H - inset * 2)]);
  }
  // Bottom edge (right -> left)
  for (let i = 1; i < hSteps; i++) {
    const u = 1 - i / (hSteps - 1);
    const taper = 0.45 + 0.55 * Math.sin(u * Math.PI);
    const wave =
      (Math.sin(u * 11 + 3.2) * 0.5 +
        Math.cos(u * 25 + 0.8) * 0.3 +
        (r() - 0.5) * 0.85) *
      amp *
      taper;
    pts.push([inset + u * (W - inset * 2), H - inset + wave]);
  }
  // Left edge (bottom -> top)
  for (let i = 1; i < vSteps - 1; i++) {
    const v = 1 - i / (vSteps - 1);
    const taper = 0.45 + 0.55 * Math.sin(v * Math.PI);
    const wave =
      (Math.sin(v * 10 + 2.1) * 0.5 +
        Math.cos(v * 22 + 1.3) * 0.3 +
        (r() - 0.5) * 0.85) *
      amp *
      taper;
    pts.push([inset + wave, inset + v * (H - inset * 2)]);
  }

  return (
    "M" +
    pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join("L") +
    "Z"
  );
}

export default function ContactFormSection() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const cardRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rimPath = buildTornSheetPath(size.w, size.h, 8, 42);
  const sheetPath = buildTornSheetPath(size.w, size.h, 11, 42);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 650);
  };

  return (
    <section id="contact" className="relative w-full bg-white py-24 md:py-32 px-6 md:px-12">
      <div className="mx-auto max-w-[1220px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left 4 Columns: Minimal Editorial Anchor */}
          <div className="lg:col-span-4 space-y-6 lg:pt-4">
            <span className="doe-tag block">07 · Direct Factory RFQ</span>
            <h2 className="font-editorial text-[clamp(38px,4.2vw,58px)] font-normal tracking-[-0.035em] leading-[1.0] text-[#0b0f0d]">
              Request a{" "}
              <em className="italic font-light text-[#163f35]">quotation.</em>
            </h2>
            <p className="text-sm text-[#454c48] leading-relaxed max-w-xs">
              Share your requirements for direct factory pricing and export-ready documentation within 24 hours.
            </p>
            <div className="pt-2 space-y-1.5 font-mono text-xs text-[#454c48]">
              <a
                href="mailto:rfq@vitamedsurgicals.com"
                className="block text-[#163f35] font-medium hover:underline"
              >
                rfq@vitamedsurgicals.com
              </a>
              <a
                href="https://wa.me/919211069783"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#163f35] font-medium hover:underline"
              >
                WhatsApp: +91 92110 69783
              </a>
              <span className="block text-[11px] text-[#454c48]/70">
                Delhi NCR · Worldwide Dispatch
              </span>
            </div>
          </div>

          {/* Right 8 Columns: 4-Sided Torn Archival Paper Sheet */}
          <div className="lg:col-span-8">
            <div ref={cardRef} className="relative px-5 sm:px-12 py-9 sm:py-13">
              {/* 4-sided torn paper SVG background */}
              {size.w > 0 && size.h > 0 && (
                <svg
                  aria-hidden="true"
                  width={size.w}
                  height={size.h}
                  viewBox={`0 0 ${size.w} ${size.h}`}
                  className="pointer-events-none absolute inset-0 h-full w-full"
                >
                  <defs>
                    <filter id={uid + "sh"} x="-5%" y="-5%" width="110%" height="112%">
                      <feDropShadow
                        dx="0"
                        dy="6"
                        stdDeviation="8"
                        floodColor="#0b0f0d"
                        floodOpacity="0.09"
                      />
                    </filter>
                  </defs>
                  <g filter={`url(#${uid}sh)`}>
                    <path d={rimPath} fill="#e7eae8" />
                    <path d={sheetPath} fill="#faf9f5" />
                  </g>
                </svg>
              )}

              <div className="relative z-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="mx-auto w-11 h-11 rounded-full bg-[#163f35] text-white flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="font-editorial text-3xl text-[#0b0f0d]">
                      Message Received
                    </h3>
                    <p className="text-sm text-[#454c48] max-w-sm mx-auto">
                      Thank you, {formData.name || "partner"}. Our export desk will respond within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData(INITIAL_FORM);
                      }}
                      className="text-xs font-semibold text-[#163f35] underline underline-offset-4 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-7">
                    {/* Row 1: Name & Designation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="space-y-1">
                        <label className={labelCls}>Full Name *</label>
                        <input
                          required
                          type="text"
                          placeholder="Dr. Rajesh Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelCls}>Designation</label>
                        <input
                          type="text"
                          placeholder="Procurement Director"
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {/* Row 2: Company & Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="space-y-1">
                        <label className={labelCls}>Company / Hospital</label>
                        <input
                          type="text"
                          placeholder="Apollo Healthcare"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelCls}>Country *</label>
                        <input
                          required
                          type="text"
                          placeholder="India / UAE / Kenya"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {/* Row 3: Email, WhatsApp, Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6">
                      <div className="space-y-1">
                        <label className={labelCls}>Email *</label>
                        <input
                          required
                          type="email"
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelCls}>WhatsApp Number</label>
                        <input
                          type="tel"
                          placeholder="+91 98100 00000"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelCls}>Phone Number</label>
                        <input
                          type="tel"
                          placeholder="Office / Alt."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {/* Row 4: Message (optional) */}
                    <div className="space-y-1">
                      <label className={labelCls}>Message</label>
                      <textarea
                        rows={3}
                        placeholder="Write your message or inquiry here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    {/* Footer Row */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#454c48]/70">
                        24h Response Guarantee
                      </span>
                      <button
                        type="submit"
                        disabled={loading}
                        className="doe-btn cursor-pointer disabled:opacity-50 self-start sm:self-auto"
                      >
                        <span>{loading ? "Sending..." : "Submit RFQ"}</span>
                        <span className="doe-btn-circle">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
