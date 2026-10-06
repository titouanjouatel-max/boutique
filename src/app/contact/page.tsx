import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealText } from "@/components/RevealText";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact | ${SITE.name}`,
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-paper pb-24 pt-32 sm:pt-40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link href="/" className="group inline-flex items-center gap-2 text-sm font-medium text-forest">
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" /> Retour à la boutique
          </Link>

          <RevealText as="h1" immediate text="Contactez-nous" className="display display-lg mt-8 text-forest" />
          <p className="mt-6 text-lg text-charcoal">
            Une question sur votre commande, le produit ou une livraison ?
            Notre équipe vous répond sous 24h ouvrées.
          </p>

          {/* TODO: remplacer ces coordonnées par vos vraies informations dans src/lib/constants.ts */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="group flex flex-col items-center gap-4 rounded-[28px] bg-fog p-8 text-center transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:bg-mist"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-lime transition-transform duration-500 ease-out-expo group-hover:rotate-12"><Mail className="h-6 w-6" /></span>
              <div>
                <p className="text-base font-semibold text-obsidian">E-mail</p>
                <p className="mt-1 text-sm text-slate">{CONTACT.email}</p>
              </div>
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="group flex flex-col items-center gap-4 rounded-[28px] bg-fog p-8 text-center transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:bg-mist"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-lime transition-transform duration-500 ease-out-expo group-hover:rotate-12"><Phone className="h-6 w-6" /></span>
              <div>
                <p className="text-base font-semibold text-obsidian">Téléphone</p>
                <p className="mt-1 text-sm text-slate">{CONTACT.phone}</p>
              </div>
            </a>
            <div className="flex flex-col items-center gap-4 rounded-[28px] bg-fog p-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-lime transition-transform duration-500 ease-out-expo group-hover:rotate-12"><MapPin className="h-6 w-6" /></span>
              <div>
                <p className="text-base font-semibold text-obsidian">Adresse</p>
                <p className="mt-1 text-sm text-slate">{CONTACT.address}</p>
              </div>
            </div>
          </div>

          <p className="mt-12 text-sm text-slate">
            {SITE.name} — {SITE.tagline}. Voir aussi nos{" "}
            <Link href="/cgv" className="link-underline text-forest">CGV</Link> et notre{" "}
            <Link href="/politique-de-remboursement" className="link-underline text-forest">
              politique de remboursement
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
