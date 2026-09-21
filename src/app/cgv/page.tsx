import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Conditions générales de vente | ${SITE.name}`,
};

// TODO: faites relire ces CGV par un professionnel du droit avant mise en ligne réelle.
export default function CGVPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-paper pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> Retour à la boutique
          </Link>

          <h1 className="mt-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Conditions générales de vente
          </h1>
          <p className="mt-2 text-sm text-ink/50">Dernière mise à jour : TODO — indiquer la date</p>

          <div className="prose prose-neutral mt-10 max-w-none space-y-8 text-sm leading-relaxed text-ink/75">
            <section>
              <h2 className="font-display text-xl font-semibold text-ink">1. Objet</h2>
              <p className="mt-2">
                Les présentes conditions générales de vente (CGV) régissent les
                relations contractuelles entre {SITE.name} (TODO : indiquer la
                forme juridique, le numéro SIREN/SIRET et l&apos;adresse du
                siège social) et toute personne effectuant un achat via le
                site {SITE.domain}.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink">2. Produits</h2>
              <p className="mt-2">
                Le site propose à la vente le masque LED de cryo-photothérapie
                CRYOLUME™. Les photos et descriptions du produit sont fournies
                à titre indicatif. TODO : compléter avec les caractéristiques
                techniques précises et certifications (CE, etc.).
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink">3. Prix et paiement</h2>
              <p className="mt-2">
                Les prix sont indiqués en euros, toutes taxes comprises. Le
                paiement est traité de manière sécurisée par Stripe. TODO :
                préciser les moyens de paiement acceptés et les modalités de
                facturation.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink">4. Livraison</h2>
              <p className="mt-2">
                TODO : préciser les zones de livraison, les délais indicatifs,
                les transporteurs utilisés et les frais de port éventuels.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink">5. Droit de rétractation</h2>
              <p className="mt-2">
                Conformément à la législation en vigueur, vous disposez d&apos;un
                délai de 14 jours à compter de la réception de votre commande
                pour exercer votre droit de rétractation. Voir notre{" "}
                <Link href="/politique-de-remboursement" className="text-gold underline">
                  politique de remboursement
                </Link>
                . TODO : faire valider ce délai et les exceptions applicables
                par un professionnel du droit.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink">6. Garantie</h2>
              <p className="mt-2">
                Le produit bénéficie d&apos;une garantie légale de conformité et
                d&apos;une garantie commerciale de 12 mois contre tout défaut de
                fabrication. TODO : détailler les modalités de mise en œuvre
                de la garantie.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink">7. Contact</h2>
              <p className="mt-2">
                Pour toute question relative à ces CGV, contactez-nous à{" "}
                <a href={`mailto:${CONTACT.email}`} className="text-gold underline">
                  {CONTACT.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
