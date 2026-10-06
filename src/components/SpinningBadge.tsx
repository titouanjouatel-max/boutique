import type { ReactNode } from "react";

// Pastille ronde avec texte circulaire qui tourne lentement autour d'un contenu central.
export function SpinningBadge({
  id,
  text,
  children,
  className = "",
  textClassName = "fill-lime",
}: {
  id: string;
  text: string;
  children: ReactNode;
  className?: string;
  textClassName?: string;
}) {
  return (
    <div className={`relative flex items-center justify-center rounded-full ${className}`}>
      <svg viewBox="0 0 100 100" aria-hidden className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className={`${textClassName} text-[9.5px] font-semibold uppercase tracking-[0.18em]`}>
          <textPath href={`#${id}`} textLength="238" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}
