"use client";

import { motion } from "framer-motion";
import { Check, Truck } from "lucide-react";
import { HandWarmer } from "@/components/HandWarmer";
import { COLORS, PACKS, formatPrice, type ColorId, type PackId } from "@/lib/constants";

const STACK_COLORS: ColorId[] = ["or", "rose", "argent"];

// Cartes de packs (boutons radio) : le pack choisi passe en vert forêt.
export function PackSelector({
  value,
  onChange,
  name,
  compact = false,
  color,
}: {
  value: PackId;
  onChange: (id: PackId) => void;
  name: string;
  compact?: boolean;
  // Coloris affiché sur l'illustration (sinon un mélange de coloris).
  color?: ColorId;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Choix du pack"
      className={`grid gap-3 ${compact ? "" : "md:grid-cols-3 md:gap-4"}`}
    >
      {PACKS.map((pack) => {
        const selected = pack.id === value;
        return (
          <label
            key={pack.id}
            className={`group relative flex cursor-pointer items-center gap-4 rounded-[28px] p-5 transition-all duration-500 ease-out-expo hover:-translate-y-1 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-lime has-[:focus-visible]:ring-offset-2 ${
              compact ? "" : "md:flex-col md:items-stretch md:gap-5 md:p-7"
            } ${selected ? "bg-forest text-paper" : "bg-paper text-obsidian shadow-subtle hover:shadow-lg"}`}
          >
            <input
              type="radio"
              name={name}
              value={pack.id}
              checked={selected}
              onChange={() => onChange(pack.id)}
              className="peer sr-only"
            />

            {pack.badge && (
              <span
                className={`absolute -top-3 right-5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  selected ? "bg-lime text-forest" : "bg-forest text-lime"
                }`}
              >
                {pack.badge}
              </span>
            )}

            {/* Illustration : autant de galets que d'unités */}
            <span
              className={`flex flex-none items-end justify-center rounded-[20px] transition-colors duration-500 ${
                selected ? "bg-spruce" : "bg-mist"
              } ${compact ? "h-20 w-24 px-2 pb-2" : "h-20 w-24 px-2 pb-2 md:h-36 md:w-auto md:px-4 md:pb-3"}`}
            >
              {Array.from({ length: pack.quantity }).map((_, i) => (
                <motion.span
                  key={i}
                  animate={selected ? { y: [0, -6, 0] } : { y: 0 }}
                  transition={{ duration: 1.6, repeat: selected ? Infinity : 0, delay: i * 0.15 }}
                  className={`${compact ? "w-8" : "w-8 md:w-14"} ${i > 0 ? "-ml-3" : ""}`}
                  style={{ rotate: `${(i - (pack.quantity - 1) / 2) * 10}deg` }}
                >
                  <HandWarmer color={color ?? STACK_COLORS[i % STACK_COLORS.length]} level={selected ? 2 : 0} heat={selected} className="w-full" />
                </motion.span>
              ))}
            </span>

            <span className="flex min-w-0 flex-1 flex-col">
              <span className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 transition-colors ${
                    selected ? "border-lime bg-lime text-forest" : "border-pebble"
                  }`}
                >
                  {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span className="text-base font-bold tracking-[-0.01em] sm:text-lg">
                  {pack.name} · {pack.quantity} chauffe-mains
                </span>
              </span>
              <span className={`mt-1 text-sm ${selected ? "text-paper/70" : "text-slate"}`}>{pack.tagline}</span>

              <span className={`flex flex-wrap items-end justify-between gap-x-3 gap-y-2 ${compact ? "mt-2" : "mt-2 md:mt-5"}`}>
                <span>
                  <span className={`display block ${compact ? "text-3xl" : "text-3xl md:text-5xl"} ${selected ? "text-lime" : "text-forest"}`}>
                    {formatPrice(pack.price)}
                  </span>
                  <span className={`text-sm ${selected ? "text-paper/70" : "text-slate"}`}>
                    soit {formatPrice(pack.perUnit)} / unité
                  </span>
                </span>
                {pack.saving > 0 && (
                  <span
                    className={`flex-none rounded-full px-3 py-1.5 text-xs font-semibold ${
                      selected ? "bg-lime text-forest" : "bg-mist text-forest"
                    }`}
                  >
                    -{formatPrice(pack.saving)} (-{pack.savingPercent}%)
                  </span>
                )}
              </span>

              {!compact && (
                <span className={`mt-3 flex items-center gap-2 text-sm md:mt-4 ${selected ? "text-paper/80" : "text-charcoal"}`}>
                  <Truck className="h-4 w-4 flex-none" />
                  {pack.freeShipping ? "Livraison offerte" : "Livraison suivie"}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}

// Utilitaire : libellé du coloris.
export function colorLabel(id: ColorId) {
  return COLORS.find((c) => c.id === id)?.label ?? id;
}
