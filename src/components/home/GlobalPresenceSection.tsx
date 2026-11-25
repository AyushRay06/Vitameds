"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import type { GlobeMarker } from "@/components/ui/3d-globe";

const Globe3D = dynamic(() => import("@/components/ui/3d-globe"), {
  ssr: false,
  loading: () => (
    <div className="h-[460px] sm:h-[600px] w-full flex items-center justify-center">
      <div className="h-64 w-64 rounded-full border border-[#163f35]/15 bg-[#e8e5dc]/40 animate-pulse" />
    </div>
  ),
});

const SUPPLY_MARKERS: GlobeMarker[] = [
  {
    lat: 28.4089,
    lng: 77.3178,
    src: "https://cdn.21st.dev/assets/localized/a6b7394b90e0f93c7a07e26b63fc927bb6b4c361474f508b3902196d30ec29d9.webp",
    label: "Faridabad HQ (India)",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://cdn.21st.dev/assets/localized/8e5396313325182ff85d1229a80fdff6351d6e9d18a74ba7a202cefdba9eb840.webp",
    label: "Dubai",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://cdn.21st.dev/assets/localized/39f1e89e5596050671d2c5e43247556682b6501fdc26a72514c1b6b27aca1040.webp",
    label: "London",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://cdn.21st.dev/assets/localized/276d61dd498c0836991acd0d78c3e588dfe2396ac209eadd76f7e610588d473e.webp",
    label: "Singapore",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://cdn.21st.dev/assets/localized/d2f606dd20ae0f042b33801d94e64ebede24d0881c18518f027e75871c46db24.webp",
    label: "Tokyo",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: "https://cdn.21st.dev/assets/localized/517863093d43d51285cbb156a97a13dbb8a4da2178336e63fb84a2f9dff31721.webp",
    label: "Paris",
  },
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://cdn.21st.dev/assets/localized/9330b299938127244aa249ee03c095db066c29c3545aebcc61662ed5499003e9.webp",
    label: "New York",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://cdn.21st.dev/assets/localized/db3a4fbabb256c7ddb62896ba874be07f89dcce5ec82dbf31f0d29241a089c0d.webp",
    label: "Sydney",
  },
];

const STATS = [
  {
    stat: "4+",
    label: "Years in Business",
    detail: "Proven track record in precision medical manufacturing, clinical supply, and institutional healthcare trust.",
  },
  {
    stat: "20+",
    label: "Countries Served",
    detail: "UN, WHO, and Ministry of Health tender-compliant export lanes across four continents.",
  },
  {
    stat: "15+",
    label: "Global Brands",
    detail: "Authorized distribution and OEM partnerships with leading international medical technology brands.",
  },
  {
    stat: "1,500+",
    label: "Products in Catalogue",
    detail: "Comprehensive biomedical equipment, surgical instruments, ICU furniture, and clinical consumables.",
  },
  {
    stat: "1,200+",
    label: "Happy Clients",
    detail: "Hospitals, trauma centers, diagnostic labs, and institutional buyers served worldwide.",
  },
  {
    stat: "ISO 13485",
    label: "ISO, WHO-GMP & CE Certified",
    detail: "ISO-certified company operating a WHO-GMP certified manufacturing plant with European CE conformity.",
  },
];

export default function GlobalPresenceSection() {
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);

  return (
    <section id="global" className="relative w-full bg-[#f2efe6] py-24 md:py-32 px-6 md:px-12">
      <div className="mx-auto max-w-[1312px]">
        {/* Header */}
        <div className="mb-12 space-y-3 max-w-2xl">
          <span className="doe-tag block">04 · Global Supply Network</span>
          <h2 className="font-editorial text-[clamp(40px,4.8vw,74px)] font-normal tracking-[-0.035em] leading-[0.98] text-[#0b0f0d]">
            Certified delivery across{" "}
            <em className="italic font-light text-[#163f35]">20+ nations.</em>
          </h2>
        </div>

        {/* DOE .nums 12-Column Sticky Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 7 Columns: Sticky 3D Earth Globe */}
          <div className="lg:col-span-7 lg:sticky lg:top-0 lg:h-[90svh] flex flex-col items-center justify-center">
            <div className="w-full max-w-[680px]">
              <Globe3D
                className="h-[340px] sm:h-[600px] w-full"
                markers={SUPPLY_MARKERS}
                config={{
                  showAtmosphere: false,
                  ambientIntensity: 1.65,
                  pointLightIntensity: 2.6,
                  bumpScale: 4,
                  autoRotateSpeed: 1.8,
                }}
                onMarkerHover={(marker) => {
                  setHoveredHub(marker?.label ?? null);
                }}
              />
            </div>

            <div className="mt-2 flex items-center gap-2 text-[12px] font-mono text-[#454c48]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#163f35] animate-pulse" />
                <strong className="text-[#0b0f0d]">
                  {hoveredHub ?? "Faridabad Plant (HQ)"}
                </strong>
              </span>
            </div>
          </div>

          {/* Right 5 Columns: Scrolling Architectural Editorial Stat Blocks */}
          <div className="lg:col-span-5 divide-y divide-[rgba(11,15,13,0.13)] border-y border-[rgba(11,15,13,0.13)]">
            {STATS.map((item) => (
              <div key={item.label} className="py-10 sm:py-14 space-y-3">
                <span className="font-editorial text-[clamp(56px,6vw,96px)] font-normal tracking-[-0.04em] leading-[0.9] text-[#0b0f0d] block">
                  {item.stat}
                </span>
                <h3 className="text-base font-bold text-[#163f35] tracking-tight">
                  {item.label}
                </h3>
                <p className="text-sm text-[#454c48] leading-relaxed max-w-sm">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
