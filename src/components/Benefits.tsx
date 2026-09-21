import { Flame, Gem, Moon, Snowflake, Sparkle, Sun } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const benefits = [
  {
    icon: Snowflake,
    title: "Visage dégonflé",
    text: "L'effet froid resserre instantanément les tissus et réduit les poches, dès le matin.",
  },
  {
    icon: Sun,
    title: "Éclat immédiat",
    text: "La lumière LED stimule la microcirculation pour un teint plus lumineux et unifié.",
  },
  {
    icon: Gem,
    title: "Effet anti-âge",
    text: "La lumière rouge favorise la production de collagène pour une peau plus ferme.",
  },
  {
    icon: Flame,
    title: "Imperfections apaisées",
    text: "La lumière bleue cible les bactéries responsables des boutons et de l'acné.",
  },
  {
    icon: Moon,
    title: "Cernes atténués",
    text: "Le froid décongestionne le contour des yeux et atténue les cernes de fatigue.",
  },
  {
    icon: Sparkle,
    title: "Rituel bien-être",
    text: "10 minutes de détente pure, comme un soin spa, sans sortir de chez vous.",
  },
];

export function Benefits() {
  return (
    <section className="bg-porcelain py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Bénéfices
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Les problèmes que CRYOLUME résout
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={(i % 3) * 0.08}>
                <div className="flex h-full gap-4 rounded-2xl border border-line bg-paper p-6">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {b.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/65">
                      {b.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
