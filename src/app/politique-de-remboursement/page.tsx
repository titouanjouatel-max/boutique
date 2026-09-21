import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Politique de remboursement | ${SITE.name}`,
};

// TODO: faites relire cette politique par un professionnel du droit avant mise en ligne réelle.
export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-paper pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> Retour à la boutique
          </Link>

          <h1 className="mt-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Politique de remboursement
          </h1>
          <p className="mt-2 text-sm text-ink/50">Dernière mise à jour : TODO — indiquer la date</p>

          <div className="prose prose-neutral mt-10 max-w-none space-y-8 text-sm leading-relaxed text-ink/75">
            <section>
              <h2 className="font-display text-xl font-semibold text-ink">Garantie 30 jours satisfait ou remboursé</h2>
              <p className="mt-2">
                Si vous n&apos;êtes pas entièrement satisfait(e) de votre
                CRYOLUME™, vous pouvez demander un remboursement dans les 30
                jours suivant la réception de votre commande. TODO : confirmer
                la durée exacte et les conditions (produit non ouvert, etc.)
                selon votre politique réelle.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink">Comment demander un remboursement</h2>
              <ol className="mt-2 list-decimal space-y-2 pl-5">
                <li>
                  Contactez-nous à{" "}
                  <a href={`mailto:${CONTACT.email}`} className="text-gold underline">
                    {CONTACT.email}
                  </a>{" "}
                  avec votre numéro de commande.
                </li>
                <li>Nous vous communiquons les modalités de retour du produit.</li>
                <li>
                  Une fois le retour reçu et vérifié, le remboursement est
                  effectué sur votre moyen de paiement d&apos;origine dans un
                  délai de 5 à 10 jours ouvrés.
                </li>
              </ol>
              <p className="mt-2 text-ink/50">TODO : adapter ce processus à votre organisation logistique réelle.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink">Produits défectueux</h2>
              <p className="mt-2">
                Si votre masque CRYOLUME™ présente un défaut de fabrication,
                il est remplacé ou remboursé gratuitement, frais de retour
                inclus. TODO : préciser les modalités de prise en charge des
                frais de retour selon le cas.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink">Exclusions</h2>
              <p className="mt-2">
                Ne sont pas remboursables : les produits endommagés par une
                mauvaise utilisation, ou dont le sceau d&apos;hygiène a été
                retiré au-delà du délai légal. TODO : détailler les exclusions
                applicables à votre activité.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
