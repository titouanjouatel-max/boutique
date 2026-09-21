import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PlaceholderImage } from "@/components/PlaceholderImage";

const cases = [
  { name: "Poches & gonflement", detail: "Résultat visible dès la 1ère séance" },
  { name: "Teint terne", detail: "Éclat retrouvé après 2 semaines" },
  { name: "Rides & relâchement", detail: "Peau plus ferme après 4 semaines" },
];

export function BeforeAfter() {
  return (
    <section className="bg-porcelain py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Résultats réels
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Avant / Après
          </h2>
          <p className="mt-4 text-ink/70">
            Des résultats visibles, séance après séance. {/* TODO: remplacer par vos vraies photos avant/après clients (avec autorisation) */}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {cases.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.1}>
              <div className="group relative grid grid-cols-2 gap-2 overflow-hidden rounded-2xl border border-line bg-paper p-3">
                <PlaceholderImage label="AVANT" ratio="aspect-[3/4]" />
                <PlaceholderImage label="APRÈS" ratio="aspect-[3/4]" />
                <div className="absolute left-1/2 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-paper shadow-lg">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="font-medium text-ink">{item.name}</p>
                <p className="text-sm text-ink/60">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink/40">
          * Résultats individuels, présentés à titre indicatif. Les photos ci-dessus sont des placeholders — TODO : intégrer vos vraies photos avant/après.
        </p>
      </div>
    </section>
  );
}
