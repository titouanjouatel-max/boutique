import { Benefits } from "@/components/Benefits";
import { FAQ } from "@/components/FAQ";
import { FinalCta } from "@/components/FinalCta";
import { FloatingOrder } from "@/components/FloatingOrder";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { HeatModes } from "@/components/HeatModes";
import { MarqueeBands } from "@/components/MarqueeBands";
import { Packs } from "@/components/Packs";
import { ProductShowcase } from "@/components/ProductShowcase";
import { WinterDay } from "@/components/WinterDay";
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
        <HeatModes />
        <HowItWorks />
        <Benefits />
        <WinterDay />
        <Testimonials />
        <Packs />
        <Urgency />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
      <FloatingOrder />
    </>
  );
}
