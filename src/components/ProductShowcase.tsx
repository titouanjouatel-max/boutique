"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { BatteryCharging } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/Button";
import { HandWarmer } from "@/components/HandWarmer";
import { RevealText } from "@/components/RevealText";
import { TiltCard } from "@/components/TiltCard";
import { COMPARE_AT_LABEL, PRICE_LABEL, SPECS } from "@/lib/constants";

// Chaque carte = une illustration (en attendant de vraies photos) + un argument.
const features: { title: string; text: string; bg: string; visual: ReactNode }[] = [
  {
    title: "Chauffe double face",
    text: "Les deux faces du galet chauffent : la chaleur enveloppe toute la paume, pas seulement un point.",
    bg: "bg-mist",
    visual: (
      <div className="flex items-end gap-3">
        <HandWarmer color="argent" level={3} className="w-28 -rotate-6 sm:w-32" />
        <HandWarmer color="argent" level={3} className="w-28 rotate-6 scale-x-[-1] sm:w-32" />
      </div>
    ),
  },
  {
    title: "3 niveaux de chaleur",
    text: `Environ ${SPECS.levels.map((l) => `${l.temp} °C`).join(", ").replace(/, ([^,]*)$/, " et $1")} : les voyants rouges indiquent le niveau choisi.`,
    bg: "bg-fog",
    visual: (
      <div className="flex items-end gap-4">
        {SPECS.levels.map((l) => (
          <div key={l.level} className="flex flex-col items-center gap-2">
            <HandWarmer color="or" level={l.level as 1 | 2 | 3} className="w-16 sm:w-20" />
            <span className="display text-xl text-forest">{l.temp}°</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Batterie externe",
    text: `Sortie ${SPECS.output} : de quoi redonner un peu d'énergie à votre téléphone en dépannage.`,
    bg: "bg-lime",
    visual: (
      <div className="flex items-center gap-4">
        <HandWarmer color="noir" level={0} heat={false} className="w-24 sm:w-28" />
        <svg viewBox="0 0 60 20" className="w-14 text-forest" aria-hidden>
          <path d="M2 10 h40" stroke="currentColor" strokeWidth="3" strokeDasharray="6 5" />
          <path d="M42 3 l12 7 l-12 7z" fill="currentColor" />
        </svg>
        <div className="flex h-36 w-20 flex-col items-center justify-center rounded-[18px] border-[5px] border-forest bg-paper sm:h-40 sm:w-[88px]">
          <BatteryCharging className="h-8 w-8 text-forest" />
        </div>
      </div>
    ),
  },
  {
    title: "Format galet de poche",
    text: `${SPECS.size}, ${SPECS.weight} : il se glisse dans une poche de manteau, avec sa dragonne pour ne pas le perdre.`,
    bg: "bg-mist",
    visual: (
      <div className="relative flex items-center gap-4">
        <HandWarmer color="rose" level={2} className="w-28 sm:w-32" />
        <div className="flex h-44 flex-col items-center justify-between text-forest">
          <span className="h-0.5 w-4 bg-forest" />
          <span className="display -rotate-90 whitespace-nowrap text-lg">10,2 cm</span>
          <span className="h-0.5 w-4 bg-forest" />
        </div>
      </div>
    ),
  },
];

const DESKTOP = "(min-width: 1024px)";

// Section épinglée : le scroll vertical fait défiler les cartes à l'horizontale (desktop).
// Sur mobile, la rangée devient un carrousel natif à balayer.
export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // null = pas encore mesuré (rendu serveur) ; 0 = pas de défilement horizontal.
  const [distance, setDistance] = useState<number | null>(null);
  const distanceValue = useMotionValue(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const next = window.matchMedia(DESKTOP).matches
        ? Math.max(0, track.scrollWidth - window.innerWidth)
        : 0;
      distanceValue.set(next);
      setDistance(next);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distanceValue]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform([scrollYProgress, distanceValue], ([p, d]: number[]) => -p * d);
  const smoothX = useSpring(x, { stiffness: 120, damping: 28, mass: 0.4 });
  const progressBar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  return (
    <section
      id="produit"
      ref={sectionRef}
      style={
        distance === null ? undefined : { height: distance > 0 ? `calc(100vh + ${distance}px)` : "auto" }
      }
      className="relative bg-forest lg:h-[260vh]"
    >
      <div className="flex flex-col justify-center overflow-hidden py-24 lg:sticky lg:top-0 lg:h-screen lg:py-0">
        <motion.div
          ref={trackRef}
          style={{ x: distance ? smoothX : 0 }}
          className="flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 sm:scroll-px-6 pb-4 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden lg:w-max lg:snap-none lg:gap-6 lg:overflow-visible lg:px-[max(1.5rem,calc((100vw_-_1200px)/2_+_1.5rem))] lg:pb-0"
        >
          <div className="flex w-[82vw] flex-none snap-start flex-col justify-center sm:w-[420px] lg:w-[520px] lg:pr-10">
            <span className="mb-6 inline-flex w-fit rounded-full bg-lime px-3 py-2 text-xs font-medium text-forest">
              Le produit
            </span>
            <RevealText
              text={"Petit galet.\nGrosse chaleur."}
              className="display display-lg text-lime"
            />
            <p className="mt-6 max-w-md text-lg text-paper/80">
              Aluminium, batterie rechargeable, chaleur des deux côtés.
              Faites défiler pour tout découvrir.
            </p>
          </div>

          {features.map((feature, i) => (
            <TiltCard
              key={feature.title}
              className="w-[78vw] flex-none snap-start sm:w-[360px] lg:w-[min(400px,30vw)]"
            >
              <article
                data-cursor="Défilez"
                className="group h-full rounded-[28px] bg-spruce p-3 transition-colors duration-500 hover:bg-lime"
              >
                <div className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-[20px] ${feature.bg}`}>
                  <div className="transition-transform duration-700 ease-out-expo group-hover:-rotate-3 group-hover:scale-110">
                    {feature.visual}
                  </div>
                  <span className="display absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-lg text-lime transition-transform duration-500 ease-out-expo group-hover:rotate-[360deg]">
                    0{i + 1}
                  </span>
                </div>
                <div className="px-3 pb-4 pt-5">
                  <h3 className="display text-3xl text-lime transition-colors duration-500 group-hover:text-forest">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-base text-paper/75 transition-colors duration-500 group-hover:text-forest">
                    {feature.text}
                  </p>
                </div>
              </article>
            </TiltCard>
          ))}

          <div className="flex w-[78vw] flex-none snap-start flex-col justify-between rounded-[28px] bg-lime p-8 sm:w-[360px] lg:w-[min(400px,30vw)]">
            <p className="display text-[clamp(2.4rem,4vw,3.6rem)] text-forest">
              Prêt·e pour l&apos;hiver&nbsp;?
            </p>
            <div className="mt-10">
              <p className="display text-6xl text-forest">{PRICE_LABEL}</p>
              <p className="mt-1 text-forest/70 line-through">{COMPARE_AT_LABEL}</p>
              <Button href="/checkout" variant="dark" size="lg" arrow className="mt-6">
                Commander
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-10 hidden w-full max-w-[1200px] items-center gap-4 px-6 lg:flex">
          <span className="text-sm font-medium text-paper/60">Défilez</span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-spruce">
            <motion.div style={{ scaleX: progressBar }} className="h-full origin-left rounded-full bg-lime" />
          </div>
        </div>
      </div>
    </section>
  );
}
