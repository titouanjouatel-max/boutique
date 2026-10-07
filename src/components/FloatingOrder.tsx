"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { AnchorLink } from "@/components/AnchorLink";
import { HandWarmer } from "@/components/HandWarmer";
import { PRICE_LABEL, PRODUCT } from "@/lib/constants";

// Badge de commande flottant (façon « QR badge » Wise), affiché après le hero.
export function FloatingOrder() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Masqué en haut de page et tout en bas (le footer a déjà son propre bouton).
    setVisible(latest > 900 && scrollYProgress.get() < 0.94);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:bottom-6 sm:right-6"
        >
          <AnchorLink
            href="/checkout"
            className="group flex items-center gap-3 rounded-full bg-forest p-2 pr-3 shadow-xl ring-1 ring-lime/40 transition-transform duration-500 ease-out-expo sm:w-[132px] sm:flex-col sm:gap-2 sm:rounded-2xl sm:p-3 sm:hover:-translate-y-1.5"
          >
            <span className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-full bg-spruce sm:aspect-square sm:h-auto sm:w-full sm:rounded-[10px] sm:py-2">
              <HandWarmer color="or" level={2} className="h-10 transition-transform duration-700 ease-out-expo group-hover:-rotate-12 group-hover:scale-110 sm:h-20" />
            </span>
            <span className="flex-1 text-sm font-semibold text-paper sm:hidden">
              {PRODUCT.name}{" "}
              <span className="text-lime">
                dès {PRICE_LABEL}
              </span>
            </span>
            <span className="rounded-full bg-lime px-5 py-3 text-sm font-semibold text-forest sm:bg-transparent sm:p-0 sm:text-center sm:text-xs sm:font-medium sm:text-lime">
              <span className="sm:hidden">Commander</span>
              <span className="hidden sm:inline">
                Dès {PRICE_LABEL}
              </span>
            </span>
          </AnchorLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
