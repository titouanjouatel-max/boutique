import { SITE } from "@/lib/constants";

// Rideau d'ouverture en CSS pur : visible dès le premier rendu serveur,
// il se retire tout seul (et disparaît si l'utilisateur réduit les animations).
export function Intro() {
  return (
    <div
      aria-hidden
      className="intro-curtain pointer-events-none fixed inset-0 z-[150] flex flex-col items-center justify-center gap-6 bg-forest"
    >
      <div className="overflow-hidden">
        <p className="intro-word display text-[clamp(3rem,12vw,9rem)] text-lime">{SITE.name}</p>
      </div>
      <div className="h-1 w-40 overflow-hidden rounded-full bg-spruce">
        <div className="intro-bar h-full w-full rounded-full bg-lime" />
      </div>
    </div>
  );
}
