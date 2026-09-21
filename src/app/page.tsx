import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BeforeAfter } from "@/components/BeforeAfter";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { Urgency } from "@/components/Urgency";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <BeforeAfter />
        <div id="comment-ca-marche">
          <HowItWorks />
        </div>
        <Benefits />
        <div id="avis">
          <Testimonials />
        </div>
        <Urgency />
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
