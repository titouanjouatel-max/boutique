import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { AnchorLink } from "@/components/AnchorLink";

type Variant = "primary" | "dark" | "outline" | "light";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
  external?: boolean;
};

// Pilule Wise : remplissage qui monte au survol + libellé qui « roule ».
const variants: Record<Variant, { base: string; fill: string; hover: string; arrow: string }> = {
  primary: {
    base: "bg-lime text-forest",
    fill: "bg-forest",
    hover: "group-hover:text-lime",
    arrow: "bg-forest text-lime group-hover:bg-lime group-hover:text-forest",
  },
  dark: {
    base: "bg-forest text-lime",
    fill: "bg-lime",
    hover: "group-hover:text-forest",
    arrow: "bg-lime text-forest group-hover:bg-forest group-hover:text-lime",
  },
  outline: {
    base: "bg-paper text-forest shadow-[inset_0_0_0_1px_var(--forest)]",
    fill: "bg-forest",
    hover: "group-hover:text-paper",
    arrow: "bg-forest text-paper group-hover:bg-lime group-hover:text-forest",
  },
  light: {
    base: "bg-paper text-forest",
    fill: "bg-lime",
    hover: "group-hover:text-forest",
    arrow: "bg-forest text-lime",
  },
};

const sizes = {
  md: "min-h-11 px-6 py-[11px] text-base font-medium",
  lg: "min-h-14 px-8 py-4 text-lg font-semibold",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  external = false,
}: ButtonProps) {
  const v = variants[variant];
  const classes = `group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full tracking-[-0.006em] transition-transform duration-300 ease-out-expo active:scale-95 ${v.base} ${sizes[size]} ${arrow ? "pr-2" : ""} ${className}`;

  const content = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 translate-y-[101%] rounded-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0 ${v.fill}`}
      />
      <span className={`relative block overflow-hidden transition-colors duration-300 ${v.hover}`}>
        <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      {arrow && (
        <span
          aria-hidden
          className={`flex flex-none items-center justify-center rounded-full transition-all duration-500 ease-out-expo group-hover:rotate-45 ${v.arrow} ${size === "lg" ? "h-11 w-11" : "h-8 w-8"}`}
        >
          <ArrowUpRight className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
        </span>
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <AnchorLink href={href} className={classes}>
      {content}
    </AnchorLink>
  );
}
