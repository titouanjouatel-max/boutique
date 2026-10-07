"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { Flame } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { AnchorLink } from "@/components/AnchorLink";
import { Button } from "@/components/Button";
import { CONTACT, PRICE_LABEL, SITE } from "@/lib/constants";
import { lockScroll, scrollToTarget } from "@/lib/scroll";

const NAV = [
  { id: "produit", label: "Produit" },
  { id: "comment-ca-marche", label: "Méthode" },
  { id: "packs", label: "Packs" },
  { id: "avis", label: "Avis" },
  { id: "faq", label: "FAQ" },
];

const EXPO = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Le header se cache quand on descend et réapparaît dès qu'on remonte.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 240);
    setScrolled(latest > 8);
    if (latest < 300) setActive(null);
  });

  // Scrollspy : met en avant la section visible au centre de l'écran.
  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    lockScroll(menuOpen);
    return () => lockScroll(false);
  }, [menuOpen]);

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    lockScroll(false);
    setMenuOpen(false);
    if (pathname === "/") {
      event.preventDefault();
      scrollToTarget(0);
    }
  };

  const highlighted = hovered ?? active;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EXPO }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
          menuOpen ? "bg-forest" : "bg-paper"
        } ${scrolled && !menuOpen ? "shadow-subtle" : ""}`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group flex items-center gap-2"
            aria-label={`${SITE.name} — accueil`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-lime transition-colors duration-500 group-hover:bg-lime group-hover:text-forest">
              <Flame className="h-4 w-4 transition-transform duration-700 ease-out-expo group-hover:rotate-12 group-hover:scale-110" />
            </span>
            <span
              className={`display text-[1.3rem] leading-none transition-colors duration-500 sm:text-[1.45rem] ${
                menuOpen ? "text-lime" : "text-forest"
              }`}
            >
              {SITE.name}
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul
              onMouseLeave={() => setHovered(null)}
              className="flex items-center rounded-full bg-fog p-1"
            >
              {NAV.map((item) => {
                const isOn = highlighted === item.id;
                return (
                  <li key={item.id}>
                    <AnchorLink
                      href={`/#${item.id}`}
                      onMouseEnter={() => setHovered(item.id)}
                      onFocus={() => setHovered(item.id)}
                      onBlur={() => setHovered(null)}
                      aria-current={active === item.id ? "true" : undefined}
                      className={`relative block rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-300 ${
                        isOn ? "text-lime" : "text-forest"
                      }`}
                    >
                      {isOn && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-forest"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </AnchorLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Button href="/contact" variant="outline">
                Contact
              </Button>
            </div>
            <Button href="/checkout" className="max-sm:px-4">
              Commander
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className={`relative flex h-11 w-11 flex-none items-center justify-center rounded-full transition-colors duration-500 lg:hidden ${
                menuOpen ? "bg-lime" : "bg-fog"
              }`}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.4, ease: EXPO }}
                className="absolute h-0.5 w-5 rounded-full bg-forest"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                transition={{ duration: 0.4, ease: EXPO }}
                className="absolute h-0.5 w-5 rounded-full bg-forest"
              />
            </button>
          </div>
        </div>

        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-lime"
        />
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 38px) 32px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 38px) 32px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 38px) 32px)" }}
            transition={{ duration: 0.7, ease: EXPO }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-forest px-4 pb-10 pt-28 sm:px-6 lg:hidden"
          >
            <nav aria-label="Menu mobile">
              <ul className="space-y-1">
                {NAV.map((item, i) => (
                  <li key={item.id} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.6, ease: EXPO, delay: 0.15 + i * 0.06 }}
                    >
                      <AnchorLink
                        href={`/#${item.id}`}
                        onClick={() => {
                          // Déverrouille tout de suite pour que le défilement vers l'ancre puisse partir.
                          lockScroll(false);
                          setMenuOpen(false);
                        }}
                        className="display inline-block py-1 text-[clamp(2.8rem,13vw,5rem)] text-lime transition-transform duration-500 ease-out-expo hover:translate-x-3"
                      >
                        {item.label}
                      </AnchorLink>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col gap-5"
            >
              <Button href="/checkout" variant="light" size="lg" arrow className="self-start">
                Commander — dès {PRICE_LABEL}
              </Button>
              <p className="text-sm text-paper/70">
                {CONTACT.email} · {CONTACT.phone}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
