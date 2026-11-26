"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { rng } from "@/components/ui/pushpin-tear-footer";

export type Testimonial = {
  quote: string;
  image: string;
  name: string;
  role: string;
  company?: string;
};

const DEFAULT_MEDICAL_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "VitaMed Surgicals delivered 40 motorized 5-function ICU beds and multipara monitors with full factory calibration dossiers in under three weeks.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=256&q=80",
    name: "Dr. Arvind Swaminathan",
    role: "Chief of Biomedical Engineering",
    company: "Apollo Healthcare",
  },
  {
    quote:
      "Their autoclaves and high-vacuum suction units perform flawlessly in demanding hospital settings. Direct Faridabad supply protected our clinical budget.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80",
    name: "Dr. Priya Nambiar",
    role: "Lead Equipment Engineer",
    company: "Max Healthcare",
  },
  {
    quote:
      "Electro-hydraulic OT tables arrived with complete CE documentation and shock-proof export crating. Reliability matches European tier-one apparatus.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80",
    name: "Dr. Tariq Al-Mansoor",
    role: "Director of Surgical Logistics",
    company: "Al-Noor Surgical",
  },
  {
    quote:
      "Horizontal CSSD sterilizers passed ministry inspection on day one. Every unit shipped with serialized QA logs and calibration certificates.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=256&q=80",
    name: "Dr. Marcus Vance",
    role: "Medical Procurement Director",
    company: "Global Relief Mission",
  },
  {
    quote:
      "Stainless 304 ward holloware and surgical instruments consistently meet our sterile theatre protocols with zero corrosion across 24 months.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=256&q=80",
    name: "Dr. Elena Kovacs",
    role: "Head of CSSD",
    company: "MedCare Europe",
  },
  {
    quote:
      "Multipara ICU telemetry stations integrated cleanly into our 60-bed critical care wing with responsive engineering support.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=256&q=80",
    name: "Dr. Meera Raghavan",
    role: "ICU Operations Lead",
    company: "Fortis Critical Care",
  },
  {
    quote:
      "48-hour dispatch and GeM portal readiness streamlined our entire 200-bed state hospital equipment procurement cycle.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=256&q=80",
    name: "Rajesh Kulkarni",
    role: "Hospital Tender Officer",
    company: "Sahyadri Network",
  },
  {
    quote:
      "Consistent pharma infusion quality and sterile disposable packs delivered on schedule across all four of our regional clinics.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=256&q=80",
    name: "Samuel Ochieng",
    role: "Supply Chain Lead",
    company: "Nairobi Regional",
  },
  {
    quote:
      "Direct OEM spare parts availability eliminated equipment downtime in our emergency trauma theatres.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80",
    name: "Henrik Lindqvist",
    role: "Clinical Sourcing",
    company: "Nordic MedSupply",
  },
];

export function TestimonialsSection({
  items = DEFAULT_MEDICAL_TESTIMONIALS,
}: {
  items?: Testimonial[];
}) {
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

  const firstColumn = items.slice(0, 3);
  const secondColumn = items.slice(3, 6);
  const thirdColumn = items.slice(6, 9);

  return (
    <section className="relative w-full bg-white py-24 md:py-32 px-6 md:px-12 overflow-hidden">
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

      <div className="relative z-10 mx-auto max-w-[1312px]">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 text-center">
          <span className="doe-tag">05 · Voices from the Ward</span>

          <h2 className="font-editorial text-[clamp(40px,4.8vw,74px)] font-normal tracking-[-0.035em] leading-[0.98] text-[#0b0f0d]">
            Trusted by <em className="italic font-light text-[#163f35]">hospital directors.</em>
          </h2>
        </div>

        <div
          className={cn(
            "mt-10 sm:mt-14 flex max-h-[500px] sm:max-h-[620px] justify-center gap-6 overflow-hidden py-2",
            "mask-[linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]",
          )}
        >
          <InfiniteSlider
            className="w-full max-w-sm"
            direction="vertical"
            speed={28}
            speedOnHover={60}
            gap={22}
          >
            {firstColumn.map((testimonial, idx) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
                index={idx + 1}
              />
            ))}
          </InfiniteSlider>
          <InfiniteSlider
            className="hidden md:block w-full max-w-sm"
            direction="vertical"
            speed={38}
            speedOnHover={75}
            gap={22}
          >
            {secondColumn.map((testimonial, idx) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
                index={idx + 4}
              />
            ))}
          </InfiniteSlider>
          <InfiniteSlider
            className="hidden lg:block w-full max-w-sm"
            direction="vertical"
            speed={32}
            speedOnHover={65}
            gap={22}
          >
            {thirdColumn.map((testimonial, idx) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
                index={idx + 7}
              />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}

const TORN_BOTTOM_PATH =
  "M0,0 L380,0 L380,6 L364,9 L348,4 L331,11 L314,5 L298,12 L281,6 L263,11 L246,4 L229,10 L212,5 L194,12 L177,6 L159,11 L142,4 L124,10 L107,5 L89,12 L72,6 L54,10 L37,4 L19,11 L0,6 Z";

function TestimonialsCard({
  testimonial,
  index = 1,
  className,
  ...props
}: React.ComponentProps<"figure"> & {
  testimonial: Testimonial;
  index?: number;
}) {
  const { quote, image, name, role, company } = testimonial;
  return (
    <figure
      className={cn(
        "group relative w-full max-w-sm pt-3 transition-transform duration-300 ease-out hover:-translate-y-1",
        className,
      )}
      {...props}
    >
      {/* Mini glossy #163f35 pushpin holding the paper note */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2"
      >
        <svg width="24" height="24" viewBox="0 0 32 32" className="drop-shadow-[0_3px_4px_rgba(11,15,13,0.28)]">
          <circle cx="16" cy="14" r="7.5" fill="#163f35" />
          <circle cx="16" cy="13" r="6" fill="#1e5447" />
          <ellipse cx="14" cy="11" rx="2.4" ry="1.3" fill="#ffffff" opacity="0.52" />
        </svg>
      </div>

      {/* Cream paper sheet body */}
      <div
        className="relative border border-b-0 border-[rgba(22,63,53,0.14)] bg-[#f2efe6] px-5 sm:px-7 pt-8 pb-6 shadow-[0_10px_26px_-12px_rgba(11,15,13,0.16)] transition-shadow duration-300 group-hover:shadow-[0_16px_34px_-12px_rgba(22,63,53,0.22)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(22,63,53,0.035) 1px, transparent 0)",
          backgroundSize: "14px 14px",
        }}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#163f35]/70">
            NOTE · {String(index).padStart(2, "0")}
          </span>
          <span className="font-serif text-2xl leading-none text-[#163f35]/40 select-none">
            &ldquo;
          </span>
        </div>

        <blockquote className="text-sm sm:text-[15px] leading-relaxed text-[#0b0f0d]">
          {quote}
        </blockquote>

        <figcaption className="mt-6 pt-4 border-t border-dashed border-[rgba(22,63,53,0.18)] flex items-center gap-3">
          <Avatar className="size-10 rounded-full border border-[rgba(22,63,53,0.2)] ring-2 ring-white/70">
            <AvatarImage alt={`${name}'s profile picture`} src={image} />
            <AvatarFallback className="bg-[#163f35] text-white text-xs">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <cite className="font-semibold text-sm text-[#0b0f0d] not-italic leading-tight">
              {name}
            </cite>
            <span className="text-[#454c48] text-xs mt-0.5 leading-tight">
              {role}
              {company ? (
                <span className="text-[#163f35] font-medium"> · {company}</span>
              ) : null}
            </span>
          </div>
        </figcaption>
      </div>

      {/* Torn bottom paper edge with white fibre rim */}
      <svg
        aria-hidden="true"
        viewBox="0 0 380 14"
        preserveAspectRatio="none"
        className="block h-[12px] w-full drop-shadow-[0_6px_8px_rgba(11,15,13,0.08)]"
      >
        <path d={TORN_BOTTOM_PATH} fill="#ffffff" transform="translate(0,1.5)" />
        <path d={TORN_BOTTOM_PATH} fill="#f2efe6" />
      </svg>
    </figure>
  );
}

export default TestimonialsSection;
