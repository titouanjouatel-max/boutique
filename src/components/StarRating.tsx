import { Star } from "lucide-react";

export function StarRating({
  rating = 5,
  size = 16,
  className = "",
  tone = "forest",
}: {
  rating?: number;
  size?: number;
  className?: string;
  tone?: "forest" | "lime";
}) {
  const on = tone === "lime" ? "fill-lime text-lime" : "fill-forest text-forest";
  const off = tone === "lime" ? "fill-spruce text-spruce" : "fill-fog text-fog";
  return (
    <div className={`flex items-center gap-0.5 ${className}`} role="img" aria-label={`${rating} sur 5 étoiles`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} aria-hidden className={i < Math.round(rating) ? on : off} />
      ))}
    </div>
  );
}
