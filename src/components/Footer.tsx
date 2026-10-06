import { Globe, Mail, Share2 } from "lucide-react";
import { AnchorLink } from "@/components/AnchorLink";
import { Button } from "@/components/Button";
import { FooterWordmark } from "@/components/FooterWordmark";
import { CONTACT, PRODUCT, SITE } from "@/lib/constants";

const shop = [
  { href: "/#produit", label: "Le produit" },
  { href: "/#comment-ca-marche", label: "Comment ça marche" },
  { href: "/#avis", label: "Avis clients" },
  { href: "/#faq", label: "FAQ" },
  { href: "/checkout", label: "Commander" },
];

const legal = [
  { href: "/cgv", label: "Conditions générales de vente" },
  { href: "/politique-de-remboursement", label: "Politique de remboursement" },
  { href: "/contact", label: "Contact" },
];

// TODO: remplacer par vos vrais liens de réseaux sociaux (Instagram, TikTok, Facebook…)
const socials = [
  { href: "#", label: "Réseau social", icon: Share2 },
  { href: "#", label: "Site web", icon: Globe },
  { href: `mailto:${CONTACT.email}`, label: "E-mail", icon: Mail },
];

export function Footer() {
  return (
    <footer className="bg-forest text-paper/70">
      <div className="mx-auto max-w-[1200px] px-4 pt-20 sm:px-6">
        <div className="flex flex-col justify-between gap-8 border-b border-spruce pb-14 lg:flex-row lg:items-end">
          <p className="display display-md max-w-xl text-lime">
            Un visage reposé, chaque matin.
          </p>
          <Button href="/checkout" variant="light" size="lg" arrow className="self-start lg:self-auto">
            Commander — {PRODUCT.price}
            {PRODUCT.currency}
          </Button>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-base font-semibold text-paper">{SITE.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed">
              Photothérapie LED &amp; cryothérapie pour un visage dégonflé et
              lumineux, à la maison.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-spruce text-lime transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:rotate-12 hover:bg-lime hover:text-forest"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-paper">Boutique</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {shop.map((link) => (
                <li key={link.href}>
                  <AnchorLink href={link.href} className="link-reveal transition-colors hover:text-lime">
                    {link.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-paper">Légal</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legal.map((link) => (
                <li key={link.href}>
                  <AnchorLink href={link.href} className="link-reveal transition-colors hover:text-lime">
                    {link.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-paper">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {/* TODO: remplacer par vos vraies coordonnées dans src/lib/constants.ts */}
              <li>
                <a href={`mailto:${CONTACT.email}`} className="link-reveal hover:text-lime">
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.phone}</li>
              <li>{CONTACT.address}</li>
            </ul>
          </div>
        </div>

        <FooterWordmark />

        <div className="flex flex-col items-center justify-between gap-3 border-t border-spruce py-6 text-xs text-paper/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Tous droits réservés.
          </p>
          <p>Paiement 100% sécurisé via Stripe</p>
        </div>
      </div>
    </footer>
  );
}
