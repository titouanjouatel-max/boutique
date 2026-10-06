"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { PRODUCT } from "@/lib/constants";

const stats = [
  { value: 7, decimals: 0, suffix: "", label: "couleurs de LED", detail: "Du rouge à l'infrarouge" },
  { value: 10, decimals: 0, suffix: "min", label: "par séance", detail: "Le temps d'un café" },
  { value: 3, decimals: 0, suffix: "mm", label: "d'épaisseur", detail: "Silicone ultra-souple" },
  {
    value: PRODUCT.rating,
    decimals: 1,
    suffix: "/5",
    label: "note moyenne",
    detail: `Sur ${PRODUCT.reviewCount} avis`,
  },
];

function format(value: number, decimals: number) {
  return value.toFixed(decimals).replace(".", ",");
}

function Counter({ value, decimals }: { value: number; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = format(latest, decimals);
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(0, decimals)}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-label="CRYOLUME en chiffres" className="bg-paper py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-3 px-4 sm:px-6 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-[28px] bg-fog p-5 transition-colors duration-500 hover:bg-forest sm:p-8"
          >
            <p className="sr-only">
              {format(stat.value, stat.decimals)}
              {stat.suffix} {stat.label}
            </p>
            <p
              aria-hidden
              className="display flex items-baseline text-[clamp(3.5rem,9vw,7rem)] text-forest transition-[color,transform] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:text-lime"
            >
              <Counter value={stat.value} decimals={stat.decimals} />
              {stat.suffix && (
                <span className="ml-1 text-[0.32em] tracking-[-0.02em]">{stat.suffix}</span>
              )}
            </p>
            <p aria-hidden className="mt-4 text-base font-semibold text-obsidian transition-colors duration-500 group-hover:text-paper sm:text-lg">
              {stat.label}
            </p>
            <p className="text-sm text-slate transition-colors duration-500 group-hover:text-paper/70">
              {stat.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
