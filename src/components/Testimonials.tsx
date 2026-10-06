import { Quote } from "lucide-react";
import { RevealText } from "@/components/RevealText";
import { StarRating } from "@/components/StarRating";
import { PRODUCT, RATING_LABEL } from "@/lib/constants";

// TODO: remplacer les avis ci-dessous par vos vrais témoignages clients (texte, prénom, note, photo).
const reviews = [
  {
    name: "Camille D.",
    location: "Lyon",
    rating: 5,
    text: "Dès la première utilisation, mes poches sous les yeux avaient disparu. L'effet froid est incroyable au réveil.",
  },
  {
    name: "Sophie M.",
    location: "Paris",
    rating: 5,
    text: "Mon teint est beaucoup plus lumineux après 3 semaines. Le rituel du soir est devenu un vrai moment détente.",
  },
  {
    name: "Julie R.",
    location: "Bordeaux",
    rating: 4,
    text: "Facile à utiliser, confortable, et les résultats sur mes rides d'expression sont vraiment visibles.",
  },
  {
    name: "Nadia K.",
    location: "Lille",
    rating: 5,
    text: "J'étais sceptique mais le combo LED + froid change vraiment la texture de la peau. Je recommande à 100%.",
  },
  {
    name: "Élodie T.",
    location: "Nantes",
    rating: 5,
    text: "Livraison rapide, masque premium et surtout efficace contre mon acné hormonale. Un vrai coup de cœur.",
  },
];

function ReviewCard({ review, tilt }: { review: (typeof reviews)[number]; tilt: string }) {
  return (
    <figure
      className={`group mx-2 flex w-[300px] flex-none flex-col rounded-[28px] bg-fog p-7 transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:bg-mist sm:mx-3 sm:w-[360px] ${tilt}`}
    >
      <div className="flex items-center justify-between">
        <StarRating rating={review.rating} />
        <Quote className="h-7 w-7 text-forest/20 transition-all duration-500 group-hover:rotate-12 group-hover:text-forest" />
      </div>
      <blockquote className="mt-5 flex-1 text-lg leading-snug text-obsidian">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {/* TODO: remplacer par une vraie photo cliente (avec autorisation) via next/image */}
        <span className="display flex h-11 w-11 flex-none items-center justify-center rounded-full bg-forest text-lg text-lime transition-transform duration-500 group-hover:scale-110">
          {review.name.charAt(0)}
        </span>
        <span>
          <span className="block text-base font-semibold text-obsidian">{review.name}</span>
          <span className="text-sm text-slate">{review.location} · Achat vérifié</span>
        </span>
      </figcaption>
    </figure>
  );
}

function ReviewRow({ items, direction, duration }: { items: typeof reviews; direction: "left" | "right"; duration: string }) {
  return (
    <div className="marquee-group flex overflow-hidden py-3">
      <div
        className="marquee-track"
        data-direction={direction}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {[0, 1].map((copy) =>
          items.map((review, i) => (
            <div key={`${copy}-${review.name}`} aria-hidden={copy > 0}>
              <ReviewCard review={review} tilt={i % 2 === 0 ? "hover:-rotate-1" : "hover:rotate-1"} />
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="avis" className="overflow-hidden bg-paper py-24 lg:py-32">
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-end">
        <div>
          <span className="mb-6 inline-flex rounded-full bg-mist px-3 py-2 text-xs font-medium text-forest">
            Avis clients
          </span>
          <RevealText text={"Elles l'ont\nadopté."} className="display display-xl text-obsidian" />
        </div>
        <div className="flex items-center gap-5 rounded-[28px] bg-forest p-6 pr-8">
          <p className="display text-7xl text-lime">{RATING_LABEL}</p>
          <div>
            <StarRating rating={PRODUCT.rating} tone="lime" size={18} />
            <p className="mt-2 text-sm text-paper/80">
              Note moyenne sur {PRODUCT.reviewCount} avis
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-3">
        <ReviewRow items={reviews} direction="left" duration="55s" />
        <ReviewRow items={[...reviews].reverse()} direction="right" duration="65s" />
      </div>
    </section>
  );
}
