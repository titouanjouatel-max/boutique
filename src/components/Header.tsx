import Link from "next/link";
import { Button } from "@/components/Button";
import { SITE } from "@/lib/constants";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="font-display text-lg font-semibold tracking-wide text-ink">
          {SITE.name}
          <span className="ml-2 hidden text-[0.65rem] font-body font-medium uppercase tracking-[0.2em] text-ink/50 sm:inline">
            {SITE.tagline}
          </span>
        </Link>
        <Button href="/checkout" size="md" className="text-xs sm:text-sm">
          Commander maintenant
        </Button>
      </div>
    </header>
  );
}
