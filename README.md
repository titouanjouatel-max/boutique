# CRYOLUME™ — Boutique e-commerce mono-produit

Landing page ultra-animée (Next.js + Tailwind CSS + Framer Motion) pour vendre
un masque LED de photothérapie avec cryothérapie (effet froid anti-gonflement).
Direction artistique inspirée de Wise : vert forêt `#163300` dominant, lime
électrique `#9fe870` en ponctuation, titres massifs en Inter 900, formes en pilule.

## Démarrer

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app/page.tsx` — page d'accueil (assemble toutes les sections)
- `src/app/globals.css` — tokens de couleur, typographie d'affichage, utilitaires d'animation
- `src/app/checkout/page.tsx` — page de commande, redirige vers Stripe Checkout
- `src/app/cgv`, `src/app/politique-de-remboursement`, `src/app/contact` — pages légales
- `src/components/` — sections et composants UI
- `src/lib/constants.ts` — informations produit, prix, lien Stripe, contact, stock

## Effets au scroll et au survol

| Où | Effet |
|----|-------|
| Global | Défilement fluide (Lenis), curseur suiveur (souris uniquement), rideau d'intro, barre de progression de lecture |
| Header | Se cache en descendant / réapparaît en remontant, pilule de navigation qui glisse au survol + scrollspy, menu mobile en cercle qui s'ouvre |
| Hero | Titre révélé ligne par ligne, mot rotatif dans une pilule lime, visuel qui s'agrandit au scroll, éléments flottants en parallaxe (scroll + souris), CTA magnétique |
| Bandeaux | Deux marquees croisés dont la vitesse et le sens suivent le scroll |
| Chiffres | Compteurs animés à l'apparition, cartes qui s'inversent au survol |
| Produit | Section épinglée : le scroll vertical fait défiler les cartes à l'horizontale (carrousel natif sur mobile), cartes inclinables en 3D |
| Modes LED | Onglets segmentés avec défilement automatique, ondes lumineuses et teinte de la couleur choisie |
| Méthode | Cartes qui s'empilent au scroll |
| Bénéfices | Disque vert qui envahit la carte depuis l'icône au survol |
| Résultats | Ligne de temps qui se dessine au scroll |
| Avis | Deux rangées défilantes en sens inverse, pause au survol |
| Offre | Compte à rebours à chiffres roulants, jauge de stock animée |
| Fin de page | Typographie géante qui glisse au scroll, badge rotatif magnétique, logo du footer lettre par lettre |

Tous les effets respectent `prefers-reduced-motion`.

Astuce : ajoutez `data-cursor="Texte"` sur n'importe quel élément pour que le
curseur affiche une étiquette à son survol.

## À faire avant la mise en ligne (TODO)

- [ ] **Photos avant/après** : la section « Résultats » est une ligne de temps
      sans photo ; ajoutez vos vraies photos clients (avec autorisation) si
      vous en avez (`src/components/Results.tsx`).
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
- Framer Motion (animations au scroll et au survol)
- Lenis (défilement fluide)
- lucide-react (icônes)
