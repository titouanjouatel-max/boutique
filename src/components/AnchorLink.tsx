"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { scrollToTarget } from "@/lib/scroll";

type AnchorLinkProps = ComponentProps<typeof Link> & { href: string };

// Lien Next.js qui, pour une ancre de la page courante, défile en douceur via Lenis.
export function AnchorLink({ href, onClick, ...rest }: AnchorLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;

    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    const path = href.slice(0, hashIndex) || pathname;
    const hash = href.slice(hashIndex);
    if (path !== pathname || !document.querySelector(hash)) return;

    event.preventDefault();
    scrollToTarget(hash);
    window.history.replaceState(null, "", hash);
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
