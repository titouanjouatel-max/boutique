"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { AnchorLink } from "@/components/AnchorLink";
import { Magnetic } from "@/components/Magnetic";
import { SpinningBadge } from "@/components/SpinningBadge";
import { PRICE_LABEL } from "@/lib/constants";

const ROW = "Commandez ✦ Mains au chaud ✦ Commandez ✦ Mains au chaud ✦ ";

// Typographie géante qui glisse en sens inverse au scroll, autour d'un bouton magnétique.
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const left = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);

  return (
    <section ref={ref} aria-label="Commander BRAISE" className="relative overflow-hidden bg-paper py-20 lg:py-28">
      <div aria-hidden className="select-none">
        <motion.p style={{ x: left }} className="display display-giant whitespace-nowrap text-forest">
          {ROW}
        </motion.p>
        <motion.p style={{ x: right }} className="display display-giant whitespace-nowrap text-fog">
          {ROW}
        </motion.p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <Magnetic strength={0.4}>
          <AnchorLink
            href="/checkout"
            className="group block rounded-full transition-transform duration-500 ease-out-expo hover:scale-105"
          >
            <SpinningBadge
              id="final-cta-badge"
              text="Livraison rapide • Garantie 30 jours • "
              className="h-44 w-44 bg-lime sm:h-56 sm:w-56"
              textClassName="fill-forest"
            >
              <span className="flex flex-col items-center text-forest">
                <ArrowUpRight className="h-10 w-10 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                <span className="display mt-1 text-2xl sm:text-3xl">
                  {PRICE_LABEL}
                </span>
                <span className="text-xs font-semibold">Commander</span>
              </span>
            </SpinningBadge>
          </AnchorLink>
        </Magnetic>
      </div>
    </section>
  );
}
