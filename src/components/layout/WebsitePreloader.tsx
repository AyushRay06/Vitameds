"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rng } from "@/components/ui/pushpin-tear-footer";

const CARD_TEAR_TOP =
  "M0,8 L24,3 L48,9 L72,2 L96,8 L120,4 L144,9 L168,3 L192,8 L216,2 L240,9 L264,4 L288,8 L312,3 L336,9 L360,4 L360,12 L0,12 Z";
const CARD_TEAR_BOTTOM =
  "M0,0 L360,0 L360,4 L336,9 L312,3 L288,10 L264,4 L240,9 L216,2 L192,10 L168,4 L144,9 L120,3 L96,10 L72,4 L48,9 L24,3 L0,8 Z";

declare global {
  interface Window {
    __vitamedHeroReady?: boolean;
  }
}

export default function WebsitePreloader() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [animDone, setAnimDone] = useState(false);
  const [heroDone, setHeroDone] = useState(false);
  const [grain, setGrain] = useState("");

  useEffect(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 160;
    const g = c.getContext("2d");
    if (!g) return;
    const img = g.createImageData(160, 160);
    const r = rng(84);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = r() < 0.5 ? 0 : 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = Math.floor(r() * 44);
    }
    g.putImageData(img, 0, 0);
    setGrain(c.toDataURL());
  }, []);

  useEffect(() => {
    // Minimum logo reveal duration (1s)
    const animTimer = window.setTimeout(() => setAnimDone(true), 1050);

    // Wait for Hero 3D globe ready signal
    if (window.__vitamedHeroReady) {
      setHeroDone(true);
    }
    const onHeroReady = () => setHeroDone(true);
    window.addEventListener("vitamed:hero-ready", onHeroReady);

    // Safety fallback in case WebGL is blocked/unsupported
    const fallbackTimer = window.setTimeout(() => setHeroDone(true), 8000);

    return () => {
      window.clearTimeout(animTimer);
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("vitamed:hero-ready", onHeroReady);
    };
  }, []);

  useEffect(() => {
    if (animDone && heroDone) {
      setShowPreloader(false);
    }
  }, [animDone, heroDone]);

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          key="website-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -14, scale: 1.015 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-white flex items-center justify-center px-6 overflow-hidden"
        >
          {/* Subtle matching paper grain */}
          {grain && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `url(${grain})`,
                backgroundRepeat: "repeat",
                opacity: 0.34,
              }}
            />
          )}

          {/* Paper-cutout logo card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2.5, y: 12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[340px] pt-3 drop-shadow-[0_22px_44px_rgba(11,15,13,0.14)]"
          >
            {/* Glossy #163f35 pushpin */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 1.15 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                className="drop-shadow-[0_4px_5px_rgba(11,15,13,0.28)]"
              >
                <circle cx="16" cy="14" r="7.5" fill="#163f35" />
                <circle cx="16" cy="13" r="6" fill="#1e5447" />
                <ellipse cx="14" cy="11" rx="2.4" ry="1.3" fill="#ffffff" opacity="0.55" />
              </svg>
            </motion.div>

            {/* Torn top edge */}
            <svg
              aria-hidden="true"
              viewBox="0 0 360 12"
              preserveAspectRatio="none"
              className="block h-[10px] w-full translate-y-[1px]"
            >
              <path d={CARD_TEAR_TOP} fill="#e6e9e7" transform="translate(0,-1)" />
              <path d={CARD_TEAR_TOP} fill="#f2efe6" />
            </svg>

            {/* Cream paper body with logo */}
            <div
              className="border-x border-[rgba(22,63,53,0.14)] bg-[#f2efe6] px-10 py-11 flex items-center justify-center"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(22,63,53,0.035) 1px, transparent 0)",
                backgroundSize: "14px 14px",
              }}
            >
              <motion.img
                src="/images/vitamed-logo-transparent.png?v=2"
                alt="VitaMed Surgicals"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>

            {/* Torn bottom edge */}
            <svg
              aria-hidden="true"
              viewBox="0 0 360 12"
              preserveAspectRatio="none"
              className="block h-[10px] w-full -translate-y-[1px]"
            >
              <path d={CARD_TEAR_BOTTOM} fill="#e6e9e7" transform="translate(0,1)" />
              <path d={CARD_TEAR_BOTTOM} fill="#f2efe6" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
