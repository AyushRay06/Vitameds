import OrbitDeliveryHero from "@/components/ui/orbit-delivery-hero";
import AboutSection from "@/components/home/AboutSection";
import ProductCategoriesSection from "@/components/home/ProductCategoriesSection";
import BrandMarqueeSection from "@/components/home/BrandMarqueeSection";
import GlobalPresenceSection from "@/components/home/GlobalPresenceSection";
import WhoWeServeSection from "@/components/home/WhoWeServeSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import ContactFormSection from "@/components/home/ContactFormSection";
import PaperTearDivider from "@/components/ui/paper-tear-divider";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-clip bg-white">
      {/* 1. 3D Interactive Medical Hero (kept completely intact) */}
      <section id="hero" className="relative w-full overflow-hidden">
        <OrbitDeliveryHero showHeader={false} />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#fafbfc] via-[#fafbfc]/70 to-transparent z-10" />
      </section>

      {/* 2. Editorial Marquee + Scroll-Driven About Statement + Narrative (#FFFFFF) */}
      <AboutSection />

      {/* Paper tear transition: White -> Cream */}
      <PaperTearDivider topColor="#ffffff" bottomColor="#f2efe6" seed={21} />

      {/* 3. 7 Medical Divisions Split Clip-Path Showcase (#F2EFE6 Cream) */}
      <ProductCategoriesSection />

      {/* Paper tear transition: Cream -> White */}
      <PaperTearDivider topColor="#f2efe6" bottomColor="#ffffff" seed={37} />

      {/* 4. Global Brand Partners Marquee (#FFFFFF) */}
      <BrandMarqueeSection />

      {/* Paper tear transition: White -> Cream */}
      <PaperTearDivider topColor="#ffffff" bottomColor="#f2efe6" seed={47} />

      {/* 5. Sticky 3D Earth Globe + Scrolling Editorial Metrics (#F2EFE6 Cream) */}
      <GlobalPresenceSection />

      {/* Paper tear transition: Cream -> White */}
      <PaperTearDivider topColor="#f2efe6" bottomColor="#ffffff" seed={53} />

      {/* 6. Who We Serve (#FFFFFF) */}
      <WhoWeServeSection />

      {/* Paper tear transition: White -> Dark Green */}
      <PaperTearDivider topColor="#ffffff" bottomColor="#163f35" seed={63} />

      {/* 7. Why Choose Us (#163F35 Dark Green) */}
      <WhyChooseUsSection />

      {/* Paper tear transition: Dark Green -> White */}
      <PaperTearDivider topColor="#163f35" bottomColor="#ffffff" seed={71} />

      {/* 8. Pinned Paper Note Testimonials (#FFFFFF) */}
      <TestimonialsSection />

      {/* 9. 4-Sided Torn Paper FAQ (#163F35 on #FFFFFF) */}
      <FAQSection />

      {/* 10. Direct Factory RFQ (#FFFFFF) */}
      <ContactFormSection />
    </div>
  );
}
