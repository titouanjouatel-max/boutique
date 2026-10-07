"use client";

import { Lock, RotateCcw, Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Magnetic } from "@/components/Magnetic";
import { PackSelector } from "@/components/PackSelector";
import { Reveal } from "@/components/Reveal";
import { RevealText } from "@/components/RevealText";
import { DEFAULT_PACK_ID, MAX_SAVING_PERCENT, PACKS, formatPrice, type PackId } from "@/lib/constants";

export function Packs() {
  const [packId, setPackId] = useState<PackId>(DEFAULT_PACK_ID);
  const pack = PACKS.find((p) => p.id === packId) ?? PACKS[0];

  return (
    <section id="packs" className="bg-fog py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="mb-6 inline-flex rounded-full bg-forest px-3 py-2 text-xs font-medium text-lime">
              Jusqu&apos;à -{MAX_SAVING_PERCENT}% en pack
            </span>
            <RevealText text={"Plus on est,\nmoins c'est cher."} className="display display-lg text-obsidian" />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-lg text-charcoal">
              Un pour vous, un pour offrir, un pour la voiture : les packs font
              baisser le prix de chaque chauffe-mains.
            </p>
          </Reveal>
        </div>

        <Reveal y={60} className="mt-14">
          <PackSelector name="home-pack" value={packId} onChange={setPackId} />
        </Reveal>

        <div className="mt-10 flex flex-col items-center gap-6">
          <Magnetic>
            <Button href={`/checkout?pack=${pack.id}`} size="lg" arrow>
              Commander le pack {pack.name} — {formatPrice(pack.price)}
            </Button>
          </Magnetic>
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm font-medium text-slate">
            <li className="inline-flex items-center gap-2"><Lock className="h-4 w-4 text-forest" /> Paiement sécurisé</li>
            <li className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-forest" /> Livraison offerte dès 2</li>
            <li className="inline-flex items-center gap-2"><RotateCcw className="h-4 w-4 text-forest" /> Retour 30 jours</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
