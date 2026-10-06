"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { FINE_POINTER_QUERY, useMediaQuery } from "@/hooks/useMediaQuery";

type CursorState = { mode: "default" | "hover" | "label"; label?: string };

// Curseur suiveur : pastille lime qui s'agrandit sur les éléments interactifs.
// Ajoutez data-cursor="Texte" sur un élément pour afficher une étiquette.
export function Cursor() {
  const enabled = useMediaQuery(FINE_POINTER_QUERY);
  const [state, setState] = useState<CursorState>({ mode: "default" });
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 600, damping: 45, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 600, damping: 45, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const next: CursorState = labelled
        ? { mode: "label", label: labelled.dataset.cursor }
        : { mode: target?.closest("a, button, [role='tab'], label, summary") ? "hover" : "default" };
      // Évite un rendu à chaque mouvement si l'état ne change pas.
      setState((prev) => (prev.mode === next.mode && prev.label === next.label ? prev : next));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = state.mode === "label" ? 96 : state.mode === "hover" ? 52 : 14;

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[200]"
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          backgroundColor:
            state.mode === "hover" ? "rgba(159, 232, 112, 0)" : "rgba(159, 232, 112, 1)",
          borderWidth: state.mode === "hover" ? 2 : 1.5,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-solid border-forest shadow-[0_0_0_2px_rgba(159,232,112,0.9)]"
      >
        <AnimatePresence>
          {state.mode === "label" && (
            <motion.span
              key={state.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-xs font-semibold uppercase tracking-wide text-forest"
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
