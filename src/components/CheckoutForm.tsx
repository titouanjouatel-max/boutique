"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BatteryCharging, Lock, RotateCcw, Truck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button";
import { HandWarmer } from "@/components/HandWarmer";
import { PackSelector, colorLabel } from "@/components/PackSelector";
import {
  COLORS,
  DEFAULT_PACK_ID,
  PACKS,
  PRODUCT,
  SPECS,
  UNIT_PRICE,
  formatPrice,
  stripeUrlFor,
  type ColorId,
  type PackId,
} from "@/lib/constants";

function isPackId(value: string | null): value is PackId {
  return PACKS.some((p) => p.id === value);
}

// TODO (STRIPE) : le coloris n'est pas transmis au paiement. Ajoutez un champ
// personnalisé « Coloris » à chaque Payment Link (ou un prix Stripe par coloris).
export function CheckoutForm() {
  const params = useSearchParams();
  const initial = params.get("pack");
  const [packId, setPackId] = useState<PackId>(isPackId(initial) ? initial : DEFAULT_PACK_ID);
  const [color, setColor] = useState<ColorId>("or");
  const pack = PACKS.find((p) => p.id === packId) ?? PACKS[0];

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col gap-6">
        <div className="relative flex min-h-[340px] flex-col items-center justify-between overflow-hidden rounded-[28px] bg-mist p-6 sm:p-8">
          <span className="self-start rounded-full bg-forest px-4 py-2 text-sm font-semibold text-lime">
            Pack {pack.name} · {pack.quantity} × {colorLabel(color)}
          </span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`${pack.id}-${color}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex items-end justify-center py-4"
            >
              {Array.from({ length: pack.quantity }).map((_, i) => (
                <span
                  key={i}
                  className={`w-28 sm:w-32 ${i > 0 ? "-ml-8" : ""}`}
                  style={{ rotate: `${(i - (pack.quantity - 1) / 2) * 12}deg` }}
                >
                  <HandWarmer color={color} level={2} className="w-full" />
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
          <fieldset className="w-full">
            <legend className="text-sm font-semibold text-forest">Coloris : {colorLabel(color)}</legend>
            <div className="mt-3 flex gap-2">
              {COLORS.map((c) => (
                <label key={c.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="checkout-color"
                    value={c.id}
                    checked={color === c.id}
                    onChange={() => setColor(c.id)}
                    className="peer sr-only"
                  />
                  <span
                    className="block h-10 w-10 rounded-full ring-2 ring-transparent ring-offset-2 ring-offset-mist transition-transform duration-300 hover:scale-110 peer-checked:ring-forest peer-focus-visible:ring-forest"
                    style={{ backgroundColor: c.metal, boxShadow: `inset 0 0 0 1px ${c.shade}` }}
                  />
                  <span className="sr-only">{c.label}</span>
                </label>
              ))}
            </div>
            {pack.quantity > 1 && (
              <p className="mt-3 text-sm text-slate">
                Envie de coloris différents dans votre pack ? Précisez-les sur la page de paiement.
              </p>
            )}
          </fieldset>
        </div>

        <PackSelector name="checkout-pack" value={packId} onChange={setPackId} compact color={color} />
      </div>

      <div className="flex h-full flex-col rounded-[28px] bg-forest p-7 sm:p-10 lg:sticky lg:top-24 lg:self-start">
        <span className="inline-flex w-fit rounded-full bg-lime px-3 py-1.5 text-xs font-semibold text-forest">
          Votre panier
        </span>
        <h2 className="display display-md mt-6 text-lime">{PRODUCT.name}</h2>
        <p className="mt-3 text-base text-paper/80">
          Pack {pack.name} : {pack.quantity} chauffe-mains double face, 3 niveaux, batterie externe USB
        </p>
        <p className="mt-2 text-sm text-paper/60">Dans chaque boîte : {SPECS.inBox.toLowerCase()}.</p>

        {/* Récapitulatif dans une carte blanche, façon sélecteur Wise. */}
        <div className="mt-8 rounded-[10px] bg-paper p-5 tabular-nums">
          <div className="flex items-center justify-between gap-4 text-charcoal">
            <span>
              {pack.quantity} × {formatPrice(UNIT_PRICE)}
            </span>
            <span>{formatPrice(UNIT_PRICE * pack.quantity)}</span>
          </div>
          {pack.saving > 0 && (
            <div className="mt-2 flex items-center justify-between gap-4 text-charcoal">
              <span>Remise pack (-{pack.savingPercent}%)</span>
              <span className="font-semibold text-forest">-{formatPrice(pack.saving)}</span>
            </div>
          )}
          <div className="mt-2 flex items-center justify-between gap-4 text-charcoal">
            <span>Livraison</span>
            <span className={pack.freeShipping ? "font-semibold text-forest" : ""}>
              {pack.freeShipping ? "Offerte" : "Calculée au paiement"}
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-4 border-t border-fog pt-4">
            <span className="font-semibold text-obsidian">Total</span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={pack.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="display text-5xl text-forest"
              >
                {formatPrice(pack.price)}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {[
            { icon: Truck, label: pack.freeShipping ? "Livraison offerte" : "Livraison suivie" },
            { icon: RotateCcw, label: "Retour 30 jours" },
            { icon: BatteryCharging, label: "Câble USB inclus" },
          ].map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full bg-spruce px-3 py-2 text-sm font-medium text-paper"
            >
              <Icon className="h-4 w-4 text-lime" /> {label}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          <Button href={stripeUrlFor(pack)} external size="lg" arrow className="w-full">
            Payer {formatPrice(pack.price)} avec Stripe
          </Button>
          <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-paper/60">
            <Lock className="h-3.5 w-3.5" />
            Paiement 100% sécurisé et chiffré · Vos données bancaires ne sont jamais stockées sur nos serveurs.
          </p>
        </div>
      </div>
    </div>
  );
}
