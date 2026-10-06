"use client";

import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { RevealText } from "@/components/RevealText";

// TODO: ajoutez vos vraies photos avant/après clients (avec autorisation) si vous en disposez.
const milestones = [
  {
    when: "Jour 1",
    title: "Visage dégonflé",
    text: "L'effet froid réduit les poches et le gonflement dès la première séance.",
  },
  {
    when: "Semaine 2",
    title: "Teint éclatant",
    text: "La microcirculation est relancée : le teint paraît plus lumineux et plus unifié.",
  },
  {
    when: "Semaine 4",
    title: "Peau plus ferme",
    text: "Les ridules s'estompent, la peau gagne en fermeté et en densité.",
  },
];

function Milestone({ item, index }: { item: (typeof milestones)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reached = useInView(ref, { margin: "0px 0px -45% 0px" });
  const right = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`relative grid pl-14 lg:grid-cols-2 lg:gap-24 lg:pl-0 ${right ? "" : "lg:text-right"}`}
    >
      <motion.span
        aria-hidden
        animate={reached ? { scale: 1, backgroundColor: "#9fe870" } : { scale: 0.6, backgroundColor: "#054d28" }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="absolute left-[11px] top-2 h-6 w-6 rounded-full ring-8 ring-forest lg:left-1/2 lg:-ml-3"
      />
      <motion.div
        initial={{ opacity: 0, x: right ? 80 : -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={right ? "lg:col-start-2" : ""}
      >
        <span className="inline-flex rounded-full bg-lime px-3 py-1.5 text-sm font-semibold text-forest">
          {item.when}
        </span>
        <h3 className="display display-md mt-5 text-paper">{item.title}</h3>
        <p className={`mt-4 max-w-md text-lg text-paper/70 ${right ? "" : "lg:ml-auto"}`}>{item.text}</p>
      </motion.div>
    </div>
  );
}

export function Results() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="resultats" className="bg-forest py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="text-center">
          <span className="mb-6 inline-flex rounded-full bg-spruce px-3 py-2 text-xs font-medium text-lime">
            Résultats
          </span>
          <RevealText
            text={"Des résultats\nqui se voient."}
            className="display display-xl text-lime"
          />
        </div>

        <div ref={timelineRef} className="relative mt-20 space-y-24 lg:mt-28 lg:space-y-32">
          <div aria-hidden className="absolute bottom-0 left-[22px] top-0 w-1 -translate-x-1/2 rounded-full bg-spruce lg:left-1/2">
            <motion.div style={{ scaleY: lineScale }} className="h-full w-full origin-top rounded-full bg-lime" />
          </div>
          {milestones.map((item, i) => (
            <Milestone key={item.when} item={item} index={i} />
          ))}
        </div>

        <p className="mt-20 text-center text-sm text-paper/50">
          * Résultats individuels, présentés à titre indicatif, pour une utilisation quotidienne.
        </p>
      </div>
    </section>
  );
}
