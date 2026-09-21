import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck, Truck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { PRODUCT, SITE, STRIPE_CHECKOUT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Commander | ${SITE.name}`,
};

const isStripeLinkConfigured = !STRIPE_CHECKOUT_URL.includes("REMPLACER_PAR_VOTRE_LIEN");

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-paper pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> Retour à la boutique
          </Link>

          <h1 className="mt-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Finaliser votre commande
          </h1>
          <p className="mt-3 text-ink/70">
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
            <div className="mt-6 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ink/80">
              ⚠️ Lien Stripe Checkout non configuré — remplacez{" "}
              <code className="rounded bg-ink/10 px-1 py-0.5 text-xs">
                STRIPE_CHECKOUT_URL
              </code>{" "}
              dans <code className="rounded bg-ink/10 px-1 py-0.5 text-xs">src/lib/constants.ts</code>{" "}
              (ou la variable d&apos;env <code className="rounded bg-ink/10 px-1 py-0.5 text-xs">NEXT_PUBLIC_STRIPE_CHECKOUT_URL</code>) par votre vrai lien Stripe Payment Link.
            </div>
          )}

          <div className="mt-10 grid gap-6 rounded-2xl border border-line bg-porcelain p-6 sm:grid-cols-[160px_1fr] sm:p-8">
            {/* TODO: remplacer par une vraie photo packshot du produit */}
            <PlaceholderImage label="Packshot CRYOLUME™" ratio="aspect-square" />

            <div className="flex flex-col">
              <h2 className="font-display text-xl font-semibold text-ink">
                {PRODUCT.fullName}
              </h2>
              <p className="mt-1 text-sm text-ink/60">
                Masque LED rouge &amp; bleu + effet cryothérapie · 1 unité
              </p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-2xl font-semibold text-ink">
                  {PRODUCT.price}
                  {PRODUCT.currency}
                </span>
                <span className="text-sm text-ink/40 line-through">
                  {PRODUCT.compareAtPrice}
                  {PRODUCT.currency}
                </span>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 text-xs font-medium uppercase tracking-wide text-ink/50">
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5" /> Livraison rapide
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" /> Garantie 30 jours
                </span>
              </div>
            </div>
          </div>

          {/*
            TODO (STRIPE) : remplacez STRIPE_CHECKOUT_URL (src/lib/constants.ts) par votre
            vrai lien Stripe Checkout / Payment Link. Une fois configuré, ce bouton redirige
            directement vers la page de paiement sécurisée hébergée par Stripe.
            Pour une intégration plus avancée (webhooks, montants dynamiques), créez une
            Checkout Session côté serveur avec votre clé secrète Stripe dans une Route Handler
            (app/api/checkout/route.ts) et redirigez vers session.url.
          */}
          <a
            href={STRIPE_CHECKOUT_URL}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-semibold text-paper transition-colors hover:bg-gold hover:text-ink"
          >
            <Lock className="h-4 w-4" />
            Payer {PRODUCT.price}
            {PRODUCT.currency} avec Stripe
          </a>

          <p className="mt-4 text-center text-xs text-ink/40">
            Paiement 100% sécurisé et chiffré · Vos données bancaires ne sont
            jamais stockées sur nos serveurs.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
