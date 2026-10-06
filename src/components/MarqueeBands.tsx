import { Snowflake, Sparkle } from "lucide-react";
import { VelocityMarquee } from "@/components/VelocityMarquee";

const top = ["Livraison rapide", "Garantie 30 jours", "Certifié CE", "Paiement sécurisé"];
const bottom = ["7 couleurs LED", "Effet cryo", "Visage + cou", "Ultra-fin 3 mm", "Étanche IPX7"];

// Deux bandeaux qui se croisent, entraînés par la vitesse de scroll.
export function MarqueeBands() {
  return (
    <section aria-label="Nos engagements" className="relative py-10 sm:py-16">
      <div className="relative z-10 -mx-[5%] -rotate-[3deg] bg-forest py-4 sm:py-5">
        <VelocityMarquee baseVelocity={-2.5}>
          {top.map((item) => (
            <span key={item} className="display flex items-center gap-6 pr-6 pt-[0.14em] text-[clamp(1.75rem,4.2vw,3.5rem)] text-lime">
              {item}
              <Snowflake className="h-[0.7em] w-[0.7em] flex-none" strokeWidth={2.5} />
            </span>
          ))}
        </VelocityMarquee>
      </div>
      <div className="relative -mx-[5%] -mt-6 rotate-[2deg] bg-mist py-4 sm:-mt-8 sm:py-5">
        <VelocityMarquee baseVelocity={2}>
          {bottom.map((item) => (
            <span key={item} className="display flex items-center gap-6 pr-6 pt-[0.14em] text-[clamp(1.75rem,4.2vw,3.5rem)] text-forest">
              {item}
              <Sparkle className="h-[0.7em] w-[0.7em] flex-none fill-forest" />
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}
