"use client";

import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/oem-private-label", label: "OEM" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClass =
    isHomePage && !scrolled
      ? "bg-transparent text-white border-transparent"
      : "bg-white/95 text-zinc-900 border-zinc-200 shadow-sm backdrop-blur-sm";

  const positionClass = isHomePage ? "fixed inset-x-0 top-0" : "relative";

  const buttonClass =
    isHomePage && !scrolled
      ? "bg-blue-700 text-white hover:bg-blue-800"
      : "bg-blue-700 text-white hover:bg-blue-800";

  return (
    <header className={`${positionClass} z-50 border-b transition-all ${navClass}`}>
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-4 py-0.5 md:px-6 md:py-1">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center"
          aria-label="Fuskan Global Exports home"
        >
          <BrandLogo
            className={`h-9 w-auto max-w-[68px] object-contain sm:h-10 sm:max-w-[74px] ${
              isHomePage && !scrolled ? "drop-shadow-md" : ""
            }`}
            widthPx={126}
            heightPx={140}
            priority
          />
        </Link>
        <nav className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide md:gap-4">
          <div className="hidden flex-wrap items-center gap-5 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:opacity-75"
                title={link.href === "/oem-private-label" ? "OEM / Private Label" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/start-order"
            className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide transition ${buttonClass}`}
          >
            Start Order
          </Link>
          <Link
            href="/profile"
            aria-label="Profile"
            title="Profile"
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition ${
              isHomePage && !scrolled
                ? "border-white/70 text-white hover:bg-white/15"
                : "border-zinc-300 text-zinc-700 hover:border-zinc-500"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.6-3.3 4.6-5 8-5s6.4 1.7 8 5" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}
