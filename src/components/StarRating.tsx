import { Star } from "lucide-react";

export function StarRating({
  rating = 5,
  size = 16,
  className = "",
}: {
  rating?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} sur 5 étoiles`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(rating) ? "fill-gold text-gold" : "fill-line text-line"}
        />
      ))}
    </div>
  );
}
