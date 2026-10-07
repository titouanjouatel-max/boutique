// Informations produit & boutique — modifiez ces valeurs pour personnaliser le site.

export const SITE = {
  name: "BRAISE",
  tagline: "Chauffe-mains rechargeable",
  domain: "braise.fr", // TODO: remplacer par votre vrai nom de domaine
};

export const PRODUCT = {
  name: "BRAISE™",
  fullName: "Chauffe-mains rechargeable BRAISE™",
  currency: "€",
};

// Prix au format français : 24,99€
export function formatPrice(value: number) {
  return `${value.toFixed(2).replace(".", ",")}${PRODUCT.currency}`;
}

// Packs par quantité : la remise grandit avec la quantité, le pack du milieu est mis en avant.
// Les économies sont calculées par rapport à l'achat à l'unité (pas de faux prix barré).
// TODO (STRIPE) : créez un Payment Link par pack et renseignez les variables d'env ci-dessous.
export const UNIT_PRICE = 24.99;

const PACK_DEFS = [
  {
    id: "solo",
    name: "Solo",
    quantity: 1,
    price: 24.99,
    tagline: "Pour vous",
    badge: null,
    freeShipping: false, // TODO: frais de port réels pour 1 unité
    stripeUrl: process.env.NEXT_PUBLIC_STRIPE_URL_SOLO,
  },
  {
    id: "duo",
    name: "Duo",
    quantity: 2,
    price: 44.99,
    tagline: "Un pour vous, un à offrir",
    badge: "Le plus choisi",
    freeShipping: true,
    stripeUrl: process.env.NEXT_PUBLIC_STRIPE_URL_DUO,
  },
  {
    id: "famille",
    name: "Famille",
    quantity: 3,
    price: 59.99,
    tagline: "Toute la famille au chaud",
    badge: "Meilleur prix",
    freeShipping: true,
    stripeUrl: process.env.NEXT_PUBLIC_STRIPE_URL_FAMILLE,
  },
] as const;

export const PACKS = PACK_DEFS.map((pack) => {
  const fullPrice = UNIT_PRICE * pack.quantity;
  return {
    ...pack,
    perUnit: pack.price / pack.quantity,
    saving: fullPrice - pack.price,
    savingPercent: Math.round((1 - pack.price / fullPrice) * 100),
  };
});

export type Pack = (typeof PACKS)[number];
export type PackId = Pack["id"];
export const DEFAULT_PACK_ID: PackId = "duo";

export const PRICE_LABEL = formatPrice(UNIT_PRICE);
export const MAX_SAVING_PERCENT = Math.max(...PACKS.map((p) => p.savingPercent));
export const LOWEST_UNIT_LABEL = formatPrice(Math.min(...PACKS.map((p) => p.perUnit)));

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

// TODO: Stripe — lien utilisé pour les packs qui n'ont pas encore leur propre Payment Link
// (Stripe Dashboard > Payment links). Définissez les variables dans .env.local.
export const STRIPE_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL ||
  "https://buy.stripe.com/REMPLACER_PAR_VOTRE_LIEN_STRIPE";

export function stripeUrlFor(pack: Pack) {
  return pack.stripeUrl || STRIPE_CHECKOUT_URL;
}

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
