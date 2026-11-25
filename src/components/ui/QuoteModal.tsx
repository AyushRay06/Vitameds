"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ArrowUpRight, Building, Mail, Phone, User, FileText } from "lucide-react";
import { productCategories } from "@/data/products";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
  preselectedCategory?: string;
}

export default function QuoteModal({
  isOpen,
  onClose,
  preselectedProduct,
  preselectedCategory,
}: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
    category: preselectedCategory || "medical-equipment",
    productName: preselectedProduct || "",
    quantity: "1-5 units",
    urgency: "Standard (1-2 weeks)",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="loopsii-box relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-black overflow-hidden text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner Registration Markers */}
        <div className="loopsii-marker-tl"></div>
        <div className="loopsii-marker-tr"></div>
        <div className="loopsii-marker-bl"></div>
        <div className="loopsii-marker-br"></div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-black/15 bg-[#f0f0f0]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#c4f041] border border-black inline-block"></span>
            <div>
              <h3 className="font-black text-lg text-black">
                Request Official Institutional RFQ
              </h3>
              <p className="text-[11px] font-mono text-black/60">
                Direct factory quotation from Cure Express Faridabad Facility
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-black/20 hover:border-black flex items-center justify-center text-black/70 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#c4f041] border-2 border-black flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8 text-black" />
            </div>
            <div className="space-y-2">
              <span className="font-hand text-3xl text-black block font-bold">
                ~ Inquiry Successfully Dispatched ~
              </span>
              <h4 className="text-2xl font-black text-black">
                RFQ Acknowledged & Logged
              </h4>
              <p className="text-sm font-mono text-black/70 max-w-md mx-auto">
                Thank you, <strong>{formData.name}</strong>. Our biomedical supply desk in Faridabad has received your specification request for <strong>{formData.institution || "your institution"}</strong>.
              </p>
              <div className="p-4 bg-[#f0f0f0] rounded-xl border border-black/10 text-xs font-mono text-black/80 max-w-sm mx-auto mt-4 text-left space-y-1">
                <div>■ Formal Proforma Invoice SLA: Under 24-48 Hours</div>
                <div>■ Includes ISO 13485:2016 Calibration Dossier</div>
                <div>■ Confirmation sent to: {formData.email}</div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="btn-loopsii-pill bg-black text-white px-6 py-3 rounded-full font-bold text-sm"
            >
              Close Window ↗
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto font-mono text-xs">
            {preselectedProduct && (
              <div className="p-3 bg-[#c4f041]/30 border border-black/15 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-black/60 uppercase block">SELECTED PRODUCT</span>
                  <span className="font-bold text-sm text-black">{preselectedProduct}</span>
                </div>
                <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded font-bold">
                  DIRECT OEM
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-black font-bold uppercase mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-black/40" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Rajesh Kumar"
                    className="w-full pl-9 pr-3 py-2 bg-[#f0f0f0] border border-black/15 rounded-xl text-black focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-black font-bold uppercase mb-1">
                  Work Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-black/40" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="procurement@hospital.org"
                    className="w-full pl-9 pr-3 py-2 bg-[#f0f0f0] border border-black/15 rounded-xl text-black focus:border-black focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-black font-bold uppercase mb-1">
                  Phone / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-black/40" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 bg-[#f0f0f0] border border-black/15 rounded-xl text-black focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-black font-bold uppercase mb-1">
                  Hospital / Institution *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-2.5 w-4 h-4 text-black/40" />
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="Apollo / Fortis / State Health"
                    className="w-full pl-9 pr-3 py-2 bg-[#f0f0f0] border border-black/15 rounded-xl text-black focus:border-black focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-black font-bold uppercase mb-1">
                  Healthcare Division
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f0f0f0] border border-black/15 rounded-xl text-black focus:border-black focus:outline-none"
                >
                  {productCategories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.shortTitle}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-black font-bold uppercase mb-1">
                  Estimated Quantity
                </label>
                <select
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f0f0f0] border border-black/15 rounded-xl text-black focus:border-black focus:outline-none"
                >
                  <option value="1-5 units">1 - 5 units (Single Ward Setup)</option>
                  <option value="6-20 units">6 - 20 units (Multi-Ward Expansion)</option>
                  <option value="21-50 units">21 - 50 units (New Hospital Block)</option>
                  <option value="50+ units">50+ units (Network / Bulk Tender)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-black font-bold uppercase mb-1">
                Technical Specifications & Delivery Requirements
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention specific parameters (e.g. Linak actuator preference, 12-lead ECG, CE compliance dossier requirement, delivery timeline)..."
                className="w-full px-3 py-2 bg-[#f0f0f0] border border-black/15 rounded-xl text-black focus:border-black focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-4 border-t border-black/15">
              <span className="text-[10px] text-black/60">
                ■ Strict B2B Privacy: Data not shared with third-party brokers.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-loopsii-pill bg-black text-white hover:bg-[#222] px-6 py-3 rounded-full font-bold text-xs"
              >
                <span>{isSubmitting ? "Generating..." : "Submit RFQ"}</span>
                <span className="arrow-circle w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
