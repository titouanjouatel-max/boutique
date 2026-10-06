"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType } from "react";

type RevealTextProps = {
  // "\n" = retour à la ligne, *texte* = segment mis en valeur.
  text: string;
  id?: string;
  as?: ElementType;
  className?: string;
  highlightClassName?: string;
  delay?: number;
  stagger?: number;
  // `true` : joue l'animation au montage plutôt qu'à l'entrée dans l'écran.
  immediate?: boolean;
};

const word: Variants = {
  hidden: { y: "115%", rotate: 6 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

function parse(line: string) {
  return line.split("*").flatMap((segment, i) =>
    segment
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ text: w, highlight: i % 2 === 1 })),
  );
}

// Titre d'affichage dont chaque mot surgit d'un masque, en cascade.
export function RevealText({
  text,
  id,
  as: Tag = "h2",
  className = "",
  highlightClassName = "",
  delay = 0,
  stagger = 0.07,
  immediate = false,
}: RevealTextProps) {
  const lines = text.split("\n").map(parse);
  const trigger = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -15% 0px" } };

  return (
    <Tag id={id} className={className} aria-label={text.replace(/\*/g, "").replace(/\n/g, " ")}>
      <motion.span
        aria-hidden
        className="block"
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {lines.map((words, li) => (
          <span key={li} className="block">
            {words.map((w, wi) => (
              <span key={wi}>
                <span className="-mb-[0.08em] -mt-[0.14em] inline-block overflow-hidden pb-[0.08em] pt-[0.14em] align-top">
                  <motion.span
                    variants={word}
                    className={`inline-block origin-bottom-left ${w.highlight ? highlightClassName : ""}`}
                  >
                    {w.text}
                  </motion.span>
                </span>
                {wi < words.length - 1 && " "}
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
