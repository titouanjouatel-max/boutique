import type Lenis from "lenis";

// Instance Lenis partagée, pour que les liens d'ancre profitent du défilement fluide.
// Le décalage sous le header fixe vient du `scroll-margin-top` défini dans globals.css
// (Lenis comme le navigateur le prennent en compte).
let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, force: true });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

// Bloque le défilement (menu mobile ouvert).
export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
