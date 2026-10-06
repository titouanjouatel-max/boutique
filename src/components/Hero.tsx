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
import Image from "next/image";
import { ShieldCheck, Snowflake, Truck } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { AnchorLink } from "@/components/AnchorLink";
import { Button } from "@/components/Button";
import { Magnetic } from "@/components/Magnetic";
import { SpinningBadge } from "@/components/SpinningBadge";
import { StarRating } from "@/components/StarRating";
import { PRODUCT, RATING_LABEL } from "@/lib/constants";

const EXPO = [0.16, 1, 0.3, 1] as const;
// Les animations démarrent pendant que le rideau d'intro se lève.
const INTRO_DELAY = 0.55;

const WORDS = ["dégonflé", "illuminé", "raffermi", "apaisé", "reposé"];

const discount = Math.round((1 - PRODUCT.price / PRODUCT.compareAtPrice) * 100);

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
      className="relative inline-flex overflow-hidden rounded-full bg-lime px-[0.2em] pb-[0.06em] pt-[0.16em] align-top leading-[0.85]"
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
              {char}
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
  const imageY = useTransform(visualProgress, [0, 1], ["-10%", "10%"]);

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
          Nouveau · LED 7 couleurs + effet cryo
        </motion.div>

        <h1
          className="display display-hero text-forest"
          aria-label="Votre visage dégonflé, illuminé, raffermi en 10 minutes"
        >
          <span aria-hidden>
            <HeadlineLine delay={0}>Votre visage</HeadlineLine>
            <HeadlineLine delay={0.08}>
              <RotatingWord />
            </HeadlineLine>
            <HeadlineLine delay={0.16}>en 10 minutes</HeadlineLine>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EXPO, delay: INTRO_DELAY + 0.35 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-charcoal sm:text-xl"
        >
          {PRODUCT.fullName} associe 7 couleurs de photothérapie LED et un
          effet froid intense pour dégonfler, raffermir et illuminer votre
          peau — sans injections, sans rendez-vous.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EXPO, delay: INTRO_DELAY + 0.45 }}
          className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8"
        >
          <Magnetic>
            <Button href="/checkout" size="lg" arrow>
              Commander — {PRODUCT.price}
              {PRODUCT.currency}
            </Button>
          </Magnetic>
          <AnchorLink
            href="/#comment-ca-marche"
            className="link-underline text-base font-medium text-forest"
          >
            Découvrir la méthode
          </AnchorLink>
        </motion.div>

        <motion.ul
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08, delayChildren: INTRO_DELAY + 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-medium text-slate"
        >
          {[
            {
              icon: <StarRating rating={PRODUCT.rating} size={14} />,
              label: `${RATING_LABEL}/5 · ${PRODUCT.reviewCount} avis`,
            },
            { icon: <Truck className="h-4 w-4 text-forest" />, label: "Livraison rapide" },
            { icon: <ShieldCheck className="h-4 w-4 text-forest" />, label: "Garantie 30 jours" },
            { icon: <Snowflake className="h-4 w-4 text-forest" />, label: "Certifié CE" },
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
            <motion.div style={{ y: imageY }} className="absolute -inset-y-[12%] inset-x-0">
              <Image
                src="/images/hero-main.webp"
                alt="Masque LED CRYOLUME™ porté, effet lumineux"
                fill
                priority
                sizes="(min-width: 1200px) 1152px, 100vw"
                className="object-cover object-[50%_35%] transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <Floater
          progress={visualProgress}
          mouseX={smoothX}
          mouseY={smoothY}
          depth={-40}
          speed={-120}
          delay={0.7}
          className="-left-1 top-[8%] sm:left-0 lg:-left-6"
        >
          <div className="relative h-24 w-24 overflow-hidden rounded-full shadow-xl ring-4 ring-paper sm:h-36 sm:w-36">
            <Image src="/images/feature-led.webp" alt="" fill sizes="144px" className="object-cover" />
          </div>
        </Floater>

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
            className="h-28 w-28 bg-forest sm:h-36 sm:w-36"
          >
            <span className="display text-3xl text-lime sm:text-4xl">-{discount}%</span>
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
              <Snowflake className="h-5 w-5" />
            </span>
            <span className="text-left text-sm leading-tight">
              <span className="block font-semibold text-obsidian">Effet cryo</span>
              <span className="text-slate">Visage dégonflé dès J1</span>
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
            <StarRating rating={PRODUCT.rating} size={14} />
            <p className="display mt-2 text-3xl text-forest">{RATING_LABEL}/5</p>
            <p className="text-xs font-medium text-slate">{PRODUCT.reviewCount} avis clients</p>
          </div>
        </Floater>

        <Floater
          progress={visualProgress}
          mouseX={smoothX}
          mouseY={smoothY}
          depth={-25}
          speed={-90}
          delay={1.2}
          className="bottom-[34%] right-[18%] hidden lg:block"
        >
          <div className="relative h-28 w-28 overflow-hidden rounded-full shadow-xl ring-4 ring-paper">
            <Image src="/images/feature-waterproof.webp" alt="" fill sizes="112px" className="object-cover" />
          </div>
        </Floater>
      </div>
    </section>
  );
}
