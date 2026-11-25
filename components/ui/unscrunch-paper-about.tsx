"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { rng } from "@/components/ui/pushpin-tear-footer";

// ============================================================================
// 0. Shared Deterministic 4-Sided Torn Edge Geometry (identical in 3D & 2D)
// ============================================================================

const H_STEPS = 68;
const V_STEPS = 46;
const TEAR_AMP_PX = 7.5;
const INSET_PX = 12;

function createEdgeTables(seed = 77) {
  const r = rng(seed);
  const sample = (steps: number, f1: number, p1: number, f2: number, p2: number) => {
    const out: number[] = [];
    for (let i = 0; i < steps; i++) {
      const u = i / (steps - 1);
      const taper = 0.5 + 0.5 * Math.sin(u * Math.PI);
      const wave =
        (Math.sin(u * f1 + p1) * 0.5 +
          Math.cos(u * f2 + p2) * 0.3 +
          (r() - 0.5) * 0.85) *
        TEAR_AMP_PX *
        taper;
      out.push(wave);
    }
    return out;
  };
  return {
    top: sample(H_STEPS, 9, 1.2, 23, 2.1),
    right: sample(V_STEPS, 8, 0.8, 19, 1.7),
    bottom: sample(H_STEPS, 11, 2.9, 25, 0.9),
    left: sample(V_STEPS, 10, 1.9, 21, 1.1),
  };
}

const TORN_EDGES = createEdgeTables(77);

function sampleTable(arr: number[], t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  const f = clamped * (arr.length - 1);
  const i0 = Math.floor(f);
  const i1 = Math.min(arr.length - 1, i0 + 1);
  const frac = f - i0;
  return arr[i0] + (arr[i1] - arr[i0]) * frac;
}

function buildTornSheetPath(W: number, H: number, inset = INSET_PX): string {
  if (!W || !H) return "";
  const pts: [number, number][] = [];

  for (let i = 0; i < H_STEPS; i++) {
    const u = i / (H_STEPS - 1);
    pts.push([inset + u * (W - inset * 2), inset + TORN_EDGES.top[i]]);
  }
  for (let i = 1; i < V_STEPS; i++) {
    const v = i / (V_STEPS - 1);
    pts.push([W - inset + TORN_EDGES.right[i], inset + v * (H - inset * 2)]);
  }
  for (let i = 1; i < H_STEPS; i++) {
    const u = 1 - i / (H_STEPS - 1);
    const idx = H_STEPS - 1 - i;
    pts.push([inset + u * (W - inset * 2), H - inset + TORN_EDGES.bottom[idx]]);
  }
  for (let i = 1; i < V_STEPS - 1; i++) {
    const v = 1 - i / (V_STEPS - 1);
    const idx = V_STEPS - 1 - i;
    pts.push([inset + TORN_EDGES.left[idx], inset + v * (H - inset * 2)]);
  }

  return (
    "M" +
    pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join("L") +
    "Z"
  );
}

// ============================================================================
// 1. 3D Crumpled Paper Ball -> Pixel-Identical Torn Paper Sheet
// ============================================================================

function hash2(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function ridgeNoise(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  const n = a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
  return 1 - Math.abs(n * 2 - 1);
}

function createSharpPaperTextures() {
  const size = 512;
  const colorCanvas = document.createElement("canvas");
  const bumpCanvas = document.createElement("canvas");
  colorCanvas.width = colorCanvas.height = size;
  bumpCanvas.width = bumpCanvas.height = size;

  const cCtx = colorCanvas.getContext("2d");
  const bCtx = bumpCanvas.getContext("2d");
  if (cCtx && bCtx) {
    const cImg = cCtx.createImageData(size, size);
    const bImg = bCtx.createImageData(size, size);
    const r = rng(108);

    // Exact #f2efe6 = (242, 239, 230)
    for (let i = 0; i < cImg.data.length; i += 4) {
      const fibre = (r() - 0.5) * 12;
      const speck = r() < 0.025 ? -10 : 0;
      cImg.data[i] = Math.min(255, Math.max(0, 242 + fibre + speck));
      cImg.data[i + 1] = Math.min(255, Math.max(0, 239 + fibre + speck));
      cImg.data[i + 2] = Math.min(255, Math.max(0, 230 + fibre + speck));
      cImg.data[i + 3] = 255;

      const bv = Math.min(255, Math.max(0, 128 + fibre * 4));
      bImg.data[i] = bImg.data[i + 1] = bImg.data[i + 2] = bv;
      bImg.data[i + 3] = 255;
    }
    cCtx.putImageData(cImg, 0, 0);
    bCtx.putImageData(bImg, 0, 0);

    cCtx.strokeStyle = "rgba(22, 63, 53, 0.03)";
    cCtx.lineWidth = 0.8;
    for (let k = 0; k < 140; k++) {
      const x = r() * size;
      const y = r() * size;
      const len = 6 + r() * 18;
      const ang = r() * Math.PI * 2;
      cCtx.beginPath();
      cCtx.moveTo(x, y);
      cCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
      cCtx.stroke();
    }
  }

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(2, 2);
  colorMap.anisotropy = 16;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(2, 2);
  bumpMap.anisotropy = 16;

  return { colorMap, bumpMap };
}

function CrumpledPaperMesh({
  progressRef,
  targetPixelSize,
}: {
  progressRef: React.MutableRefObject<number>;
  targetPixelSize: { w: number; h: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lastU = useRef(-1);
  const { camera, size: canvasSize } = useThree();

  const { colorMap, bumpMap } = useMemo(() => createSharpPaperTextures(), []);

  useEffect(() => {
    return () => {
      colorMap.dispose();
      bumpMap.dispose();
    };
  }, [colorMap, bumpMap]);

  // Exact pixel-to-world conversion so 3D flat sheet == 2D SVG sheet
  const { worldW, worldH, pxToWorld } = useMemo(() => {
    const persp = camera as THREE.PerspectiveCamera;
    const camZ = persp.position.z || 6.2;
    const fovRad = ((persp.fov || 42) * Math.PI) / 180;
    const visH = 2 * camZ * Math.tan(fovRad / 2);
    const scale = canvasSize.height > 0 ? visH / canvasSize.height : 0.01;
    const w = Math.max(2, targetPixelSize.w * scale);
    const h = Math.max(1.5, targetPixelSize.h * scale);
    return { worldW: w, worldH: h, pxToWorld: scale };
  }, [camera, canvasSize.height, targetPixelSize.w, targetPixelSize.h]);

  const { geometry, flatPos, scrunchedPos, delays } = useMemo(() => {
    const segX = 104;
    const segY = 68;
    const geo = new THREE.PlaneGeometry(1, 1, segX, segY);
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const count = posAttr.count;

    const flat = new Float32Array(count * 3);
    const scrunched = new Float32Array(count * 3);
    const del = new Float32Array(count);

    const insetW = INSET_PX * pxToWorld;

    for (let i = 0; i < count; i++) {
      const px = posAttr.getX(i); // -0.5 .. 0.5
      const py = posAttr.getY(i); // +0.5 .. -0.5
      const u = px + 0.5; // 0 .. 1 (left -> right)
      const v = 0.5 - py; // 0 .. 1 (top -> bottom)
      const nx = px * 2;
      const ny = py * 2;
      const dist = Math.min(1, Math.hypot(nx, ny) / 1.414);

      const r1 = ridgeNoise(nx * 2.2 + 3.1, ny * 2.2 + 1.7);
      const r2 = ridgeNoise(nx * 4.5 + 8.3, ny * 4.5 + 5.2);
      const r3 = ridgeNoise(nx * 8.5 + 1.4, ny * 8.5 + 6.9);
      const crease = r1 * 0.55 + r2 * 0.3 + r3 * 0.15;

      // Bilinear interpolation of the EXACT 2D SVG torn perimeter
      const leftX = -worldW * 0.5 + insetW + sampleTable(TORN_EDGES.left, v) * pxToWorld;
      const rightX = worldW * 0.5 - insetW + sampleTable(TORN_EDGES.right, v) * pxToWorld;
      const topY = worldH * 0.5 - insetW - sampleTable(TORN_EDGES.top, u) * pxToWorld;
      const bottomY = -worldH * 0.5 + insetW - sampleTable(TORN_EDGES.bottom, u) * pxToWorld;

      flat[i * 3] = leftX + u * (rightX - leftX);
      flat[i * 3 + 1] = topY + v * (bottomY - topY);
      flat[i * 3 + 2] = (crease - 0.5) * 0.032;

      // Scrunched 3D paper ball
      const phi = nx * Math.PI * 0.86;
      const theta = ny * Math.PI * 0.48;
      const ballR = Math.min(worldW, worldH) * 0.36;
      const rVar = ballR * (1 + (crease - 0.45) * 0.52 + (r2 - 0.5) * 0.24);

      const sx = rVar * Math.cos(theta) * Math.sin(phi) * 0.94;
      const sy = rVar * Math.sin(theta) * 0.96 + (r1 - 0.5) * 0.18;
      const sz = rVar * Math.cos(theta) * Math.cos(phi) * 0.9 - 0.1;

      scrunched[i * 3] = sx;
      scrunched[i * 3 + 1] = sy;
      scrunched[i * 3 + 2] = sz;

      del[i] = dist * 0.18 + (1 - r1) * 0.06;
    }

    posAttr.array.set(scrunched);
    posAttr.needsUpdate = true;
    geo.computeVertexNormals();

    return {
      geometry: geo,
      flatPos: flat,
      scrunchedPos: scrunched,
      delays: del,
    };
  }, [worldW, worldH, pxToWorld]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rawU = progressRef.current;

    const t = clock.getElapsedTime();
    const idleAmt = Math.max(0, 1 - rawU * 1.8);
    mesh.rotation.y = Math.sin(t * 0.5) * 0.12 * idleAmt;
    mesh.rotation.x = Math.cos(t * 0.4) * 0.07 * idleAmt;
    mesh.rotation.z = -0.14 * idleAmt;

    if (Math.abs(rawU - lastU.current) < 0.0004) return;
    lastU.current = rawU;

    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const count = posAttr.count;

    for (let i = 0; i < count; i++) {
      const d = delays[i];
      const local = Math.max(0, Math.min(1, (rawU - d) / (1 - 0.24)));
      const e = local * local * local * (local * (local * 6 - 15) + 10);
      const idx = i * 3;
      arr[idx] = scrunchedPos[idx] + (flatPos[idx] - scrunchedPos[idx]) * e;
      arr[idx + 1] =
        scrunchedPos[idx + 1] + (flatPos[idx + 1] - scrunchedPos[idx + 1]) * e;
      arr[idx + 2] =
        scrunchedPos[idx + 2] + (flatPos[idx + 2] - scrunchedPos[idx + 2]) * e;
    }

    posAttr.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={0.025}
        color="#ffffff"
        roughness={0.82}
        metalness={0.0}
        flatShading={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

const SHORT_CREASES = (() => {
  const r = rng(313);
  return Array.from({ length: 20 }, (_, i) => {
    const cx = 70 + r() * 860;
    const cy = 50 + r() * 500;
    const len = 48 + r() * 78;
    const wid = 14 + r() * 20;
    const ang = r() * 180;
    const op = 0.22 + r() * 0.28;
    return { id: i, cx, cy, len, wid, ang, op };
  });
})();

const HIGHLIGHTS = [
  { label: "Certifications", value: "ISO 13485 · WHO-GMP · CE" },
  { label: "Catalogue", value: "1,500+ Medical Products" },
  { label: "Global Reach", value: "20+ Countries Served" },
  { label: "Client Base", value: "1,200+ Happy Clients" },
];

export default function UnscrunchPaperAbout() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const trackRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const unscrunchRef = useRef(0);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [grain, setGrain] = useState("");

  useEffect(() => {
    const el = sheetRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 20,
    mass: 0.8,
  });

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      const u = Math.max(0, Math.min(1, (v - 0.06) / 0.62));
      unscrunchRef.current = u;
    });
  }, [smoothProgress]);

  const sheetOpacity = useTransform(smoothProgress, [0.64, 0.74], [0, 1]);
  const webglOpacity = useTransform(smoothProgress, [0.7, 0.84], [1, 0]);
  const contentOpacity = useTransform(smoothProgress, [0.66, 0.84], [0, 1]);
  const pinOpacity = useTransform(smoothProgress, [0.72, 0.86], [0, 1]);
  const pinY = useTransform(smoothProgress, [0.72, 0.86], [-14, 0]);

  const rimPath = buildTornSheetPath(size.w, size.h, INSET_PX - 3);
  const sheetPath = buildTornSheetPath(size.w, size.h, INSET_PX);

  return (
    <div
      ref={trackRef}
      className="relative w-full min-h-[165svh] sm:min-h-[210svh] px-3 sm:px-8 md:px-12 py-6 sm:py-8 overflow-x-clip"
    >
      <div className="sticky top-16 sm:top-20 mx-auto max-w-[1120px] flex items-center justify-center min-h-[68svh] sm:min-h-[76svh] overflow-visible">
        {/* Stage 1: Oversized Canvas (centered identically on sheetRef) */}
        <motion.div
          style={{ opacity: webglOpacity }}
          className="pointer-events-none absolute -inset-x-4 sm:-inset-x-16 -inset-y-8 sm:-inset-y-14 z-20 flex items-center justify-center"
        >
          <Canvas
            gl={{
              alpha: true,
              antialias: true,
              toneMapping: THREE.NoToneMapping,
            }}
            dpr={[1, 2]}
            camera={{ position: [0, 0, 6.2], fov: 42 }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={1.35} color="#fffdf8" />
            <directionalLight position={[4, 6, 6]} intensity={0.85} color="#ffffff" />
            <directionalLight position={[-5, -3, 4]} intensity={0.45} color="#f5f1e6" />
            <CrumpledPaperMesh
              progressRef={unscrunchRef}
              targetPixelSize={size}
            />
          </Canvas>
        </motion.div>

        {/* Stage 2: Exact-Size Open Creased Paper Sheet with About Content */}
        <motion.div
          ref={sheetRef}
          style={{ opacity: sheetOpacity }}
          className="relative z-10 w-full px-7 sm:px-14 md:px-16 py-12 sm:py-16"
        >
          {/* Glossy #163f35 pushpin */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: pinOpacity, y: pinY }}
            className="pointer-events-none absolute left-1/2 -top-1 z-30 -translate-x-1/2"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              className="drop-shadow-[0_5px_6px_rgba(11,15,13,0.3)]"
            >
              <circle cx="16" cy="14" r="7.5" fill="#163f35" />
              <circle cx="16" cy="13" r="6" fill="#1e5447" />
              <ellipse cx="14" cy="11" rx="2.4" ry="1.3" fill="#ffffff" opacity="0.55" />
            </svg>
          </motion.div>

          {/* 4-sided torn cream paper sheet */}
          {size.w > 0 && size.h > 0 && (
            <svg
              aria-hidden="true"
              width={size.w}
              height={size.h}
              viewBox={`0 0 ${size.w} ${size.h}`}
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <defs>
                <filter id={uid + "sh"} x="-6%" y="-6%" width="112%" height="114%">
                  <feDropShadow
                    dx="0"
                    dy="10"
                    stdDeviation="12"
                    floodColor="#0b0f0d"
                    floodOpacity="0.14"
                  />
                </filter>
                {grain && (
                  <pattern
                    id={uid + "gr"}
                    width="160"
                    height="160"
                    patternUnits="userSpaceOnUse"
                  >
                    <image href={grain} width="160" height="160" />
                  </pattern>
                )}
              </defs>

              <g filter={`url(#${uid}sh)`}>
                <path d={rimPath} fill="#ffffff" />
                <path d={sheetPath} fill="#f2efe6" />
              </g>

              {grain && (
                <path
                  d={sheetPath}
                  fill={`url(#${uid}gr)`}
                  opacity="0.38"
                />
              )}
            </svg>
          )}

          {/* Multiple Short, Subtle Paper Crinkle Creases */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] z-10 opacity-45 mix-blend-multiply"
          >
            <defs>
              <linearGradient id={uid + "cr"} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0b0f0d" stopOpacity="0" />
                <stop offset="45%" stopColor="#0b0f0d" stopOpacity="0.16" />
                <stop offset="52%" stopColor="#ffffff" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#0b0f0d" stopOpacity="0" />
              </linearGradient>
              <filter id={uid + "soft"}>
                <feGaussianBlur stdDeviation="2.4" />
              </filter>
            </defs>

            <g filter={`url(#${uid}soft)`}>
              {SHORT_CREASES.map((c) => (
                <ellipse
                  key={c.id}
                  cx={c.cx}
                  cy={c.cy}
                  rx={c.len}
                  ry={c.wid}
                  fill={`url(#${uid}cr)`}
                  opacity={c.op}
                  transform={`rotate(${c.ang.toFixed(1)} ${c.cx.toFixed(1)} ${c.cy.toFixed(1)})`}
                />
              ))}
            </g>
          </svg>

          {/* About Content inside the unscrunched paper */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className="relative z-20 space-y-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-[rgba(22,63,53,0.2)] pb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#163f35]">
                01 · About VitaMed Surgicals
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#454c48]">
                Delhi NCR · India
              </span>
            </div>

            <div className="space-y-5">
              <h2 className="font-editorial text-[clamp(30px,3.8vw,52px)] font-normal tracking-[-0.03em] leading-[1.06] text-[#0b0f0d] max-w-4xl">
                A Delhi-based{" "}
                <em className="italic font-light text-[#163f35]">
                  medical manufacturer &amp; export company
                </em>{" "}
                built for global healthcare.
              </h2>

              <p className="text-sm sm:text-base text-[#454c48] leading-[1.75] max-w-3xl">
                Serving hospitals, clinics, NGOs, government tenders, and distributors worldwide, VitaMed Surgicals supplies a complete range of medical disposables, clinical devices, hospital equipment and furniture, rapid test kits, surgical dressings, and pharmaceuticals sourced from globally trusted manufacturers. Our strength is simple: genuine products, competitive pricing, export-ready documentation, and a team that responds fast.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-dashed border-[rgba(22,63,53,0.2)]">
              {HIGHLIGHTS.map((item) => (
                <div key={item.label} className="space-y-1">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#454c48]">
                    {item.label}
                  </span>
                  <span className="block text-sm font-semibold text-[#0b0f0d]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
