"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HandWarmer } from "@/components/HandWarmer";
import { COLORS, type ColorId } from "@/lib/constants";

// Aperçu du produit avec choix du coloris.
// TODO (STRIPE) : le coloris n'est pas transmis au paiement. Ajoutez un champ
// personnalisé « Coloris » à votre Payment Link, ou un prix Stripe par coloris.
export function CheckoutVisual({ badge }: { badge: string }) {
  const [color, setColor] = useState<ColorId>("or");
  const current = COLORS.find((c) => c.id === color) ?? COLORS[0];

  return (
    <div className="relative flex h-full min-h-[440px] flex-col items-center justify-between overflow-hidden rounded-[28px] bg-mist p-6 sm:p-8">
      <span className="display self-start rounded-full bg-forest px-4 py-2 text-xl text-lime">{badge}</span>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={color}
          initial={{ y: 50, opacity: 0, rotate: -12 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -50, opacity: 0, rotate: 12 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-40 sm:w-48"
        >
          <HandWarmer color={color} level={2} title={`Chauffe-mains coloris ${current.label}`} className="w-full" />
        </motion.div>
      </AnimatePresence>

      <fieldset className="w-full">
        <legend className="text-sm font-semibold text-forest">Coloris : {current.label}</legend>
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
      </fieldset>
    </div>
  );
}
