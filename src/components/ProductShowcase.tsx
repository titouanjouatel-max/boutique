"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { RevealText } from "@/components/RevealText";
import { TiltCard } from "@/components/TiltCard";
import { PRODUCT } from "@/lib/constants";

const features = [
  {
    src: "/images/feature-led.webp",
    alt: "7 couleurs de photothérapie LED",
    title: "7 couleurs LED",
    text: "Rouge, bleu, vert, jaune, violet, cyan et proche infrarouge : une lumière pour chaque besoin.",
  },
  {
    src: "/images/feature-thin.webp",
    alt: "CRYOLUME™ ultra-fin et léger",
    title: "Ultra-fin & léger",
    text: "3 mm d'épaisseur et 118 g pour le masque visage : on oublie qu'on le porte.",
  },
  {
    src: "/images/feature-waterproof.webp",
    alt: "CRYOLUME™ étanche IPX7",
    title: "Étanche IPX7",
    text: "Surface en silicone résistante à l'eau, qui se nettoie en quelques secondes.",
  },
  {
    src: "/images/feature-ergonomic.webp",
    alt: "Silicone souple et ergonomique",
    title: "Souple & ergonomique",
    text: "Silicone de qualité alimentaire qui épouse les contours du visage et du cou.",
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
              text={"Un masque.\nSept lumières."}
              className="display display-lg text-lime"
            />
            <p className="mt-6 max-w-md text-lg text-paper/80">
              Un soin visage + cou complet, pensé pour être porté chaque jour.
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
                <div className="relative aspect-square overflow-hidden rounded-[20px]">
                  <Image
                    src={feature.src}
                    alt={feature.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, 80vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                  />
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
              Prêt·e à briller&nbsp;?
            </p>
            <div className="mt-10">
              <p className="display text-6xl text-forest">
                {PRODUCT.price}
                {PRODUCT.currency}
              </p>
              <p className="mt-1 text-forest/70 line-through">
                {PRODUCT.compareAtPrice}
                {PRODUCT.currency}
              </p>
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
