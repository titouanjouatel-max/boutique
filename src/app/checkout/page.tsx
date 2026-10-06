import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck, Snowflake, Truck } from "lucide-react";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { RevealText } from "@/components/RevealText";
import { PRODUCT, SITE, STRIPE_CHECKOUT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Commander | ${SITE.name}`,
};

const isStripeLinkConfigured = !STRIPE_CHECKOUT_URL.includes("REMPLACER_PAR_VOTRE_LIEN");

const perks = [
  { icon: Truck, label: "Livraison rapide" },
  { icon: ShieldCheck, label: "Garantie 30 jours" },
  { icon: Snowflake, label: "Certifié CE" },
];

export default function CheckoutPage() {
  const saving = PRODUCT.compareAtPrice - PRODUCT.price;

  return (
    <>
      <Header />
      <main className="flex-1 bg-paper pb-24 pt-32 sm:pt-40">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Link href="/" className="group inline-flex items-center gap-2 text-sm font-medium text-forest">
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
            Retour à la boutique
          </Link>

          <RevealText
            as="h1"
            immediate
            text={"Finaliser\nvotre commande."}
            className="display display-xl mt-8 text-obsidian"
          />
          <p className="mt-6 max-w-xl text-lg text-charcoal">
            Vous allez être redirigé(e) vers Stripe, notre partenaire de
            paiement sécurisé, pour finaliser votre achat en toute confiance.
          </p>

          {/*
            TODO (STRIPE) : ce bandeau ne s'affiche que parce que STRIPE_CHECKOUT_URL
            n'a pas encore été configuré dans src/lib/constants.ts (ou la variable
            d'environnement NEXT_PUBLIC_STRIPE_CHECKOUT_URL). Il disparaîtra
            automatiquement une fois votre vrai lien Stripe Checkout renseigné.
          */}
          {!isStripeLinkConfigured && (
            <div className="mt-8 rounded-[10px] bg-mist px-5 py-4 text-sm text-forest">
              ⚠️ Lien Stripe Checkout non configuré — remplacez{" "}
              <code className="rounded bg-forest/10 px-1 py-0.5 text-xs">STRIPE_CHECKOUT_URL</code> dans{" "}
              <code className="rounded bg-forest/10 px-1 py-0.5 text-xs">src/lib/constants.ts</code> (ou la
              variable d&apos;env{" "}
              <code className="rounded bg-forest/10 px-1 py-0.5 text-xs">NEXT_PUBLIC_STRIPE_CHECKOUT_URL</code>)
              par votre vrai lien Stripe Payment Link.
            </div>
          )}

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <Reveal y={60}>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[28px] bg-fog sm:aspect-square lg:aspect-auto lg:h-full lg:min-h-[520px]">
                <Image
                  src="/images/checkout-packshot.webp"
                  alt="Packshot du masque LED CRYOLUME™"
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
                />
                <span className="display absolute left-5 top-5 rounded-full bg-forest px-4 py-2 text-xl text-lime">
                  -{saving}
                  {PRODUCT.currency}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={60}>
              <div className="flex h-full flex-col rounded-[28px] bg-forest p-7 sm:p-10">
                <span className="inline-flex w-fit rounded-full bg-lime px-3 py-1.5 text-xs font-semibold text-forest">
                  Votre panier
                </span>
                <h2 className="display display-md mt-6 text-lime">{PRODUCT.name}</h2>
                <p className="mt-3 text-base text-paper/80">
                  Masque LED visage + cou, 7 couleurs &amp; effet cryothérapie · 1 unité
                </p>

                {/* Récapitulatif dans une carte blanche, façon sélecteur Wise. */}
                <div className="mt-8 rounded-[10px] bg-paper p-5">
                  <div className="flex items-center justify-between gap-4 text-charcoal">
                    <span>Sous-total</span>
                    <span className="text-pebble line-through">
                      {PRODUCT.compareAtPrice}
                      {PRODUCT.currency}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-4 text-charcoal">
                    <span>Remise de Noël</span>
                    <span className="font-semibold text-forest">
                      -{saving}
                      {PRODUCT.currency}
                    </span>
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-4 border-t border-fog pt-4">
                    <span className="font-semibold text-obsidian">Total</span>
                    <span className="display text-5xl text-forest">
                      {PRODUCT.price}
                      {PRODUCT.currency}
                    </span>
                  </div>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {perks.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full bg-spruce px-3 py-2 text-sm font-medium text-paper"
                    >
                      <Icon className="h-4 w-4 text-lime" /> {label}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  {/*
                    TODO (STRIPE) : remplacez STRIPE_CHECKOUT_URL (src/lib/constants.ts) par votre
                    vrai lien Stripe Checkout / Payment Link. Une fois configuré, ce bouton redirige
                    directement vers la page de paiement sécurisée hébergée par Stripe.
                    Pour une intégration plus avancée (webhooks, montants dynamiques), créez une
                    Checkout Session côté serveur avec votre clé secrète Stripe dans une Route Handler
                    (app/api/checkout/route.ts) et redirigez vers session.url.
                  */}
                  <Button href={STRIPE_CHECKOUT_URL} external size="lg" arrow className="w-full">
                    Payer {PRODUCT.price}
                    {PRODUCT.currency} avec Stripe
                  </Button>
                  <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-paper/60">
                    <Lock className="h-3.5 w-3.5" />
                    Paiement 100% sécurisé et chiffré · Vos données bancaires ne
                    sont jamais stockées sur nos serveurs.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
