"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { Snowflake } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { RevealText } from "@/components/RevealText";

const modes = [
  {
    id: "rouge",
    label: "Rouge",
    wavelength: "655 nm",
    title: "Anti-âge",
    text: "Stimule la production de collagène pour une peau plus ferme et des ridules atténuées.",
    color: "#ff4d4f",
  },
  {
    id: "bleu",
    label: "Bleu",
    wavelength: "470 nm",
    title: "Anti-imperfections",
    text: "Cible les bactéries responsables des boutons et aide à apaiser les poussées d'acné.",
    color: "#3d8bff",
  },
  {
    id: "vert",
    label: "Vert",
    wavelength: "520 nm",
    title: "Teint unifié",
    text: "Aide à atténuer les taches et irrégularités pour un teint plus homogène.",
    color: "#3ddc84",
  },
  {
    id: "infrarouge",
    label: "Infrarouge",
    wavelength: "850 nm",
    title: "Régénération",
    text: "Agit plus en profondeur pour revitaliser la peau et soutenir sa récupération.",
    color: "#c2185b",
  },
  {
    id: "cryo",
    label: "Cryo",
    wavelength: "Effet froid",
    title: "Anti-gonflement",
    text: "Le froid resserre les tissus, dégonfle les poches et réveille le visage en quelques minutes.",
    color: "#7cc8ff",
  },
];

const AUTOPLAY_MS = 4500;
const EXPO = [0.16, 1, 0.3, 1] as const;

export function LedModes() {
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const mode = modes[index];

  // Défilement automatique des modes tant que l'utilisateur n'a pas choisi.
  useEffect(() => {
    if (!autoplay || !inView) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % modes.length), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [autoplay, inView, index]);

  const select = (i: number) => {
    setAutoplay(false);
    setIndex(i);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + modes.length) % modes.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section ref={sectionRef} aria-label="Modes de lumière" className="overflow-hidden bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="min-w-0">
          <span className="mb-6 inline-flex rounded-full bg-forest px-3 py-2 text-xs font-medium text-lime">
            5 modes, 1 masque
          </span>
          <RevealText
            text={"Choisissez\nvotre lumière."}
            className="display display-lg text-forest"
          />

          <div
            role="tablist"
            aria-label="Modes LED"
            onKeyDown={handleKeyDown}
            className="mt-10 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-paper p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {modes.map((m, i) => {
              const selected = i === index;
              return (
                <button
                  key={m.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${m.id}`}
                  aria-selected={selected}
                  aria-controls="led-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  className="relative flex-none overflow-hidden rounded-full px-4 py-2.5 text-[15px] font-medium text-charcoal transition-colors hover:text-forest"
                >
                  {selected && (
                    <motion.span
                      layoutId="led-tab"
                      className="absolute inset-0 rounded-full bg-lime"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {selected && autoplay && inView && (
                    <motion.span
                      key={`progress-${index}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                      className="absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-forest/40"
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: m.color }}
                      aria-hidden
                    />
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div id="led-panel" role="tabpanel" aria-labelledby={`tab-${mode.id}`} className="mt-10 min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EXPO }}
              >
                <p className="inline-flex rounded-full bg-paper px-3 py-1.5 text-sm font-semibold text-forest">
                  {mode.wavelength}
                </p>
                <h3 className="display display-md mt-4 text-obsidian">{mode.title}</h3>
                <p className="mt-4 max-w-md text-lg text-charcoal">{mode.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          {[0, 1, 2].map((ring) => (
            <span
              key={`${mode.id}-${ring}`}
              aria-hidden
              className="ripple absolute inset-0 rounded-full"
              style={{
                border: `3px solid ${mode.color}`,
                animationDelay: `${ring * 0.9}s`,
              }}
            />
          ))}
          <span
            aria-hidden
            className="spin-slow absolute -inset-4 rounded-full border-2 border-dashed border-forest/25"
          />
          <motion.div
            animate={{ boxShadow: `0 0 0 10px ${mode.color}` }}
            transition={{ duration: 0.6 }}
            className="absolute inset-[8%] overflow-hidden rounded-full bg-forest"
          >
            <Image
              src="/images/hero-main.webp"
              alt="Masque CRYOLUME™ allumé"
              fill
              sizes="(min-width: 1024px) 440px, 80vw"
              className="object-cover object-[50%_30%]"
            />
            <AnimatePresence>
              <motion.span
                key={mode.id}
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.38 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 mix-blend-color"
                style={{ backgroundColor: mode.color }}
              />
            </AnimatePresence>
          </motion.div>
          <motion.div
            key={`chip-${mode.id}`}
            initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="absolute bottom-[6%] right-[2%] flex h-24 w-24 flex-col items-center justify-center rounded-full bg-forest text-center sm:h-28 sm:w-28"
          >
            {mode.id === "cryo" ? (
              <Snowflake className="h-8 w-8 text-lime sm:h-10 sm:w-10" aria-hidden />
            ) : (
              <span className="display text-3xl text-lime sm:text-4xl">{mode.wavelength.split(" ")[0]}</span>
            )}
            <span className="mt-1 text-[11px] font-medium text-paper/80">
              {mode.id === "cryo" ? "froid" : "nm"}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
