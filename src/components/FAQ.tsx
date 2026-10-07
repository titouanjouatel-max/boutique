"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { RevealText } from "@/components/RevealText";

// Réponses tirées de la notice du fabricant (modèle Q11) et des retours d'acheteurs.
// TODO: adaptez délais de livraison, garantie et retours à votre activité réelle.
const faqs = [
  {
    question: "Combien de temps chauffe-t-il ?",
    answer:
      "Cela dépend du niveau et du froid extérieur. D'après les retours d'utilisateurs, comptez environ 1 h 30 à 2 h au niveau 2, et moins au niveau 3 par grand froid. Il se recharge ensuite en USB.",
  },
  {
    question: "Quelle température atteint-il ?",
    answer:
      "La notice indique environ 45 °C au niveau 1, 50 °C au niveau 2 et 60 °C au niveau 3. La chaleur monte en une trentaine de secondes après l'allumage.",
  },
  {
    question: "Comment le recharger ?",
    answer:
      "Avec le câble USB fourni, sur n'importe quel chargeur 5 V / 1 A. Les voyants bleus clignotent pendant la charge et restent fixes quand la batterie est pleine. La notice indique environ 5 h pour une charge complète.",
  },
  {
    question: "Peut-il vraiment recharger mon téléphone ?",
    answer:
      "Oui, il fait office de petite batterie externe grâce à sa sortie USB 5 V / 1,5 A. Il est pensé pour dépanner, pas pour remplacer une vraie batterie externe de grande capacité.",
  },
  {
    question: "Y a-t-il des précautions d'utilisation ?",
    answer:
      "Si la chaleur devient trop forte, glissez-le dans une poche ou baissez le niveau pour éviter les brûlures. Ne le jetez jamais au feu et rangez-le au sec. Surveillez son usage par les enfants et les personnes peu sensibles à la chaleur.",
  },
  {
    question: "Quel est le délai de livraison ?",
    answer:
      "TODO : indiquez votre délai réel. Les commandes sont expédiées avec un numéro de suivi envoyé par e-mail.",
  },
  {
    question: "Et si je ne suis pas satisfait(e) ?",
    answer:
      "Vous disposez de 30 jours pour nous le retourner et être remboursé(e). Voir notre politique de remboursement pour les conditions.",
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
