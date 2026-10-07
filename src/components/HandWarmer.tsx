"use client";

import { useId } from "react";
import { COLORS, type ColorId } from "@/lib/constants";

type HandWarmerProps = {
  color?: ColorId;
  // Niveau de chauffe affiché par les voyants (0 = éteint).
  level?: 0 | 1 | 2 | 3;
  // Ondes de chaleur animées au-dessus de l'appareil.
  heat?: boolean;
  className?: string;
  title?: string;
};

const WAVE_COLORS = ["#ffb347", "#ff7a3d", "#cb272f"];

// Illustration du chauffe-mains (galet 102 × 59 mm, bouton, voyants, port USB).
// TODO: remplacer par de vraies photos produit quand vous les aurez.
export function HandWarmer({ color = "argent", level = 2, heat = true, className = "", title }: HandWarmerProps) {
  const uid = useId().replace(/:/g, "");
  const c = COLORS.find((item) => item.id === color) ?? COLORS[0];
  const dark = color === "noir";
  const waveColor = WAVE_COLORS[Math.max(0, level - 1)];

  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={`body-${uid}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={c.shade} />
          <stop offset="0.35" stopColor={c.metal} />
          <stop offset="0.6" stopColor={c.metal} />
          <stop offset="1" stopColor={c.shade} />
        </linearGradient>
      </defs>

      {heat && level > 0 && (
        <g className="heat-waves" stroke={waveColor} strokeWidth="6" strokeLinecap="round" fill="none">
          <path className="heat-wave" d="M70 52 q-10 -12 0 -24 q10 -12 0 -24" />
          <path className="heat-wave heat-wave-2" d="M100 48 q-10 -12 0 -24 q10 -12 0 -24" />
          <path className="heat-wave heat-wave-3" d="M130 52 q-10 -12 0 -24 q10 -12 0 -24" />
        </g>
      )}

      {/* Dragonne */}
      <path d="M58 78 q-30 -6 -34 -40" stroke={dark ? "#5a5e62" : "#163300"} strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Corps */}
      <rect x="40" y="62" width="120" height="208" rx="60" fill={`url(#body-${uid})`} />
      <rect x="40" y="62" width="120" height="208" rx="60" fill="none" stroke={c.shade} strokeWidth="2" opacity="0.6" />
      {/* Reflet */}
      <rect x="62" y="80" width="14" height="150" rx="7" fill="#ffffff" opacity={dark ? 0.12 : 0.35} />

      {/* Port USB */}
      <rect x="86" y="58" width="28" height="8" rx="3" fill={dark ? "#111" : "#55595e"} />

      {/* Bouton */}
      <circle cx="100" cy="110" r="11" fill={dark ? "#26292b" : c.shade} />
      <circle cx="100" cy="110" r="7" fill={dark ? "#3a3d40" : c.metal} />

      {/* Voyants de niveau */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={86 + i * 14}
          cy="238"
          r="4.5"
          fill={i < level ? "#ff4d3d" : dark ? "#1f2224" : c.shade}
          className={i < level ? "led-on" : undefined}
        />
      ))}
    </svg>
  );
}
