import { BatteryCharging, Flame, Gift, Leaf, Ruler, Timer } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { RevealText } from "@/components/RevealText";

const benefits = [
  {
    icon: Timer,
    title: "Chaud très vite",
    text: "La chaleur monte en une trentaine de secondes après l'allumage, d'après la notice.",
  },
  {
    icon: Flame,
    title: "Deux faces chauffantes",
    text: "Les deux côtés du galet chauffent : toute la paume en profite.",
  },
  {
    icon: Leaf,
    title: "Fini le jetable",
    text: "Une batterie rechargeable remplace les chaufferettes à usage unique, hiver après hiver.",
  },
  {
    icon: BatteryCharging,
    title: "Batterie de secours",
    text: "Sa sortie USB 5 V / 1,5 A dépanne votre téléphone quand il tombe à plat.",
  },
  {
    icon: Ruler,
    title: "Format poche",
    text: "102 × 59 × 24 mm pour 135 g, avec une dragonne pour l'avoir toujours sous la main.",
  },
  {
    icon: Gift,
    title: "Prêt à offrir",
    text: "Livré dans sa boîte cadeau avec câble USB et notice. Quatre coloris au choix.",
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
              text={"Six bonnes\nraisons."}
              className="display display-lg text-obsidian"
            />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-lg text-charcoal">
              Ce que BRAISE change dans vos journées d&apos;hiver. Survolez les
              cartes pour les découvrir.
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
