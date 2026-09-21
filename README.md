# CRYOLUME™ — Boutique e-commerce mono-produit

Landing page premium (Next.js + Tailwind CSS) pour vendre un masque LED de
photothérapie avec cryothérapie (effet froid anti-gonflement).

## Démarrer

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app/page.tsx` — page d'accueil (assemble toutes les sections)
- `src/app/checkout/page.tsx` — page de commande, redirige vers Stripe Checkout
- `src/app/cgv`, `src/app/politique-de-remboursement`, `src/app/contact` — pages légales
- `src/components/` — sections et composants UI (Hero, FAQ, Urgency, etc.)
- `src/lib/constants.ts` — informations produit, prix, lien Stripe, contact, stock

## À faire avant la mise en ligne (TODO)

- [ ] **Photos produit** : remplacer tous les `<PlaceholderImage />` (Hero,
      Avant/Après, Checkout) par vos vraies photos via `next/image`.
- [ ] **Lien Stripe Checkout** : copier `.env.example` en `.env.local` et
      renseigner `NEXT_PUBLIC_STRIPE_CHECKOUT_URL` avec votre vrai Payment
      Link Stripe (ou modifier `STRIPE_CHECKOUT_URL` dans
      `src/lib/constants.ts`).
- [ ] **Informations produit** : ajuster nom, prix, devise et description
      dans `src/lib/constants.ts`.
- [ ] **Coordonnées** : mettre à jour `CONTACT` (e-mail, téléphone, adresse)
      dans `src/lib/constants.ts`.
- [ ] **Avis clients** : remplacer les témoignages placeholders dans
      `src/components/Testimonials.tsx` par de vrais avis (avec photos si possible).
- [ ] **CGV / politique de remboursement** : faire relire et compléter les
      pages `src/app/cgv` et `src/app/politique-de-remboursement` par un
      professionnel du droit (SIRET, adresse légale, délais réels, etc.).
- [ ] **Réseaux sociaux** : mettre à jour les liens dans `src/components/Footer.tsx`.
- [ ] **Compte à rebours / stock** : ajuster `CHRISTMAS_DEADLINE_ISO` et
      `STOCK` dans `src/lib/constants.ts`.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (animations discrètes au scroll)
- lucide-react (icônes)
