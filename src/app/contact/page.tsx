import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact | ${SITE.name}`,
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-paper pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> Retour à la boutique
          </Link>

          <h1 className="mt-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Contactez-nous
          </h1>
          <p className="mt-4 text-ink/70">
            Une question sur votre commande, le produit ou une livraison ?
            Notre équipe vous répond sous 24h ouvrées.
          </p>

          {/* TODO: remplacer ces coordonnées par vos vraies informations dans src/lib/constants.ts */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-porcelain p-6 text-center transition-colors hover:border-gold"
            >
              <Mail className="h-6 w-6 text-gold" />
              <div>
                <p className="text-sm font-semibold text-ink">E-mail</p>
                <p className="mt-1 text-sm text-ink/60">{CONTACT.email}</p>
              </div>
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-porcelain p-6 text-center transition-colors hover:border-gold"
            >
              <Phone className="h-6 w-6 text-gold" />
              <div>
                <p className="text-sm font-semibold text-ink">Téléphone</p>
                <p className="mt-1 text-sm text-ink/60">{CONTACT.phone}</p>
              </div>
            </a>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-porcelain p-6 text-center">
              <MapPin className="h-6 w-6 text-gold" />
              <div>
                <p className="text-sm font-semibold text-ink">Adresse</p>
                <p className="mt-1 text-sm text-ink/60">{CONTACT.address}</p>
              </div>
            </div>
          </div>

          <p className="mt-10 text-xs text-ink/40">
            {SITE.name} — {SITE.tagline}. Voir aussi nos{" "}
            <Link href="/cgv" className="underline hover:text-gold">CGV</Link> et notre{" "}
            <Link href="/politique-de-remboursement" className="underline hover:text-gold">
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
