"use client";

import React from "react";
import PushpinTearFooter from "@/components/ui/pushpin-tear-footer";

export default function Footer() {
  return (
    <PushpinTearFooter
      brand="vitamed."
      name="VitaMed Surgicals"
      mark="VM"
      logoHref="/"
      email="rfq@vitamedsurgicals.com"
      newsletter={{
        label: "procurement & clinical updates",
        placeholder: "hospital@domain.com",
      }}
      status={{
        label: "delhi ncr plant · 24h quotes",
        href: "/#contact",
      }}
      timeZone="Asia/Kolkata"
      timeLabel="IST"
      columns={[
        {
          title: "divisions",
          links: [
            { label: "clinical divisions", href: "/#categories" },
            { label: "global brands", href: "/#brands" },
            { label: "who we serve", href: "/#who-we-serve" },
            { label: "why choose us", href: "/#why-choose-us" },
          ],
          cta: { label: "explore divisions", href: "/#categories" },
        },
        {
          title: "company",
          links: [
            { label: "about vitamed", href: "/#about" },
            { label: "global network", href: "/#global" },
            { label: "faq & standards", href: "/#faq" },
            { label: "contact & rfq", href: "/#contact" },
          ],
        },
      ]}
      chat={{
        label: "request rfq quote",
        href: "/#contact",
      }}
      socials={[
        {
          label: "WhatsApp +91 92110 69783",
          href: "https://wa.me/919211069783",
          icon: "chat",
        },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com",
          icon: "linkedin",
        },
        {
          label: "Global Distribution",
          href: "/#global",
          icon: "globe",
        },
        {
          label: "Email RFQ Desk",
          href: "mailto:rfq@vitamedsurgicals.com",
          icon: "mail",
        },
      ]}
      sideLinks={[
        {
          label: "ISO 13485 & CE",
          href: "/#faq",
          icon: "shield",
        },
        {
          label: "Quality Dossier",
          href: "/#why-choose-us",
          icon: "doc",
        },
      ]}
      copyright="© 2026 VitaMed Surgicals Pvt. Ltd."
      credit="Delhi NCR · Faridabad, India"
      handle={{
        label: "@vitamedsurgicals",
        href: "/#contact",
      }}
      sheet="#163f35"
      paper="#f2efe6"
      sheetInk="#ffffff"
      paperInk="#163f35"
    />
  );
}
