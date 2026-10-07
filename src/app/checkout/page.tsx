import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealText } from "@/components/RevealText";
import { PACKS, SITE, stripeUrlFor } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Commander | ${SITE.name}`,
};

const isStripeLinkConfigured = PACKS.every((pack) => !stripeUrlFor(pack).includes("REMPLACER_PAR_VOTRE_LIEN"));

export default function CheckoutPage() {
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
            TODO (STRIPE) : ce bandeau disparaît automatiquement quand chaque pack
            a un vrai lien Stripe (variables d'env, voir .env.example).
          */}
          {!isStripeLinkConfigured && (
            <div className="mt-8 rounded-[10px] bg-mist px-5 py-4 text-sm text-forest">
              ⚠️ Liens Stripe non configurés — créez un Payment Link par pack et renseignez{" "}
              <code className="rounded bg-forest/10 px-1 py-0.5 text-xs">NEXT_PUBLIC_STRIPE_URL_SOLO</code>,{" "}
              <code className="rounded bg-forest/10 px-1 py-0.5 text-xs">_DUO</code> et{" "}
              <code className="rounded bg-forest/10 px-1 py-0.5 text-xs">_FAMILLE</code> dans{" "}
              <code className="rounded bg-forest/10 px-1 py-0.5 text-xs">.env.local</code> (voir{" "}
              <code className="rounded bg-forest/10 px-1 py-0.5 text-xs">.env.example</code>).
            </div>
          )}

          <Suspense fallback={<div className="mt-12 min-h-[600px] rounded-[28px] bg-fog" />}>
            <CheckoutForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
