// Informations produit & boutique — modifiez ces valeurs pour personnaliser le site.

export const SITE = {
  name: "CRYOLUME",
  tagline: "Masque LED Cryo-Photothérapie",
  domain: "cryolume.fr", // TODO: remplacer par votre vrai nom de domaine
};

export const PRODUCT = {
  name: "CRYOLUME™",
  fullName: "Masque LED Cryo-Photothérapie CRYOLUME™",
  price: 129,
  compareAtPrice: 219,
  currency: "€",
  rating: 4.8,
  reviewCount: 312,
};

// TODO: Stripe — remplacez cette URL par votre vrai lien Stripe Checkout
// (Stripe Dashboard > Payment links, ou une session Checkout créée côté serveur).
// Vous pouvez aussi définir NEXT_PUBLIC_STRIPE_CHECKOUT_URL dans un fichier .env.local
// pour ne pas modifier le code source.
export const STRIPE_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL ||
  "https://buy.stripe.com/REMPLACER_PAR_VOTRE_LIEN_STRIPE";

// TODO: Compte à rebours — ajustez la date limite de l'offre de Noël si besoin.
export const CHRISTMAS_DEADLINE_ISO = "2026-12-25T00:00:00";

// TODO: Stock — remplacez par votre vrai niveau de stock (ou branchez-le sur votre backend).
export const STOCK = {
  remaining: 37,
  total: 200,
};

export const CONTACT = {
  email: "contact@cryolume.fr", // TODO: remplacer par votre vraie adresse e-mail
  phone: "+33 1 23 45 67 89", // TODO: remplacer par votre vrai numéro
  address: "12 rue de la Paix, 75002 Paris, France", // TODO: remplacer par votre vraie adresse
};
