"use client";

import * as React from "react";
import Link from "next/link";
import { FLAPS, rng, mixHex } from "./pushpin-tear-footer";

export type PaperFaqItem = {
  num: string;
  question: string;
  answer: string;
};

export const DEFAULT_PAPER_FAQ_ITEMS: PaperFaqItem[] = [
  {
    num: "01",
    question: "What regulatory certifications do VitaMed medical devices carry?",
    answer:
      "All apparatus manufactured and supplied by VitaMed adheres to ISO 13485:2016 medical device quality management benchmarks, WHO-GMP guidelines, and European CE conformity. Dispatched units include verified factory calibration reports and technical dossiers.",
  },
  {
    num: "02",
    question: "How do you support institutional tenders and GeM portal procurement?",
    answer:
      "VitaMed Surgicals is an authorized, registered vendor on the Government e-Marketplace (GeM) and frequently bids on public health and hospital turnkey tenders. We supply full technical dossiers, BOQ itemization, and OEM manufacturer authorization certificates.",
  },
  {
    num: "03",
    question: "What is the warranty coverage and spare parts turnaround time?",
    answer:
      "Every device includes a 12 to 24-month comprehensive OEM warranty. Operating our central manufacturing plant in Sector 24, Faridabad allows us to dispatch emergency circuit boards, sensors, and mechanical spares within 24 to 48 hours.",
  },
  {
    num: "04",
    question: "Can equipment voltages and plug types be customized for export?",
    answer:
      "Yes. International shipments across 25+ countries in the Middle East, Africa, Europe, and Asia can be configured for 110V/60Hz or 220V–240V/50Hz electrical standards with regional plug configurations and bilingual user manuals.",
  },
  {
    num: "05",
    question: "Do you offer on-site clinical installation and biomedical staff training?",
    answer:
      "Yes. For turnkey ward installations, motorized ICU beds, and CSSD central autoclave setups, our certified biomedical engineers provide full on-site unboxing, technical calibration, safety testing, and staff operational training.",
  },
];

export type PaperTearFaqProps = {
  eyebrow?: string;
  heading?: React.ReactNode;
  items?: PaperFaqItem[];
  defaultOpen?: number;
  sheet?: string;
  paper?: string;
  sheetInk?: string;
  paperInk?: string;
  seed?: number;
  ctaLabel?: string;
  ctaHref?: string;
  ctaNote?: string;
  className?: string;
};

type EdgeFlap = {
  edge: 0 | 1 | 2 | 3; // 0: top, 1: right, 2: bottom, 3: left
  at: number;
  span: number;
  len: number;
  skew: number;
  jag: number[];
};

type FourSideTear = {
  top: number[];
  right: number[];
  bottom: number[];
  left: number[];
  rimTop: number[];
  rimRight: number[];
  rimBottom: number[];
  rimLeft: number[];
  lag: number[];
  flaps: EdgeFlap[];
};

const H_N = 88;
const V_N = 60;

const clamp01 = (v: number) =>
  Number.isFinite(v) ? (v < 0 ? 0 : v > 1 ? 1 : v) : 0;

const easeInOut = (t: number) => {
  const x = clamp01(t);
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

const easeTear = (t: number) => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

function makeEdgeOffsets(n: number, r: () => number, amp: number): { vals: number[]; rim: number[] } {
  const p1 = r() * 6.28;
  const p2 = r() * 6.28;
  const p3 = r() * 6.28;
  const p4 = r() * 6.28;

  // 2 subtle irregular rip notches along the edge
  const notches = Array.from({ length: 2 }, () => ({
    at: 0.16 + r() * 0.68,
    w: 0.035 + r() * 0.045,
    depth: (r() < 0.55 ? 1 : -1) * (0.35 + r() * 0.35) * amp,
  }));

  const vals: number[] = [];
  const rim: number[] = [];
  for (let i = 0; i < n; i++) {
    const u = i / (n - 1);
    const cornerTaper = 0.5 + 0.5 * Math.sin(u * Math.PI);
    const macro =
      Math.sin(u * 8.0 + p1) * 0.45 +
      Math.sin(u * 17.5 + p2) * 0.32 +
      Math.cos(u * 31.0 + p3) * 0.2 +
      Math.sin(u * 48.0 + p4) * 0.12;
    const micro = (r() - 0.5) * 0.8;

    let notch = 0;
    for (const nt of notches) {
      const d = Math.abs(u - nt.at) / nt.w;
      if (d < 1) notch += nt.depth * (1 - d) * (0.75 + r() * 0.4);
    }

    const v = ((macro * 0.6 + micro * 0.65) * amp + notch) * cornerTaper;
    vals.push(v);
    rim.push(2.0 + r() * 3.8);
  }
  return { vals, rim };
}

function makeFourSideTear(seed: number): FourSideTear {
  const r = rng(seed);
  const t = makeEdgeOffsets(H_N, r, 15);
  const ri = makeEdgeOffsets(V_N, r, 14);
  const b = makeEdgeOffsets(H_N, r, 17);
  const l = makeEdgeOffsets(V_N, r, 14);

  const lag: number[] = [];
  for (let i = 0; i < H_N; i++) {
    const u = i / (H_N - 1);
    lag.push(Math.abs(u - 0.5) * 0.38 + r() * 0.08);
  }

  // Distribute 6 curled flaps across bottom (3), top (1), left (1), right (1)
  const flaps: EdgeFlap[] = [];
  const specs: Array<{ edge: 0 | 1 | 2 | 3; at: number; span: number; len: number }> = [
    { edge: 2, at: 12, span: 6, len: 22 },
    { edge: 2, at: 38, span: 7, len: 26 },
    { edge: 2, at: 64, span: 6, len: 21 },
    { edge: 0, at: 22, span: 6, len: 16 },
    { edge: 1, at: 18, span: 6, len: 15 },
    { edge: 3, at: 30, span: 6, len: 15 },
  ];

  for (const sp of specs) {
    const jag: number[] = [];
    for (let j = 0; j <= sp.span; j++) jag.push((r() - 0.5) * 5);
    flaps.push({
      edge: sp.edge,
      at: sp.at + Math.floor((r() - 0.5) * 3),
      span: sp.span,
      len: sp.len + r() * 8,
      skew: (r() - 0.5) * 14,
      jag,
    });
  }

  return {
    top: t.vals,
    right: ri.vals,
    bottom: b.vals,
    left: l.vals,
    rimTop: t.rim,
    rimRight: ri.rim,
    rimBottom: b.rim,
    rimLeft: l.rim,
    lag,
    flaps,
  };
}

function getPosterBounds(W: number, H: number) {
  const isMobile = W < 768;
  const padX = isMobile ? 6 : Math.max(24, Math.min(62, W * 0.048));
  const padTop = isMobile ? 20 : Math.max(44, Math.min(72, H * 0.068));
  const padBottom = isMobile ? 104 : Math.max(126, Math.min(156, H * 0.165));
  return {
    x0: padX,
    x1: Math.max(padX + 100, W - padX),
    y0: padTop,
    y1: Math.max(padTop + 120, H - padBottom),
  };
}

function buildFourSidePoints(
  W: number,
  H: number,
  t: FourSideTear,
  progress: number, // 0 = untorn (full rect), 1 = torn poster
  useRimInset: boolean
) {
  const { x0, x1, y0, y1 } = getPosterBounds(W, H);
  const p = easeTear(progress);
  const sideScale = W < 768 ? 0.32 : 1;

  const curX0 = x0 * p;
  const curX1 = W - (W - x1) * p;
  const curY0 = y0 * p;
  const curY1 = H - (H - y1) * p;

  const topPts: [number, number][] = [];
  const rightPts: [number, number][] = [];
  const bottomPts: [number, number][] = [];
  const leftPts: [number, number][] = [];

  for (let i = 0; i < H_N; i++) {
    const u = i / (H_N - 1);
    const x = curX0 + (curX1 - curX0) * u;
    const y = curY0 + t.top[i] * p * sideScale + (useRimInset ? t.rimTop[i] * p * sideScale : 0);
    topPts.push([x, y]);
  }
  for (let i = 0; i < V_N; i++) {
    const v = i / (V_N - 1);
    const y = curY0 + (curY1 - curY0) * v;
    const x = curX1 + t.right[i] * p * sideScale - (useRimInset ? t.rimRight[i] * p * sideScale : 0);
    rightPts.push([x, y]);
  }
  for (let i = H_N - 1; i >= 0; i--) {
    const u = i / (H_N - 1);
    const x = curX0 + (curX1 - curX0) * u;
    const y = curY1 + t.bottom[i] * p - (useRimInset ? t.rimBottom[i] * p : 0);
    bottomPts.push([x, y]);
  }
  for (let i = V_N - 1; i >= 0; i--) {
    const v = i / (V_N - 1);
    const y = curY0 + (curY1 - curY0) * v;
    const x = curX0 + t.left[i] * p * sideScale + (useRimInset ? t.rimLeft[i] * p * sideScale : 0);
    leftPts.push([x, y]);
  }

  return { topPts, rightPts, bottomPts, leftPts };
}

function fourSidePathD(pts: {
  topPts: [number, number][];
  rightPts: [number, number][];
  bottomPts: [number, number][];
  leftPts: [number, number][];
}) {
  const all = [...pts.topPts, ...pts.rightPts, ...pts.bottomPts, ...pts.leftPts];
  if (!all.length) return "";
  return (
    "M" +
    all.map((pt) => pt[0].toFixed(1) + "," + pt[1].toFixed(1)).join("L") +
    "Z"
  );
}

function lerpTear(a: FourSideTear, b: FourSideTear, t: number): FourSideTear {
  const k = easeInOut(t);
  const mixArr = (x: number[], y: number[]) => x.map((v, i) => v + (y[i] - v) * k);
  return {
    ...b,
    top: mixArr(a.top, b.top),
    right: mixArr(a.right, b.right),
    bottom: mixArr(a.bottom, b.bottom),
    left: mixArr(a.left, b.left),
    rimTop: mixArr(a.rimTop, b.rimTop),
    rimRight: mixArr(a.rimRight, b.rimRight),
    rimBottom: mixArr(a.rimBottom, b.rimBottom),
    rimLeft: mixArr(a.rimLeft, b.rimLeft),
  };
}

function edgeFlapPoly(
  ptsByEdge: {
    topPts: [number, number][];
    rightPts: [number, number][];
    bottomPts: [number, number][];
    leftPts: [number, number][];
  },
  f: EdgeFlap,
  open: number
): { poly: number[][]; mx: number; my: number; tip: number[] } | null {
  let edgePts: [number, number][];
  let nx = 0;
  let ny = 0;
  let tx = 0;
  let ty = 0;

  if (f.edge === 0) {
    edgePts = ptsByEdge.topPts;
    nx = 0;
    ny = -1;
    tx = 1;
    ty = 0;
  } else if (f.edge === 1) {
    edgePts = ptsByEdge.rightPts;
    nx = 1;
    ny = 0;
    tx = 0;
    ty = 1;
  } else if (f.edge === 2) {
    // bottomPts is reversed right->left, so reverse back for consistent indexing
    edgePts = [...ptsByEdge.bottomPts].reverse();
    nx = 0;
    ny = 1;
    tx = 1;
    ty = 0;
  } else {
    edgePts = [...ptsByEdge.leftPts].reverse();
    nx = -1;
    ny = 0;
    tx = 0;
    ty = 1;
  }

  const maxIdx = edgePts.length - 1;
  const a = Math.max(1, Math.min(maxIdx - f.span - 1, f.at));
  const b = Math.min(maxIdx - 1, a + f.span);
  if (b <= a) return null;

  const base: number[][] = [];
  for (let i = a; i <= b; i++) {
    base.push([edgePts[i][0], edgePts[i][1]]);
  }

  const pA = edgePts[a];
  const pB = edgePts[b];
  const mx = (pA[0] + pB[0]) / 2;
  const my = (pA[1] + pB[1]) / 2;
  const len = f.len * open;

  const curl: number[][] = [];
  const count = b - a;
  for (let idx = count; idx >= 0; idx--) {
    const u = idx / count;
    const arch = Math.sin(u * Math.PI);
    const j = f.jag[idx] ?? 0;
    const dist = len * (0.35 + 0.65 * arch) + j * open;
    const skew = f.skew * arch * open;
    const src = edgePts[a + idx];
    curl.push([src[0] + nx * dist + tx * skew, src[1] + ny * dist + ty * skew]);
  }

  const tip = curl[Math.floor(curl.length / 2)] ?? [mx + nx * len, my + ny * len];
  return { poly: [...base, ...curl], mx, my, tip };
}

function polyStr(pts: number[][]) {
  return (
    "M" +
    pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join("L") +
    "Z"
  );
}

function useReducedMotion() {
  const [r, set] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;
    set(m.matches);
    const on = () => set(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return r;
}

export default function PaperTearFaq({
  eyebrow = "06 · Procurement & Compliance",
  heading,
  items = DEFAULT_PAPER_FAQ_ITEMS,
  defaultOpen = 0,
  sheet = "#163f35",
  paper = "#ffffff",
  sheetInk = "#ffffff",
  paperInk = "#163f35",
  seed = 11,
  ctaLabel = "Request OEM Dossier & RFQ",
  ctaHref = "#contact",
  ctaNote = "Need tender BOQs, calibration certificates, or custom export specs?",
  className = "",
}: PaperTearFaqProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const rootRef = React.useRef<HTMLElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const sheetRef = React.useRef<SVGPathElement>(null);
  const rimRef = React.useRef<SVGPathElement>(null);
  const flapRefs = React.useRef<(SVGPathElement | null)[]>([]);
  const gradRefs = React.useRef<(SVGLinearGradientElement | null)[]>([]);
  const pinRef = React.useRef<HTMLButtonElement>(null);
  const timers = React.useRef<number[]>([]);

  const still = useReducedMotion();
  const [active, setActive] = React.useState<number | null>(defaultOpen);
  const [stage, setStage] = React.useState(0);
  const [hit, setHit] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [pin, setPin] = React.useState<"idle" | "lift" | "stab">("idle");
  const [grain, setGrain] = React.useState("");

  const s = React.useRef({
    W: 0,
    H: 0,
    tear: makeFourSideTear(seed),
    prev: null as FourSideTear | null,
    mode: "wait" as "wait" | "intro" | "morph" | "rest",
    t0: 0,
    dur: 1,
    raf: 0,
    px: -1e4,
    py: -1e4,
    lift: new Array(FLAPS).fill(0) as number[],
    still: false,
    busy: false,
    seed,
  }).current;
  s.still = still;

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const frame = React.useCallback(
    (now: number) => {
      s.raf = 0;
      const { W, H, tear } = s;
      if (!W || !H) return;
      let busy = false;
      let activeTear = tear;
      let progress = 1;
      const open = new Array(FLAPS).fill(1);

      if (s.mode === "wait") {
        progress = 0;
        open.fill(0);
      } else if (s.mode === "intro") {
        const p = Math.min(1, (now - s.t0) / s.dur);
        progress = p;
        open.fill(easeTear(Math.max(0, (p - 0.35) / 0.65)));
        if (p >= 1) s.mode = "rest";
        else busy = true;
      } else if (s.mode === "morph") {
        const p = Math.min(1, (now - s.t0) / s.dur);
        activeTear = s.prev ? lerpTear(s.prev, tear, p) : tear;
        open.fill(0.55 + 0.45 * easeTear(p));
        if (p >= 1) {
          s.prev = null;
          s.mode = "rest";
        } else {
          busy = true;
        }
      }

      const rimPts = buildFourSidePoints(W, H, activeTear, progress, false);
      const sheetPts = buildFourSidePoints(W, H, activeTear, progress, true);

      rimRef.current?.setAttribute("d", fourSidePathD(rimPts));
      sheetRef.current?.setAttribute("d", fourSidePathD(sheetPts));

      for (let k = 0; k < FLAPS; k++) {
        const el = flapRefs.current[k];
        const g = gradRefs.current[k];
        const f = activeTear.flaps[k];
        if (!el || !g) continue;
        if (!f || open[k] < 0.02 || progress < 0.2) {
          el.setAttribute("d", "");
          continue;
        }
        const geom = edgeFlapPoly(sheetPts, f, open[k]);
        if (!geom) {
          el.setAttribute("d", "");
          continue;
        }
        const target = s.still
          ? 0
          : clamp01(
              1 -
                Math.hypot(s.px - geom.mx, s.py - geom.my) /
                  (0.2 * Math.max(W, 520))
            );
        s.lift[k] += (target - s.lift[k]) * 0.14;
        if (Math.abs(target - s.lift[k]) > 0.003) busy = true;

        const liftedGeom =
          s.lift[k] > 0.01
            ? edgeFlapPoly(sheetPts, f, open[k] * (1 + 0.36 * s.lift[k])) ?? geom
            : geom;

        el.setAttribute("d", polyStr(liftedGeom.poly));
        g.setAttribute("x1", String(liftedGeom.mx));
        g.setAttribute("y1", String(liftedGeom.my));
        g.setAttribute("x2", String(liftedGeom.tip[0]));
        g.setAttribute("y2", String(liftedGeom.tip[1]));
      }

      if (busy) s.raf = requestAnimationFrame(frame);
    },
    [s]
  );

  const kick = React.useCallback(() => {
    if (!s.raf && typeof requestAnimationFrame !== "undefined") {
      s.raf = requestAnimationFrame(frame);
    }
  }, [s, frame]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      s.W = el.clientWidth;
      s.H = el.clientHeight;
      const svg = svgRef.current;
      if (svg) {
        svg.setAttribute("width", String(s.W));
        svg.setAttribute("height", String(s.H));
        svg.setAttribute("viewBox", "0 0 " + s.W + " " + s.H);
      }
      kick();
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, [s, kick]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.16 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (!visible || stage > 0) return;
    if (still) {
      setStage(3);
      s.mode = "rest";
      kick();
      return;
    }
    setStage(1);
    later(() => setStage(2), 380);
    later(() => {
      setHit(true);
      setStage(3);
      s.mode = "intro";
      s.t0 = performance.now();
      s.dur = 1350;
      kick();
    }, 800);
    later(() => setHit(false), 1140);
  }, [visible, stage, still, s, kick]);

  React.useEffect(() => {
    return () => {
      timers.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  const onPointerMove = (e: React.PointerEvent) => {
    const el = rootRef.current;
    if (!el || s.still) return;
    const r = el.getBoundingClientRect();
    s.px = e.clientX - r.left;
    s.py = e.clientY - r.top;
    const tilt = Math.max(-9, Math.min(9, (s.px / r.width - 0.5) * 18));
    pinRef.current?.style.setProperty("--tilt", tilt.toFixed(2) + "deg");
    kick();
  };

  const onPointerLeave = () => {
    s.px = s.py = -1e4;
    pinRef.current?.style.setProperty("--tilt", "0deg");
    kick();
  };

  const repin = () => {
    if (s.busy || stage < 3) return;
    const next = s.seed + 1;
    const swap = () => {
      s.seed = next;
      s.prev = s.tear;
      s.tear = makeFourSideTear(next);
    };
    if (still) {
      swap();
      s.prev = null;
      s.mode = "rest";
      kick();
      return;
    }
    s.busy = true;
    setPin("lift");
    later(() => {
      swap();
      s.mode = "morph";
      s.t0 = performance.now();
      s.dur = 950;
      kick();
    }, 260);
    later(() => setPin("stab"), 1080);
    later(() => {
      setPin("idle");
      s.busy = false;
    }, 1480);
  };

  const pinBase = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(sheet)
    ? sheet
    : "#163f35";
  const flapBase = mixHex(
    /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(paper) ? paper : "#f2efe6",
    "#ffffff",
    0.35
  );

  const vars = {
    "--ptf-sheet": sheet,
    "--ptf-paper": paper,
    "--ptf-on-sheet": sheetInk,
    "--ptf-on-paper": paperInk,
    "--ptf-rim": mixHex(flapBase, "#ffffff", 0.6),
  } as React.CSSProperties;

  const cls = [
    "ptf-faq",
    stage >= 1 && "s1",
    stage >= 2 && "s2",
    stage >= 3 && "s3",
    hit && "is-hit",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id="faq"
      ref={rootRef}
      className={cls}
      style={vars}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <style>{CSS}</style>

      {/* Four-Sided Torn Paper SVG Stage */}
      <svg ref={svgRef} className="ptf-stage" aria-hidden="true">
        <defs>
          <radialGradient id={uid + "v"} cx=".5" cy=".5" r=".75">
            <stop offset=".45" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#0b1f1a" stopOpacity=".07" />
          </radialGradient>
          <linearGradient id={uid + "l"} x1="0" y1="0" x2=".35" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".11" />
            <stop offset=".55" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#061410" stopOpacity=".14" />
          </linearGradient>
          {grain && (
            <pattern
              id={uid + "g"}
              width="160"
              height="160"
              patternUnits="userSpaceOnUse"
            >
              <image href={grain} width="160" height="160" />
            </pattern>
          )}
          <filter id={uid + "d"} x="-6%" y="-6%" width="112%" height="114%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="4.5"
              floodColor="#061410"
              floodOpacity=".28"
            />
          </filter>
          <filter id={uid + "f"} x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow
              dx="-2"
              dy="4"
              stdDeviation="4"
              floodColor="#061410"
              floodOpacity=".26"
            />
          </filter>
          {Array.from({ length: FLAPS }, (_, k) => (
            <linearGradient
              key={k}
              id={uid + "fg" + k}
              ref={(el) => {
                gradRefs.current[k] = el;
              }}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor={mixHex(flapBase, "#132922", 0.34)} />
              <stop offset=".5" stopColor={mixHex(flapBase, "#132922", 0.08)} />
              <stop offset="1" stopColor="#ffffff" />
            </linearGradient>
          ))}
          <path id={uid + "s"} ref={sheetRef} />
        </defs>

        {/* Paper underneath (exact #ffffff + 0.34 grain, no edge vignette seam) */}
        <rect className="ptf-paper" width="100%" height="100%" />
        {grain && (
          <rect
            width="100%"
            height="100%"
            fill={"url(#" + uid + "g)"}
            opacity=".34"
          />
        )}

        {/* Green poster sheet + white fibre tear rim on all 4 sides */}
        <g className="ptf-sheet-g" filter={"url(#" + uid + "d)"}>
          <path ref={rimRef} className="ptf-rim" />
          <use href={"#" + uid + "s"} className="ptf-sheet" />
        </g>
        <use href={"#" + uid + "s"} fill={"url(#" + uid + "l)"} />
        {grain && (
          <use
            href={"#" + uid + "s"}
            fill={"url(#" + uid + "g)"}
            opacity=".48"
          />
        )}

        {/* Curled paper flaps around the torn edges */}
        <g filter={"url(#" + uid + "f)"}>
          {Array.from({ length: FLAPS }, (_, k) => (
            <path
              key={k}
              ref={(el) => {
                flapRefs.current[k] = el;
              }}
              fill={"url(#" + uid + "fg" + k + ")"}
            />
          ))}
        </g>
      </svg>

      {/* Glossy Pushpin */}
      <button
        ref={pinRef}
        type="button"
        className={"ptf-pin" + (pin !== "idle" ? " is-" + pin : "")}
        onClick={repin}
        aria-label="Re-tear FAQ paper edges"
        title="Click to re-tear paper edges"
      >
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <defs>
            <radialGradient id={uid + "pc"} cx=".38" cy=".34" r=".62">
              <stop offset="0" stopColor={mixHex(pinBase, "#ffffff", 0.56)} />
              <stop offset=".45" stopColor={pinBase} />
              <stop offset="1" stopColor={mixHex(pinBase, "#061410", 0.56)} />
            </radialGradient>
            <radialGradient id={uid + "pt"} cx=".38" cy=".32" r=".62">
              <stop offset="0" stopColor={mixHex(pinBase, "#ffffff", 0.7)} />
              <stop offset=".4" stopColor={mixHex(pinBase, "#ffffff", 0.14)} />
              <stop offset=".85" stopColor={mixHex(pinBase, "#061410", 0.34)} />
              <stop offset="1" stopColor={mixHex(pinBase, "#061410", 0.54)} />
            </radialGradient>
            <radialGradient id={uid + "ps"} cx=".5" cy=".5" r=".5">
              <stop offset="0" stopColor="#05130f" stopOpacity=".46" />
              <stop offset=".6" stopColor="#05130f" stopOpacity=".18" />
              <stop offset="1" stopColor="#05130f" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={uid + "pm"} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f3f5f8" />
              <stop offset=".5" stopColor="#9aa3b2" />
              <stop offset="1" stopColor="#3c4352" />
            </linearGradient>
          </defs>
          <ellipse
            className="ptf-pshad"
            cx="41"
            cy="55"
            rx="16"
            ry="6.5"
            fill={"url(#" + uid + "ps)"}
          />
          <polygon
            points="38.5,39 41.5,39 40.3,54 39.7,54"
            fill={"url(#" + uid + "pm)"}
          />
          <ellipse
            cx="40"
            cy="54"
            rx="1.6"
            ry=".9"
            fill="#061410"
            opacity=".45"
          />
          <circle cx="40" cy="34" r="14" fill={"url(#" + uid + "pc)"} />
          <path
            d="M27.5 34 L31 20 L49 20 L52.5 34 Z"
            fill={"url(#" + uid + "pc)"}
          />
          <ellipse
            cx="40"
            cy="20"
            rx="11.5"
            ry="6.5"
            fill={"url(#" + uid + "pt)"}
          />
          <ellipse cx="36" cy="18" rx="4.5" ry="2.2" fill="#fff" opacity=".52" />
        </svg>
      </button>

      {/* Main FAQ Content safely inside the 4-sided torn sheet */}
      <div className="ptf-content">
        <div className="ptf-header">
          <div className="ptf-header-left">
            <span className="ptf-eyebrow">{eyebrow}</span>
            {heading ?? (
              <h2 className="ptf-title font-editorial">
                Institutional{" "}
                <em className="italic font-light text-[#f2efe6]/90">
                  standards.
                </em>
              </h2>
            )}
          </div>
        </div>

        <div className="ptf-list">
          {items.map((item, i) => {
            const isOpen = active === i;
            return (
              <div
                key={item.num}
                className={`ptf-item${isOpen ? " is-open" : ""}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="ptf-row"
                  onClick={() => setActive(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="ptf-num">{item.num}</span>
                  <span className="ptf-q">{item.question}</span>
                  <span className="ptf-plus" aria-hidden="true">
                    <span className="ptf-plus-v" />
                    <span className="ptf-plus-h" />
                  </span>
                </button>
                <div className="ptf-ans-wrap">
                  <div className="ptf-ans-inner">
                    <p className="ptf-ans">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cream Paper Reveal Underneath the Bottom Tear */}
      <div className="ptf-under">
        <div className="ptf-under-inner">
          <p className="ptf-under-note">{ctaNote}</p>
          <Link href={ctaHref} className="ptf-under-cta">
            <span>{ctaLabel}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.ptf-faq {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: var(--ptf-paper);
  color: var(--ptf-on-sheet);
}

.ptf-stage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.ptf-paper { fill: var(--ptf-paper); }
.ptf-sheet { fill: var(--ptf-sheet); }
.ptf-rim { fill: var(--ptf-rim); }

.ptf-faq.is-hit .ptf-sheet-g {
  animation: ptfShake 0.48s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes ptfShake {
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(0, 2.5px); }
  45% { transform: translate(0, -1.5px); }
  70% { transform: translate(0, 0.8px); }
}

/* Pushpin */
.ptf-pin {
  position: absolute;
  left: 50%;
  bottom: 120px;
  width: 66px;
  height: 66px;
  transform: translate(-50%, 50%) scale(0.92);
  opacity: 0;
  z-index: 6;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  pointer-events: auto;
  transition: opacity 0.32s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  --tilt: 0deg;
}

.ptf-pin svg {
  width: 100%;
  height: 100%;
  display: block;
  transform: rotate(var(--tilt));
  transition: transform 0.25s ease;
}

.ptf-faq.s2 .ptf-pin {
  opacity: 1;
  transform: translate(-50%, 42%) scale(1.06);
}

.ptf-faq.s3 .ptf-pin {
  opacity: 1;
  transform: translate(-50%, 50%) scale(1);
}

.ptf-pin.is-lift {
  transform: translate(-50%, 34%) scale(1.1) !important;
}

.ptf-pin.is-stab {
  transform: translate(-50%, 52%) scale(0.97) !important;
}

/* Content inside 4-sided torn sheet */
.ptf-content {
  position: relative;
  z-index: 3;
  max-width: 1220px;
  margin: 0 auto;
  padding: clamp(96px, 9.5vw, 134px) clamp(36px, 6.8vw, 96px) clamp(175px, 16vw, 215px);
}

.ptf-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: clamp(32px, 4.5vw, 52px);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.65s ease, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.ptf-faq.s1 .ptf-header {
  opacity: 1;
  transform: translateY(0);
}

.ptf-eyebrow {
  display: inline-block;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(242, 239, 230, 0.72);
  margin-bottom: 12px;
}

.ptf-title {
  font-size: clamp(36px, 4.5vw, 64px);
  font-weight: 400;
  letter-spacing: -0.035em;
  line-height: 0.98;
  color: #ffffff;
  margin: 0;
}

.ptf-header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.ptf-count-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.08);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 10.5px;
  letter-spacing: 0.14em;
  color: #f2efe6;
}

.ptf-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #a7f3d0;
}

.ptf-pin-hint {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(242, 239, 230, 0.56);
}

/* Accordion rows */
.ptf-list {
  border-top: 1px solid rgba(255, 255, 255, 0.18);
}

.ptf-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.55s ease calc(var(--i, 0) * 65ms + 80ms),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i, 0) * 65ms + 80ms),
    background-color 0.25s ease;
}

.ptf-faq.s1 .ptf-item {
  opacity: 1;
  transform: translateY(0);
}

.ptf-item:hover {
  background: rgba(255, 255, 255, 0.035);
}

.ptf-row {
  width: 100%;
  display: grid;
  grid-template-columns: 44px 1fr 24px;
  align-items: center;
  gap: 18px;
  padding: clamp(18px, 2.4vw, 26px) 8px;
  background: transparent;
  border: 0;
  text-align: left;
  cursor: pointer;
  color: #ffffff;
}

.ptf-num {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  letter-spacing: 0.12em;
  color: rgba(242, 239, 230, 0.58);
  transition: color 0.25s ease;
}

.ptf-item.is-open .ptf-num {
  color: #a7f3d0;
}

.ptf-q {
  font-size: clamp(16.5px, 1.75vw, 21px);
  font-weight: 500;
  letter-spacing: -0.018em;
  line-height: 1.32;
  color: #ffffff;
}

.ptf-plus {
  position: relative;
  width: 18px;
  height: 18px;
  justify-self: end;
}

.ptf-plus-v,
.ptf-plus-h {
  position: absolute;
  top: 50%;
  left: 50%;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 2px;
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease;
}

.ptf-plus-h {
  width: 16px;
  height: 1.5px;
  transform: translate(-50%, -50%);
}

.ptf-plus-v {
  width: 1.5px;
  height: 16px;
  transform: translate(-50%, -50%);
}

.ptf-item.is-open .ptf-plus-v {
  transform: translate(-50%, -50%) rotate(90deg);
  opacity: 0;
}

.ptf-ans-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.36s cubic-bezier(0.22, 1, 0.36, 1);
}

.ptf-item.is-open .ptf-ans-wrap {
  grid-template-rows: 1fr;
}

.ptf-ans-inner {
  overflow: hidden;
}

.ptf-ans {
  margin: 0;
  padding: 0 36px 24px 70px;
  max-width: 78ch;
  font-size: clamp(14.5px, 1.15vw, 15.5px);
  line-height: 1.68;
  color: rgba(242, 239, 230, 0.84);
}

/* Revealed cream paper bottom strip */
.ptf-under {
  position: relative;
  z-index: 4;
  max-width: 1220px;
  margin: -94px auto 0;
  padding: 18px clamp(36px, 6.8vw, 96px) 36px;
}

.ptf-under-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.ptf-under-note {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--ptf-on-paper);
  opacity: 0.85;
}

.ptf-under-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 9999px;
  background: var(--ptf-on-paper);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-decoration: none;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.ptf-under-cta:hover {
  transform: translateY(-1px);
  opacity: 0.92;
}

@media (max-width: 768px) {
  .ptf-content {
    padding: 58px 20px 142px;
  }
  .ptf-under {
    margin-top: -74px;
    padding: 14px 20px 28px;
  }
  .ptf-header-right {
    align-items: flex-start;
  }
  .ptf-row {
    grid-template-columns: 28px 1fr 18px;
    gap: 10px;
  }
  .ptf-q {
    font-size: 15.5px;
  }
  .ptf-ans {
    padding: 0 6px 16px 34px;
    font-size: 14px;
  }
  .ptf-pin {
    width: 46px;
    height: 46px;
    bottom: 94px;
  }
}
`;
