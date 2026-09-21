import { Reveal } from "@/components/Reveal";
import { StarRating } from "@/components/StarRating";

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

function Avatar({ name }: { name: string }) {
  const initial = name.charAt(0);
  return (
    // TODO: remplacer par une vraie photo cliente (avec autorisation) via next/image
    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-paper">
      {initial}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Ils l&apos;ont testé
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Ce que nos clientes en disent
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={(i % 3) * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-porcelain p-6">
                <StarRating rating={review.rating} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/75">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar name={review.name} />
                  <div>
                    <p className="text-sm font-semibold text-ink">{review.name}</p>
                    <p className="text-xs text-ink/50">{review.location} · Achat vérifié</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
