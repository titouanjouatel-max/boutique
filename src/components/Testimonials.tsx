import { Quote } from "lucide-react";
import { RevealText } from "@/components/RevealText";
import { StarRating } from "@/components/StarRating";

// TODO: avis d'EXEMPLE — remplacez-les par les vrais avis de vos clients avant la mise en ligne
// (afficher de faux avis comme authentiques est interdit). Le libellé « Avis d'exemple » est
// affiché tant que REVIEWS_ARE_EXAMPLES vaut true.
const REVIEWS_ARE_EXAMPLES = true;

const reviews = [
  {
    name: "Camille",
    location: "Lyon",
    rating: 5,
    text: "Je l'ai dans la poche du manteau tous les matins pour le trajet. Plus besoin de gants pour attendre le tram.",
  },
  {
    name: "Thomas",
    location: "Grenoble",
    rating: 5,
    text: "Indispensable au stade. Le niveau 3 chauffe vraiment, je repasse au 2 au bout d'un moment.",
  },
  {
    name: "Julie",
    location: "Lille",
    rating: 4,
    text: "Joli en rose, tient bien en main. J'aurais aimé un peu plus d'autonomie au niveau max.",
  },
  {
    name: "Nadia",
    location: "Strasbourg",
    rating: 5,
    text: "Offert à ma mère qui a toujours les mains gelées. Elle l'utilise même devant la télé.",
  },
  {
    name: "Hugo",
    location: "Annecy",
    rating: 5,
    text: "Pratique en rando : il m'a dépanné le téléphone quand la batterie est tombée à 5 %.",
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
          <span className="text-sm text-slate">{review.location}{REVIEWS_ARE_EXAMPLES ? " · Avis d'exemple" : ""}</span>
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
          <RevealText text={"Ils l'ont\nadopté."} className="display display-xl text-obsidian" />
        </div>
        <p className="max-w-sm text-lg text-charcoal">
          Au chaud au bureau, au stade ou en balade : ils ne sortent plus
          sans.
          {REVIEWS_ARE_EXAMPLES && (
            <span className="mt-2 block text-sm text-slate">
              Avis d&apos;exemple, à remplacer par ceux de vos clients.
            </span>
          )}
        </p>
      </div>

      <div className="mt-16 space-y-3">
        <ReviewRow items={reviews} direction="left" duration="55s" />
        <ReviewRow items={[...reviews].reverse()} direction="right" duration="65s" />
      </div>
    </section>
  );
}
