// Informations produit & boutique — modifiez ces valeurs pour personnaliser le site.

export const SITE = {
  name: "BRAISE",
  tagline: "Chauffe-mains rechargeable",
  domain: "braise.fr", // TODO: remplacer par votre vrai nom de domaine
};

// TODO: prix provisoires — ajustez prix de vente et prix barré.
export const PRODUCT = {
  name: "BRAISE™",
  fullName: "Chauffe-mains rechargeable BRAISE™",
  price: 24.9,
  compareAtPrice: 39.9,
  currency: "€",
};

// Prix au format français : 24,90€
export function formatPrice(value: number) {
  return `${value.toFixed(2).replace(".", ",")}${PRODUCT.currency}`;
}

export const PRICE_LABEL = formatPrice(PRODUCT.price);
export const COMPARE_AT_LABEL = formatPrice(PRODUCT.compareAtPrice);
export const DISCOUNT_PERCENT = Math.round((1 - PRODUCT.price / PRODUCT.compareAtPrice) * 100);

// Caractéristiques issues de la notice du fabricant (modèle Q11).
export const SPECS = {
  levels: [
    { level: 1, temp: 45 },
    { level: 2, temp: 50 },
    { level: 3, temp: 60 },
  ],
  size: "102 × 59 × 24 mm",
  weight: "135 g",
  battery: "Batterie 18650 rechargeable",
  input: "USB 5 V / 1 A",
  output: "USB 5 V / 1,5 A",
  chargeTime: "environ 5 h",
  material: "Alliage d'aluminium + ABS",
  inBox: "Chauffe-mains, câble de charge USB, notice, boîte cadeau",
};

// Coloris proposés par le fournisseur. `metal` = couleur du corps, `shade` = ombre.
export const COLORS = [
  { id: "argent", label: "Argent", metal: "#c9cdd2", shade: "#8e949b" },
  { id: "or", label: "Or", metal: "#e2c27a", shade: "#a8843a" },
  { id: "rose", label: "Rose", metal: "#efb9b9", shade: "#bf7d80" },
  { id: "noir", label: "Noir", metal: "#3a3d40", shade: "#141617" },
] as const;

export type ColorId = (typeof COLORS)[number]["id"];

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
  email: "contact@braise.fr", // TODO: remplacer par votre vraie adresse e-mail
  phone: "+33 1 23 45 67 89", // TODO: remplacer par votre vrai numéro
  address: "12 rue de la Paix, 75002 Paris, France", // TODO: remplacer par votre vraie adresse
};
