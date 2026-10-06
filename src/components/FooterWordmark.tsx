"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

// Logo géant dont les lettres surgissent une à une, et sautent au survol.
export function FooterWordmark() {
  return (
    <motion.p
      aria-hidden
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ staggerChildren: 0.05 }}
      className="display flex select-none justify-between overflow-hidden pt-[0.08em] text-[min(16vw,12.5rem)] text-lime"
    >
      {SITE.name.split("").map((letter, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { y: "100%" },
            show: { y: "0%", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="inline-block"
        >
          <span className="inline-block transition-transform duration-500 ease-out-expo hover:-translate-y-[0.12em]">
            {letter}
          </span>
        </motion.span>
      ))}
    </motion.p>
  );
}
