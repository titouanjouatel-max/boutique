"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Hand, PlugZap, Power, ThermometerSun, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/Button";
import { RevealText } from "@/components/RevealText";

type Step = {
  icon: LucideIcon;
  title: string;
  text: string;
  theme: { card: string; title: string; text: string; number: string; icon: string };
};

const steps: Step[] = [
  {
    icon: PlugZap,
    title: "Rechargez-le",
    text: "Branchez le câble USB fourni. Les voyants bleus clignotent pendant la charge, puis restent fixes une fois la batterie pleine.",
    theme: {
      card: "bg-fog",
      title: "text-obsidian",
      text: "text-charcoal",
      number: "text-forest/10",
      icon: "bg-forest text-lime",
    },
  },
  {
    icon: Power,
    title: "Appui long 3 secondes",
    text: "Maintenez le bouton 3 secondes : le voyant rouge s'allume et la chaleur monte en une trentaine de secondes.",
    theme: {
      card: "bg-mist",
      title: "text-forest",
      text: "text-charcoal",
      number: "text-forest/10",
      icon: "bg-lime text-forest",
    },
  },
  {
    icon: ThermometerSun,
    title: "Choisissez le niveau",
    text: "Appuyez à nouveau pour passer d'un niveau à l'autre : 1, 2 ou 3 voyants rouges, d'environ 45 à 60 °C.",
    theme: {
      card: "bg-forest",
      title: "text-lime",
      text: "text-paper/80",
      number: "text-lime/15",
      icon: "bg-lime text-forest",
    },
  },
  {
    icon: Hand,
    title: "Glissez-le en poche",
    text: "Gardez-le en main ou dans la poche du manteau, accroché à sa dragonne. Les deux faces chauffent.",
    theme: {
      card: "bg-lime",
      title: "text-forest",
      text: "text-forest/80",
      number: "text-forest/15",
      icon: "bg-forest text-lime",
    },
  },
];

function StepCard({
  step,
  index,
  total,
  progress,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const Icon = step.icon;
  // Chaque carte rétrécit légèrement quand les suivantes viennent s'empiler dessus.
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div
      className="sticky h-[min(420px,70vh)]"
      style={{ top: `calc(6rem + ${index * 1.75}rem)` }}
    >
      <motion.article
        style={{ scale }}
        className={`group relative flex h-full origin-top flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:p-10 ${step.theme.card}`}
      >
        <span
          aria-hidden
          className={`display pointer-events-none absolute -bottom-6 -right-2 text-[clamp(8rem,22vw,15rem)] transition-transform duration-700 ease-out-expo group-hover:-translate-y-4 group-hover:-rotate-6 ${step.theme.number}`}
        >
          0{index + 1}
        </span>
        <div className="flex items-center justify-between">
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-700 ease-out-expo group-hover:rotate-[360deg] group-hover:scale-110 ${step.theme.icon}`}
          >
            <Icon className="h-6 w-6" />
          </span>
          <span className={`text-sm font-semibold ${step.theme.title}`}>
            Étape {index + 1}/{total}
          </span>
        </div>
        <div className="relative max-w-md">
          <h3 className={`display display-md ${step.theme.title}`}>{step.title}</h3>
          <p className={`mt-4 text-lg ${step.theme.text}`}>{step.text}</p>
        </div>
      </motion.article>
    </div>
  );
}

export function HowItWorks() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="comment-ca-marche" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="mb-6 inline-flex rounded-full bg-mist px-3 py-2 text-xs font-medium text-forest">
            La méthode
          </span>
          <RevealText text={"Chaud en\n30 secondes."} className="display display-lg text-obsidian" />
          <p className="mt-6 max-w-md text-lg text-charcoal">
            Un seul bouton, pas d&apos;appli, pas de pile à racheter. Voici
            comment l&apos;utiliser, d&apos;après la notice du fabricant.
          </p>
          <Button href="/checkout" variant="outline" arrow className="mt-8">
            Je le veux
          </Button>
        </div>

        <div ref={stackRef} className="relative space-y-6 pb-[6vh]">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} total={steps.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
