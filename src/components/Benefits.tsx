import { Flame, Gem, Moon, Snowflake, Sparkle, Sun } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { RevealText } from "@/components/RevealText";

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
    <section aria-labelledby="benefits-title" className="bg-fog py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="mb-6 inline-flex rounded-full bg-paper px-3 py-2 text-xs font-medium text-forest">
              Bénéfices
            </span>
            <RevealText
              id="benefits-title"
              text={"Six effets.\nUn seul geste."}
              className="display display-lg text-obsidian"
            />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-lg text-charcoal">
              Ce que CRYOLUME change pour votre peau, jour après jour. Survolez
              les cartes pour les découvrir.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={(i % 3) * 0.1} y={60}>
                <article className="group relative h-full overflow-hidden rounded-[28px] bg-paper p-8 transition-transform duration-500 ease-out-expo hover:-translate-y-2">
                  {/* Disque vert qui envahit la carte depuis l'icône au survol. */}
                  <span
                    aria-hidden
                    className="absolute left-8 top-8 h-14 w-14 scale-0 rounded-full bg-forest transition-transform duration-700 ease-out-expo group-hover:scale-[22]"
                  />
                  <div className="relative">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mist text-forest transition-all duration-500 ease-out-expo group-hover:rotate-12 group-hover:scale-110 group-hover:bg-lime">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-8 text-2xl font-bold tracking-[-0.02em] text-obsidian transition-colors duration-500 group-hover:text-lime">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-base text-charcoal transition-colors duration-500 group-hover:text-paper/80">
                      {b.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
