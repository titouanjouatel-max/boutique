"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { RevealText } from "@/components/RevealText";

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
    <section id="faq" className="bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="mb-6 inline-flex rounded-full bg-paper px-3 py-2 text-xs font-medium text-forest">
            FAQ
          </span>
          <RevealText text={"Vos\nquestions."} className="display display-xl text-forest" />
          <p className="mt-6 max-w-sm text-lg text-charcoal">
            Une autre question ? Notre équipe vous répond sous 24h ouvrées.
          </p>
          <Button href="/contact" variant="outline" arrow className="mt-8">
            Nous contacter
          </Button>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.question} delay={i * 0.06} y={30}>
                <div
                  className={`overflow-hidden rounded-[10px] transition-colors duration-500 ${
                    isOpen ? "bg-forest" : "bg-paper hover:bg-paper/70"
                  }`}
                >
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span
                      className={`text-lg font-semibold tracking-[-0.01em] transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-1 sm:text-xl ${
                        isOpen ? "text-lime" : "text-forest"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className={`flex h-10 w-10 flex-none items-center justify-center rounded-full transition-colors duration-500 ${
                        isOpen ? "bg-lime text-forest" : "bg-mist text-forest group-hover:bg-lime"
                      }`}
                    >
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-a-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-6 pb-6 text-base leading-relaxed text-paper/80">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
