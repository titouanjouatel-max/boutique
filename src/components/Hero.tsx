"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { BatteryCharging, Flame, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { AnchorLink } from "@/components/AnchorLink";
import { Button } from "@/components/Button";
import { HandWarmer } from "@/components/HandWarmer";
import { Magnetic } from "@/components/Magnetic";
import { SpinningBadge } from "@/components/SpinningBadge";
import { COLORS, DISCOUNT_PERCENT, PRICE_LABEL, PRODUCT, SPECS } from "@/lib/constants";

const EXPO = [0.16, 1, 0.3, 1] as const;
// Les animations démarrent pendant que le rideau d'intro se lève.
const INTRO_DELAY = 0.55;

const WORDS = ["au chaud", "réchauffées", "dégelées"];
const maxTemp = SPECS.levels[SPECS.levels.length - 1].temp;

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  const current = WORDS[index];

  return (
    <motion.span
      layout
      transition={{ layout: { duration: 0.7, ease: EXPO } }}
      className="relative inline-flex overflow-hidden rounded-full bg-lime px-[0.2em] pb-[0.06em] pt-[0.24em] align-top leading-[0.85]"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={current} layout="position" className="inline-flex">
          {current.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "115%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-115%" }}
              transition={{ duration: 0.7, ease: EXPO, delay: i * 0.03 }}
              className="inline-block"
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

function HeadlineLine({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="-mt-[0.14em] block overflow-hidden pb-[0.06em] pt-[0.14em]">
      <motion.span
        className="block"
        initial={{ y: "110%", rotate: 4 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ duration: 1.1, ease: EXPO, delay: INTRO_DELAY + delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Élément flottant : parallaxe au scroll + suivi de la souris selon sa profondeur.
function Floater({
  progress,
  mouseX,
  mouseY,
  depth,
  speed,
  className,
  delay,
  children,
}: {
  progress: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  depth: number;
  speed: number;
  className: string;
  delay: number;
  children: ReactNode;
}) {
  const x = useTransform(mouseX, (v) => v * depth);
  const y = useTransform([progress, mouseY], ([p, m]: number[]) => p * speed + m * depth);

  return (
    <motion.div style={{ x, y }} className={`absolute z-10 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.4, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 14, delay: INTRO_DELAY + delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Le visuel s'élargit et perd ses coins arrondis en entrant dans l'écran.
  const { scrollYProgress: visualProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const visualScale = useTransform(visualProgress, [0.1, 0.5], [0.86, 1]);
  const visualRadius = useTransform(visualProgress, [0.1, 0.5], [180, 28]);
  const warmerY = useTransform(visualProgress, [0, 1], ["12%", "-12%"]);
  const warmerRotate = useTransform(visualProgress, [0, 1], [-8, 8]);

  // Le titre remonte plus lentement que la page (parallaxe) et s'estompe.
  const { scrollYProgress: heroProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(heroProgress, [0, 0.5], [0, -90]);
  const titleOpacity = useTransform(heroProgress, [0, 0.45], [1, 0.15]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18 });
  const sideLeftX = useTransform(smoothX, (v) => v * -30);
  const sideRightX = useTransform(smoothX, (v) => v * 30);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    mouseX.set(event.clientX / window.innerWidth - 0.5);
    mouseY.set(event.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      onPointerMove={handlePointerMove}
      className="relative bg-paper pb-20 pt-28 sm:pt-36 lg:pb-28"
    >
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="mx-auto max-w-[1200px] px-4 text-center sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: EXPO, delay: INTRO_DELAY }}
          className="mb-7 inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-sm font-medium text-forest"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest/50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-forest" />
          </span>
          Rechargeable · 3 niveaux · jusqu&apos;à {maxTemp} °C
        </motion.div>

        <h1
          className="display display-hero text-forest"
          aria-label="Vos mains au chaud tout l'hiver"
        >
          <span aria-hidden>
            <HeadlineLine delay={0}>Vos mains</HeadlineLine>
            <HeadlineLine delay={0.08}>
              <RotatingWord />
            </HeadlineLine>
            <HeadlineLine delay={0.16}>tout l&apos;hiver</HeadlineLine>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EXPO, delay: INTRO_DELAY + 0.35 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-charcoal sm:text-xl"
        >
          {PRODUCT.fullName} : un galet en aluminium qui chauffe des deux
          côtés, se glisse dans la poche et recharge votre téléphone en
          dépannage. Fini les chaufferettes jetables.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EXPO, delay: INTRO_DELAY + 0.45 }}
          className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8"
        >
          <Magnetic>
            <Button href="/checkout" size="lg" arrow>
              Commander — {PRICE_LABEL}
            </Button>
          </Magnetic>
          <AnchorLink
            href="/#comment-ca-marche"
            className="link-underline text-base font-medium text-forest"
          >
            Voir comment ça marche
          </AnchorLink>
        </motion.div>

        <motion.ul
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08, delayChildren: INTRO_DELAY + 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-medium text-slate"
        >
          {[
            { icon: <Flame className="h-4 w-4 text-forest" />, label: "Chauffe double face" },
            { icon: <BatteryCharging className="h-4 w-4 text-forest" />, label: "Batterie externe USB" },
            { icon: <Truck className="h-4 w-4 text-forest" />, label: "Livraison suivie" },
            { icon: <ShieldCheck className="h-4 w-4 text-forest" />, label: "Retour 30 jours" },
          ].map((item) => (
            <motion.li
              key={item.label}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-2"
            >
              {item.icon}
              {item.label}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <div ref={visualRef} className="relative mx-auto mt-12 max-w-[1200px] px-4 sm:mt-14 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EXPO, delay: INTRO_DELAY + 0.3 }}
        >
          <motion.div
            style={{ scale: visualScale, borderRadius: visualRadius }}
            className="group relative aspect-[4/5] overflow-hidden bg-forest sm:aspect-[16/10]"
          >
            {/* Halo concentrique (aplat, pas de flou) */}
            <div aria-hidden className="absolute inset-0 flex items-center justify-center">
              <span className="aspect-square w-[95%] rounded-full bg-spruce/60 sm:w-[62%]" />
              <span className="absolute aspect-square w-[68%] rounded-full bg-spruce sm:w-[44%]" />
            </div>

            <p
              aria-hidden
              className="display absolute bottom-[4%] left-[5%] text-[clamp(3.5rem,13vw,10rem)] leading-none text-lime/90"
            >
              {maxTemp}°
            </p>
            <p className="absolute left-[5%] top-[6%] max-w-[12rem] text-sm font-medium text-paper/70">
              Niveau 3 · environ {maxTemp} °C d&apos;après la notice
            </p>

            <motion.div style={{ x: sideLeftX }} className="absolute left-[6%] top-[22%] hidden w-[14%] sm:block">
              <HandWarmer color="rose" level={1} className="w-full -rotate-[18deg] opacity-90" />
            </motion.div>
            <motion.div style={{ x: sideRightX }} className="absolute right-[7%] top-[30%] hidden w-[13%] sm:block">
              <HandWarmer color="noir" level={2} className="w-full rotate-[16deg] opacity-90" />
            </motion.div>

            <motion.div
              style={{ y: warmerY, rotate: warmerRotate }}
              className="absolute inset-x-0 top-[8%] mx-auto w-[46%] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105 sm:w-[24%]"
            >
              <HandWarmer color="or" level={3} title={`${PRODUCT.name}, coloris or, niveau 3`} className="w-full drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]" />
            </motion.div>
          </motion.div>
        </motion.div>

        <Floater
          progress={visualProgress}
          mouseX={smoothX}
          mouseY={smoothY}
          depth={30}
          speed={-60}
          delay={0.85}
          className="right-2 top-[6%] sm:right-4 lg:-right-4"
        >
          <SpinningBadge
            id="hero-badge"
            text="Offre de Noël • Offre de Noël • "
            className="h-28 w-28 bg-lime sm:h-36 sm:w-36"
            textClassName="fill-forest"
          >
            <span className="display text-3xl text-forest sm:text-4xl">-{DISCOUNT_PERCENT}%</span>
          </SpinningBadge>
        </Floater>

        <Floater
          progress={visualProgress}
          mouseX={smoothX}
          mouseY={smoothY}
          depth={50}
          speed={-200}
          delay={1}
          className="bottom-[14%] left-2 hidden sm:block lg:-left-10"
        >
          <div className="flex items-center gap-3 rounded-full bg-paper py-2 pl-2 pr-5 shadow-xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-forest">
              <BatteryCharging className="h-5 w-5" />
            </span>
            <span className="text-left text-sm leading-tight">
              <span className="block font-semibold text-obsidian">Batterie externe</span>
              <span className="text-slate">Sortie USB {SPECS.output.replace("USB ", "")}</span>
            </span>
          </div>
        </Floater>

        <Floater
          progress={visualProgress}
          mouseX={smoothX}
          mouseY={smoothY}
          depth={-60}
          speed={-160}
          delay={1.1}
          className="bottom-[8%] right-3 sm:right-8 lg:-right-8"
        >
          <div className="rounded-[10px] bg-paper p-4 text-left shadow-xl">
            <p className="text-xs font-medium text-slate">4 coloris</p>
            <div className="mt-2 flex gap-1.5">
              {COLORS.map((c) => (
                <span
                  key={c.id}
                  title={c.label}
                  className="h-6 w-6 rounded-full ring-2 ring-paper"
                  style={{ backgroundColor: c.metal, boxShadow: `0 0 0 1px ${c.shade}` }}
                />
              ))}
            </div>
          </div>
        </Floater>
      </div>
    </section>
  );
}
