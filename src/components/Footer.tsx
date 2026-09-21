import Link from "next/link";
import { Globe, Mail, Share2 } from "lucide-react";
import { CONTACT, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-ink text-paper/70">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold text-paper">{SITE.name}</p>
            <p className="mt-3 text-sm leading-relaxed">
              Photothérapie LED &amp; cryothérapie pour un visage dégonflé et
              lumineux, à la maison.
            </p>
            <div className="mt-4 flex gap-3">
              {/* TODO: remplacer par vos vrais liens de réseaux sociaux (Instagram, TikTok, Facebook…) */}
              <a href="#" aria-label="Réseau social" className="text-paper/60 transition-colors hover:text-gold">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Site web" className="text-paper/60 transition-colors hover:text-gold">
                <Globe className="h-5 w-5" />
              </a>
              <a href={`mailto:${CONTACT.email}`} aria-label="E-mail" className="text-paper/60 transition-colors hover:text-gold">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-paper">Boutique</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/#comment-ca-marche" className="hover:text-gold">Comment ça marche</Link></li>
              <li><Link href="/#avis" className="hover:text-gold">Avis clients</Link></li>
              <li><Link href="/#faq" className="hover:text-gold">FAQ</Link></li>
              <li><Link href="/checkout" className="hover:text-gold">Commander</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-paper">Légal</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/cgv" className="hover:text-gold">Conditions générales de vente</Link></li>
              <li><Link href="/politique-de-remboursement" className="hover:text-gold">Politique de remboursement</Link></li>
              <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-paper">Contact</p>
            <ul className="mt-4 space-y-2 text-sm">
              {/* TODO: remplacer par vos vraies coordonnées dans src/lib/constants.ts */}
              <li>{CONTACT.email}</li>
              <li>{CONTACT.phone}</li>
              <li>{CONTACT.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-paper/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. Tous droits réservés.</p>
          <p>Paiement 100% sécurisé via Stripe</p>
        </div>
      </div>
    </footer>
  );
}
