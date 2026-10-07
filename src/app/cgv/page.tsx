import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealText } from "@/components/RevealText";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Conditions générales de vente | ${SITE.name}`,
};

// TODO: faites relire ces CGV par un professionnel du droit avant mise en ligne réelle.
export default function CGVPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-paper pb-24 pt-32 sm:pt-40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link href="/" className="group inline-flex items-center gap-2 text-sm font-medium text-forest">
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" /> Retour à la boutique
          </Link>

          <RevealText as="h1" immediate text="Conditions générales de vente" className="display display-lg mt-8 text-forest" />
          <p className="mt-4 text-sm text-slate">Dernière mise à jour : TODO — indiquer la date</p>

          <div className="mt-12 space-y-10 text-base leading-relaxed text-charcoal">
            <section>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-obsidian">1. Objet</h2>
              <p className="mt-2">
                Les présentes conditions générales de vente (CGV) régissent les
                relations contractuelles entre {SITE.name} (TODO : indiquer la
                forme juridique, le numéro SIREN/SIRET et l&apos;adresse du
                siège social) et toute personne effectuant un achat via le
                site {SITE.domain}.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-obsidian">2. Produits</h2>
              <p className="mt-2">
                Le site propose à la vente le chauffe-mains rechargeable
                BRAISE™. Les photos et descriptions du produit sont fournies
                à titre indicatif. TODO : compléter avec les caractéristiques
                techniques précises et certifications (CE, etc.).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-obsidian">3. Prix et paiement</h2>
              <p className="mt-2">
                Les prix sont indiqués en euros, toutes taxes comprises. Le
                paiement est traité de manière sécurisée par Stripe. TODO :
                préciser les moyens de paiement acceptés et les modalités de
                facturation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-obsidian">4. Livraison</h2>
              <p className="mt-2">
                TODO : préciser les zones de livraison, les délais indicatifs,
                les transporteurs utilisés et les frais de port éventuels.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-obsidian">5. Droit de rétractation</h2>
              <p className="mt-2">
                Conformément à la législation en vigueur, vous disposez d&apos;un
                délai de 14 jours à compter de la réception de votre commande
                pour exercer votre droit de rétractation. Voir notre{" "}
                <Link href="/politique-de-remboursement" className="link-underline font-medium text-forest">
                  politique de remboursement
                </Link>
                . TODO : faire valider ce délai et les exceptions applicables
                par un professionnel du droit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-obsidian">6. Garantie</h2>
              <p className="mt-2">
                Le produit bénéficie d&apos;une garantie légale de conformité et
                d&apos;une garantie commerciale de 12 mois contre tout défaut de
                fabrication. TODO : détailler les modalités de mise en œuvre
                de la garantie.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-obsidian">7. Contact</h2>
              <p className="mt-2">
                Pour toute question relative à ces CGV, contactez-nous à{" "}
                <a href={`mailto:${CONTACT.email}`} className="link-underline font-medium text-forest">
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
