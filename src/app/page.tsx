import { Benefits } from "@/components/Benefits";
import { FAQ } from "@/components/FAQ";
import { FinalCta } from "@/components/FinalCta";
import { FloatingOrder } from "@/components/FloatingOrder";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LedModes } from "@/components/LedModes";
import { MarqueeBands } from "@/components/MarqueeBands";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Results } from "@/components/Results";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { Urgency } from "@/components/Urgency";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <MarqueeBands />
        <Stats />
        <ProductShowcase />
        <LedModes />
        <HowItWorks />
        <Benefits />
        <Results />
        <Testimonials />
        <Urgency />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
      <FloatingOrder />
    </>
  );
}
