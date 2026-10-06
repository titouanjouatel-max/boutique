"use client";

import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { registerLenis } from "@/lib/scroll";

// Défilement fluide (Lenis) + respect global de `prefers-reduced-motion`.
export function Providers({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      autoRaf: true,
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;
    registerLenis(lenis);
    return () => {
      registerLenis(null);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Nouvelle page : on repart du haut sans animation.
  useEffect(() => {
    if (!window.location.hash) {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    }
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
