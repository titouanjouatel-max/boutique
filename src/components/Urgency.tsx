import { Gift } from "lucide-react";
import { Button } from "@/components/Button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Reveal } from "@/components/Reveal";
import { CHRISTMAS_DEADLINE_ISO, PRODUCT, STOCK } from "@/lib/constants";

export function Urgency() {
  const claimedPercent = Math.round(
    ((STOCK.total - STOCK.remaining) / STOCK.total) * 100
  );

  return (
    <section className="bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold">
            <Gift className="h-6 w-6" />
          </div>
          <h2 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
            Offre de Noël à durée limitée
          </h2>
          <p className="mt-4 text-paper/70">
            Commandez maintenant pour recevoir votre CRYOLUME™ à temps pour
            les fêtes. {/* TODO: ajuster le message selon votre délai de livraison réel */}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <CountdownTimer deadlineIso={CHRISTMAS_DEADLINE_ISO} />
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <div className="mx-auto max-w-md">
            <div className="flex justify-between text-xs font-medium uppercase tracking-wide text-paper/50">
              <span>Stock limité</span>
              <span>
                {STOCK.remaining} restants sur {STOCK.total}
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gold"
                style={{ width: `${claimedPercent}%` }}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <Button href="/checkout" variant="light" size="lg">
            Commander maintenant — {PRODUCT.price}
            {PRODUCT.currency}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
