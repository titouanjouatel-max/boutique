# BRAISE™ — Boutique e-commerce mono-produit

Landing page ultra-animée (Next.js + Tailwind CSS + Framer Motion) pour vendre
un chauffe-mains rechargeable (galet double face, 3 niveaux de chaleur,
batterie externe USB). Caractéristiques reprises de la notice du fabricant
(modèle Q11) : voir `SPECS` dans `src/lib/constants.ts`.
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
- `src/lib/constants.ts` — informations produit, prix, caractéristiques, coloris, lien Stripe, contact, stock
- `src/components/HandWarmer.tsx` — illustration SVG animée du produit (4 coloris, voyants de niveau)

## Effets au scroll et au survol

| Où | Effet |
|----|-------|
| Global | Défilement fluide (Lenis), curseur suiveur (souris uniquement), rideau d'intro, barre de progression de lecture |
| Header | Se cache en descendant / réapparaît en remontant, pilule de navigation qui glisse au survol + scrollspy, menu mobile en cercle qui s'ouvre |
| Hero | Titre révélé ligne par ligne, mot rotatif dans une pilule lime, visuel qui s'agrandit au scroll, éléments flottants en parallaxe (scroll + souris), CTA magnétique |
| Bandeaux | Deux marquees croisés dont la vitesse et le sens suivent le scroll |
| Chiffres | Compteurs animés à l'apparition, cartes qui s'inversent au survol |
| Produit | Section épinglée : le scroll vertical fait défiler les cartes à l'horizontale (carrousel natif sur mobile), cartes inclinables en 3D |
| Niveaux de chaleur | Onglets segmentés avec défilement automatique, ondes de chaleur, choix du coloris |
| Méthode | Cartes qui s'empilent au scroll |
| Bénéfices | Disque vert qui envahit la carte depuis l'icône au survol |
| Journée d'hiver | Ligne de temps qui se dessine au scroll |
| Avis | Deux rangées défilantes en sens inverse, pause au survol |
| Packs | Cartes de packs (Solo / Duo / Famille) avec économies calculées, sélection animée, lien direct vers la commande |
| Offre | Compte à rebours à chiffres roulants, jauge de stock animée |
| Fin de page | Typographie géante qui glisse au scroll, badge rotatif magnétique, logo du footer lettre par lettre |

Tous les effets respectent `prefers-reduced-motion`.

Astuce : ajoutez `data-cursor="Texte"` sur n'importe quel élément pour que le
curseur affiche une étiquette à son survol.

## À faire avant la mise en ligne (TODO)

- [ ] **Photos produit** : le site utilise une illustration SVG
      (`src/components/HandWarmer.tsx`). Ajoutez vos vraies photos dans
      `public/images/` et remplacez l'illustration là où vous voulez.
- [ ] **Prix et packs** : Solo 24,99€, Duo 44,99€ (-10%), Famille 59,99€ (-20%),
      livraison offerte dès 2. Tout se règle dans `PACK_DEFS` (`src/lib/constants.ts`).
      Les remises sont calculées par rapport au prix unitaire : pas de faux prix barré.
- [ ] **Coloris au paiement** : le coloris choisi n'est pas transmis à Stripe ;
      ajoutez un champ « Coloris » à votre Payment Link.
- [ ] **Délai de livraison** : à indiquer dans la FAQ (`src/components/FAQ.tsx`).
- [ ] **Liens Stripe** : créez un Payment Link par pack, copiez `.env.example`
      en `.env.local` et renseignez `NEXT_PUBLIC_STRIPE_URL_SOLO`, `_DUO` et
      `_FAMILLE`.
- [ ] **Informations produit** : ajuster nom, prix, devise et description
      dans `src/lib/constants.ts`.
- [ ] **Coordonnées** : mettre à jour `CONTACT` (e-mail, téléphone, adresse)
      dans `src/lib/constants.ts`.
- [ ] **Avis clients** : les avis sont des EXEMPLES, affichés avec la mention
      « Avis d'exemple ». Remplacez-les par de vrais avis puis passez
      `REVIEWS_ARE_EXAMPLES` à `false` dans `src/components/Testimonials.tsx`.
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
