import { Droplet, Power, Sparkles, Timer } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const steps = [
  {
    icon: Droplet,
    title: "Nettoyez votre visage",
    text: "Démaquillez et nettoyez votre peau pour une absorption optimale de la lumière LED.",
  },
  {
    icon: Power,
    title: "Enfilez le masque",
    text: "Positionnez le masque CRYOLUME confortablement grâce aux sangles ajustables.",
  },
  {
    icon: Sparkles,
    title: "Choisissez votre mode",
    text: "Sélectionnez LED rouge (anti-âge), bleu (imperfections) ou l'effet cryo anti-gonflement.",
  },
  {
    icon: Timer,
    title: "Détendez-vous 10 min",
    text: "Laissez agir la séance, sans risque, pendant que vous lisez ou vous relaxez.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Simplicité
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Comment ça marche
          </h2>
          <p className="mt-4 text-ink/70">
            Un rituel simple, rapide et sans risque, à intégrer en quelques minutes.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="relative h-full rounded-2xl border border-line bg-porcelain p-6">
                  <span className="font-display text-4xl font-semibold text-ink/10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-2 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
