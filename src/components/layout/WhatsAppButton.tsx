"use client";

import React from "react";

const WHATSAPP_URL =
  "https://wa.me/919211069783?text=Hello%20VitaMed%20Surgicals%2C%20I%20would%20like%20to%20request%20a%20quotation.";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message VitaMed Surgicals on WhatsApp (+91 92110 69783)"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-[#163f35] p-3.5 text-white shadow-[0_12px_28px_-6px_rgba(11,15,13,0.35)] ring-2 ring-[#f2efe6] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#11332b]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6 shrink-0"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.79 14.08c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.18-4.94-4.37-.14-.19-1.18-1.57-1.18-2.99 0-1.43.75-2.13 1.01-2.42.26-.29.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2.02.9 2.17.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.14.14-.3.3-.13.59.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.26.1 1.68.79 1.97.94.29.14.48.22.55.34.07.12.07.7-.17 1.38z" />
      </svg>
      <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold tracking-wide transition-all duration-300 group-hover:max-w-[160px] group-hover:pr-1">
        WhatsApp Us
      </span>
    </a>
  );
}
