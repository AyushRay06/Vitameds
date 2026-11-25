"use client";

import React, { useMemo } from "react";
import { rng } from "./pushpin-tear-footer";

export type PaperTearDividerProps = {
  /** Background color of the section ABOVE the tear */
  topColor: string;
  /** Background color of the section BELOW the tear */
  bottomColor: string;
  /** Highlight fibre rim color along the torn edge */
  rimColor?: string;
  /** Seed for deterministic jagged paper edge */
  seed?: number;
  /** Height of the divider in pixels */
  height?: number;
  className?: string;
};

export default function PaperTearDivider({
  topColor,
  bottomColor,
  rimColor = "rgba(255, 255, 255, 0.85)",
  seed = 19,
  height = 54,
  className = "",
}: PaperTearDividerProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");

  const { topPath, rimPath } = useMemo(() => {
    const W = 1440;
    const H = height;
    const mid = H * 0.48;
    const amp = H * 0.28;
    const N = 96;
    const r = rng(seed);
    const p1 = r() * 6.28;
    const p2 = r() * 6.28;
    const p3 = r() * 6.28;

    const pts: [number, number][] = [];
    const rimPts: [number, number][] = [];

    for (let i = 0; i < N; i++) {
      const u = i / (N - 1);
      const x = u * W;
      const wave =
        Math.sin(u * 9 + p1) * 0.45 +
        Math.sin(u * 21 + p2) * 0.3 +
        Math.cos(u * 43 + p3) * 0.16;
      const micro = (r() - 0.5) * 0.7;
      const y = mid + (wave * 0.65 + micro * 0.55) * amp;
      const rimOffset = 2.2 + r() * 3.4;
      pts.push([x, y]);
      rimPts.push([x, y + rimOffset]);
    }

    const topD =
      `M0,0 L${W},0 L${W},${pts[N - 1][1].toFixed(1)} ` +
      pts
        .slice()
        .reverse()
        .map((p) => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`)
        .join(" ") +
      " Z";

    const rimD =
      `M0,0 L${W},0 L${W},${rimPts[N - 1][1].toFixed(1)} ` +
      rimPts
        .slice()
        .reverse()
        .map((p) => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`)
        .join(" ") +
      " Z";

    return { topPath: topD, rimPath: rimD };
  }, [seed, height]);

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden leading-none select-none ${className}`}
      style={{ backgroundColor: bottomColor, height }}
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        className="block h-full w-full"
      >
        <defs>
          <filter id={uid + "sh"} x="-2%" y="-10%" width="104%" height="140%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="3"
              floodColor="#0b0f0d"
              floodOpacity="0.1"
            />
          </filter>
        </defs>
        <g filter={`url(#${uid}sh)`}>
          <path d={rimPath} fill={rimColor} />
          <path d={topPath} fill={topColor} />
        </g>
      </svg>
    </div>
  );
}
