"use client";

import { useSyncExternalStore } from "react";

// Abonnement à une media query, sûr côté serveur (false pendant le SSR).
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

// Souris/trackpad + animations autorisées : on active les effets au survol avancés.
export const FINE_POINTER_QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
