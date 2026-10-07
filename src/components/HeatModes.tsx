"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { HandWarmer } from "@/components/HandWarmer";
import { RevealText } from "@/components/RevealText";
import { COLORS, SPECS, type ColorId } from "@/lib/constants";

// Températures indicatives de la notice ; les usages sont des suggestions.
const modes = [
  {
    id: "niveau-1",
    label: "Niveau 1",
    title: "Douceur",
    text: "Une chaleur légère pour garder les mains tièdes au bureau, en lisant ou devant un film.",
    color: "#ffb347",
  },
  {
    id: "niveau-2",
    label: "Niveau 2",
    title: "Confort",
    text: "Le réglage du quotidien : trajet à pied, attente à l'arrêt de bus, promenade du chien.",
    color: "#ff7a3d",
  },
  {
    id: "niveau-3",
    label: "Niveau 3",
    title: "Grand froid",
    text: "Pour le stade, le marché de Noël ou la piste de ski. Si c'est trop chaud, glissez-le dans une poche, comme le conseille la notice.",
    color: "#cb272f",
  },
].map((mode, i) => ({ ...mode, level: (i + 1) as 1 | 2 | 3, temp: SPECS.levels[i].temp }));

const AUTOPLAY_MS = 4500;
const EXPO = [0.16, 1, 0.3, 1] as const;

export function HeatModes() {
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [color, setColor] = useState<ColorId>("or");
  const mode = modes[index];

  // Défilement automatique des niveaux tant que l'utilisateur n'a pas choisi.
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
    <section ref={sectionRef} aria-label="Niveaux de chaleur" className="overflow-hidden bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="min-w-0">
          <span className="mb-6 inline-flex rounded-full bg-forest px-3 py-2 text-xs font-medium text-lime">
            3 niveaux, 1 bouton
          </span>
          <RevealText text={"Réglez\nvotre chaleur."} className="display display-lg text-forest" />

          <div
            role="tablist"
            aria-label="Niveaux de chaleur"
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
                  aria-controls="heat-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  className="relative flex-none overflow-hidden rounded-full px-4 py-2.5 text-[15px] font-medium text-charcoal transition-colors hover:text-forest"
                >
                  {selected && (
                    <motion.span
                      layoutId="heat-tab"
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
                    <span className="flex gap-0.5" aria-hidden>
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className={`h-1.5 w-1.5 rounded-full ${dot <= i ? "bg-alarm" : "bg-fog"}`}
                        />
                      ))}
                    </span>
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div id="heat-panel" role="tabpanel" aria-labelledby={`tab-${mode.id}`} className="mt-10 min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EXPO }}
              >
                <p className="inline-flex rounded-full bg-paper px-3 py-1.5 text-sm font-semibold text-forest">
                  Environ {mode.temp} °C
                </p>
                <h3 className="display display-md mt-4 text-obsidian">{mode.title}</h3>
                <p className="mt-4 max-w-md text-lg text-charcoal">{mode.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <fieldset className="mt-4">
            <legend className="text-sm font-semibold text-forest">
              Coloris : {COLORS.find((c) => c.id === color)?.label}
            </legend>
            <div className="mt-3 flex gap-2">
              {COLORS.map((c) => (
                <label key={c.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="heat-color"
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

        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          {[0, 1, 2].map((ring) => (
            <span
              key={`${mode.id}-${ring}`}
              aria-hidden
              className="ripple absolute inset-0 rounded-full"
              style={{ border: `3px solid ${mode.color}`, animationDelay: `${ring * 0.9}s` }}
            />
          ))}
          <span aria-hidden className="spin-slow absolute -inset-4 rounded-full border-2 border-dashed border-forest/25" />
          <motion.div
            animate={{ boxShadow: `0 0 0 10px ${mode.color}` }}
            transition={{ duration: 0.6 }}
            className="absolute inset-[8%] flex items-center justify-center overflow-hidden rounded-full bg-forest"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={color}
                initial={{ y: 60, opacity: 0, rotate: -10 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -60, opacity: 0, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-[42%]"
              >
                <HandWarmer
                  color={color}
                  level={mode.level}
                  title={`Chauffe-mains coloris ${COLORS.find((c) => c.id === color)?.label}, ${mode.label}`}
                  className="w-full"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <motion.div
            key={`chip-${mode.id}`}
            initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="absolute bottom-[6%] right-[2%] flex h-24 w-24 flex-col items-center justify-center rounded-full bg-lime text-center sm:h-28 sm:w-28"
          >
            <span className="display text-3xl text-forest sm:text-4xl">{mode.temp}°</span>
            <span className="mt-1 text-[11px] font-semibold text-forest/80">{mode.label}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
