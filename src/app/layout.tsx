import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WebsitePreloader from "@/components/layout/WebsitePreloader";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: "VitaMed Surgicals | Precision Medical & Hospital Equipment",
  description:
    "VitaMed Surgicals Private Limited - Premier manufacturer and global distributor of medical devices, hospital furniture, surgical instruments, and sterilization autoclaves adhering to ISO 13485:2016 and WHO-GMP standards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.21st.dev" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#fafbfc] text-[#0f172a] selection:bg-[#e6f4ea] selection:text-[#0d6e53] antialiased bg-med-canvas"
      >
        <WebsitePreloader />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
