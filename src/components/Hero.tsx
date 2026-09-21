"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Snowflake, Truck } from "lucide-react";
import { Button } from "@/components/Button";
import { StarRating } from "@/components/StarRating";
import { PRODUCT } from "@/lib/constants";

const thumbnails = [
  { src: "/images/feature-thin.webp", alt: "CRYOLUME™ ultra-fin et léger" },
  { src: "/images/feature-led.webp", alt: "7 couleurs de photothérapie LED" },
  { src: "/images/feature-waterproof.webp", alt: "CRYOLUME™ étanche IPX7" },
  { src: "/images/feature-ergonomic.webp", alt: "Silicone souple et ergonomique" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
          className="order-2 lg:order-1"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-porcelain px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-ink/60">
            <Snowflake className="h-3.5 w-3.5 text-gold" />
            LED + Cryothérapie
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl lg:text-[3.4rem]">
            Dégonflez votre visage.
            <br />
            Sublimez votre éclat.
            <br />
            <span className="text-gold">En 10 minutes.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
            {PRODUCT.fullName} combine la photothérapie LED (rouge, bleu) et
            un effet froid intense pour dégonfler, raffermir et illuminer
            votre peau — sans injections, sans rendez-vous, chez vous.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/checkout" size="lg">
              Commander maintenant — {PRODUCT.price}
              {PRODUCT.currency}
            </Button>
            <div className="flex items-center gap-3">
              <StarRating rating={PRODUCT.rating} />
              <span className="text-sm text-ink/60">
                {PRODUCT.rating}/5 · {PRODUCT.reviewCount} avis
              </span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-medium uppercase tracking-wide text-ink/50">
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4" /> Livraison rapide
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Garantie 30 jours
            </span>
            <span className="inline-flex items-center gap-2">
              <Snowflake className="h-4 w-4" /> Certifié CE
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="order-1 lg:order-2"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line">
            <Image
              src="/images/hero-main.webp"
              alt="Masque LED CRYOLUME™ porté, effet lumineux rouge"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className="mt-3 grid grid-cols-4 gap-3">
            {thumbnails.map((thumb) => (
              <div
                key={thumb.src}
                className="relative aspect-square overflow-hidden rounded-xl border border-line"
              >
                <Image
                  src={thumb.src}
                  alt={thumb.alt}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
