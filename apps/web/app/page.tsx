import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { ProblemSection } from "@/components/landing/problem-section";
import { ProductShowcase } from "@/components/landing/product-showcase";
import { WorkflowTabs } from "@/components/landing/workflow-tabs";
import { ExportSection } from "@/components/landing/export-section";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { Testimonials } from "@/components/landing/testimonials";
import { PricingSection } from "@/components/landing/pricing-section";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-[#F0F4FF] selection:bg-[#2563EB]/40">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <ProductShowcase />
        <WorkflowTabs />
        <ExportSection />
        <FeaturesGrid />
        <Testimonials />
        <PricingSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
