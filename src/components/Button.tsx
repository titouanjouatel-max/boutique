import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
  size?: "md" | "lg";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap";

const variants: Record<string, string> = {
  primary: "bg-ink text-paper hover:bg-gold hover:text-ink",
  secondary:
    "border border-ink text-ink bg-transparent hover:bg-ink hover:text-paper",
  light: "bg-paper text-ink hover:bg-gold hover:text-ink",
};

const sizes: Record<string, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
