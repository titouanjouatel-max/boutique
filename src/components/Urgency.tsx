"use client";

import { motion } from "framer-motion";
import { Gift, Snowflake } from "lucide-react";
import { Button } from "@/components/Button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Magnetic } from "@/components/Magnetic";
import { RevealText } from "@/components/RevealText";
import { CHRISTMAS_DEADLINE_ISO, PRODUCT, STOCK } from "@/lib/constants";

const EXPO = [0.16, 1, 0.3, 1] as const;

export function Urgency() {
  const claimedPercent = Math.round(((STOCK.total - STOCK.remaining) / STOCK.total) * 100);
  const discount = Math.round((1 - PRODUCT.price / PRODUCT.compareAtPrice) * 100);

  return (
    <section aria-labelledby="offer-title" className="bg-paper px-4 py-16 sm:px-6 lg:py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 60 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.1, ease: EXPO }}
        className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-forest p-7 sm:p-10 lg:p-16"
      >
        <Snowflake
          aria-hidden
          strokeWidth={1}
          className="spin-slow pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] text-spruce"
        />

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-mist px-3 py-2 text-xs font-medium text-forest">
              <Gift className="h-3.5 w-3.5" /> Offre de Noël · durée limitée
            </span>
            <RevealText
              id="offer-title"
              text={`-${discount}%\npour Noël.`}
              className="display display-lg mt-6 text-lime"
            />
            <p className="mt-6 max-w-md text-lg text-paper/80">
              Commandez maintenant pour recevoir votre CRYOLUME™ à temps pour
              les fêtes. {/* TODO: ajuster le message selon votre délai de livraison réel */}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Magnetic>
                <Button href="/checkout" size="lg" arrow>
                  Commander — {PRODUCT.price}
                  {PRODUCT.currency}
                </Button>
              </Magnetic>
              <p className="text-paper/60">
                au lieu de{" "}
                <span className="line-through">
                  {PRODUCT.compareAtPrice}
                  {PRODUCT.currency}
                </span>
              </p>
            </div>
          </div>

          <div>
            <CountdownTimer deadlineIso={CHRISTMAS_DEADLINE_ISO} />

            <div className="mt-8 rounded-[10px] bg-spruce p-5">
              <div className="flex justify-between text-sm font-medium text-paper/80">
                <span>Stock limité</span>
                <span>
                  {STOCK.remaining} restants sur {STOCK.total}
                </span>
              </div>
              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-forest">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${claimedPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: EXPO, delay: 0.3 }}
                  className="relative h-full rounded-full bg-lime"
                >
                  <span className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 translate-x-1/2 animate-ping rounded-full bg-lime/60" />
                </motion.div>
              </div>
              <p className="mt-3 text-sm text-paper/60">
                {claimedPercent}% du stock de Noël déjà réservé
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
