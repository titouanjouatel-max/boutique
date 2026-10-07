import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealText } from "@/components/RevealText";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Politique de remboursement | ${SITE.name}`,
};

// TODO: faites relire cette politique par un professionnel du droit avant mise en ligne réelle.
export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-paper pb-24 pt-32 sm:pt-40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link href="/" className="group inline-flex items-center gap-2 text-sm font-medium text-forest">
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" /> Retour à la boutique
          </Link>

          <RevealText as="h1" immediate text="Politique de remboursement" className="display display-lg mt-8 text-forest" />
          <p className="mt-4 text-sm text-slate">Dernière mise à jour : TODO — indiquer la date</p>

          <div className="mt-12 space-y-10 text-base leading-relaxed text-charcoal">
            <section>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-obsidian">Garantie 30 jours satisfait ou remboursé</h2>
              <p className="mt-2">
                Si vous n&apos;êtes pas entièrement satisfait(e) de votre
                BRAISE™, vous pouvez demander un remboursement dans les 30
                jours suivant la réception de votre commande. TODO : confirmer
                la durée exacte et les conditions (produit non ouvert, etc.)
                selon votre politique réelle.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-obsidian">Comment demander un remboursement</h2>
              <ol className="mt-2 list-decimal space-y-2 pl-5">
                <li>
                  Contactez-nous à{" "}
                  <a href={`mailto:${CONTACT.email}`} className="link-underline font-medium text-forest">
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
              <p className="mt-2 text-slate">TODO : adapter ce processus à votre organisation logistique réelle.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-obsidian">Produits défectueux</h2>
              <p className="mt-2">
                Si votre chauffe-mains BRAISE™ présente un défaut de fabrication,
                il est remplacé ou remboursé gratuitement, frais de retour
                inclus. TODO : préciser les modalités de prise en charge des
                frais de retour selon le cas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-obsidian">Exclusions</h2>
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
