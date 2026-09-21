"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

// TODO: adaptez les réponses (délais de livraison, zones desservies, durée de garantie réelle) à votre activité.
const faqs = [
  {
    question: "Quel est le délai de livraison ?",
    answer:
      "Vos commandes sont expédiées sous 24 à 48h et livrées en 3 à 5 jours ouvrés en France métropolitaine. Un e-mail de suivi vous est envoyé dès l'expédition.",
  },
  {
    question: "Quelle garantie proposez-vous ?",
    answer:
      "CRYOLUME™ est couvert par une garantie satisfait ou remboursé de 30 jours, ainsi qu'une garantie fabricant de 12 mois contre tout défaut technique.",
  },
  {
    question: "Le masque est-il sûr pour ma peau et mes yeux ?",
    answer:
      "Oui. Le masque utilise des LED basse intensité certifiées CE, sans UV, et intègre une protection oculaire. Il est déconseillé aux femmes enceintes, aux épileptiques et aux porteurs de pacemaker — consultez un professionnel de santé en cas de doute.",
  },
  {
    question: "Combien de temps par jour dois-je l'utiliser ?",
    answer:
      "Une séance de 10 à 15 minutes par jour est recommandée. Les premiers effets sur le gonflement sont visibles dès la première utilisation, les résultats anti-âge après 3 à 4 semaines.",
  },
  {
    question: "Comment entretenir mon masque ?",
    answer:
      "Nettoyez la surface en contact avec la peau avec un chiffon doux et sec (ou légèrement humide) après chaque utilisation. Ne pas immerger l'appareil dans l'eau.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-porcelain py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Questions fréquentes
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            FAQ
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.question} delay={i * 0.05}>
                <div className="overflow-hidden rounded-xl border border-line bg-paper">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-medium text-ink">{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 flex-none text-ink/50 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm leading-relaxed text-ink/65">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
