import { ImageIcon } from "lucide-react";

// Bloc visuel générique en attendant les vraies photos produit.
// TODO: remplacer chaque <PlaceholderImage /> par un <Image src="/..." /> avec vos vrais visuels.
export function PlaceholderImage({
  label,
  className = "",
  ratio = "aspect-[4/5]",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`placeholder-media relative flex ${ratio} w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-line text-center ${className}`}
    >
      <ImageIcon className="h-8 w-8 text-ink/30" strokeWidth={1.5} />
      <span className="max-w-[80%] text-xs font-medium uppercase tracking-wider text-ink/40">
        {label}
      </span>
    </div>
  );
}
