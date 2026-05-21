"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AutoRevealObserver from "@/components/AutoRevealObserver";
import BrandLogo from "@/components/BrandLogo";
import Navbar from "@/components/Navbar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");
  const isHomePage = pathname === "/";

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <AutoRevealObserver />
      <main
        className={`mx-auto w-full max-w-[1600px] flex-1 px-4 pb-0 md:px-6 ${
          isHomePage ? "pt-20 md:pt-24" : "pt-6 md:pt-8"
        }`}
      >
        {children}
      </main>
      <footer className="mt-0 border-t border-zinc-800 bg-zinc-950 text-zinc-100">
        <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-4 py-16 md:grid-cols-12 md:px-6 md:py-20">
          <div className="md:col-span-5">
            <Link href="/" className="inline-block">
              <BrandLogo
                className="h-20 w-auto max-w-[170px] md:h-24 md:max-w-[200px]"
                widthPx={126}
                heightPx={140}
              />
              <span className="sr-only">Fuskan Global Exports</span>
            </Link>
            <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-400">
              Leather items manufacturing partner for brands, distributors, and importers.
              From sampling and pattern development to bulk production, every order follows
              a controlled factory workflow with export-ready finishing.
            </p>
            <p className="mt-5 text-sm text-zinc-400">
              fuskanglobalexports@gmail.com
              <br />
              +92 329 0920060
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Company</p>
            <div className="mt-4 grid gap-2 text-sm">
              <Link href="/about" className="hover:text-white">
                About
              </Link>
              <Link href="/contact-us" className="hover:text-white">
                Contact Us
              </Link>
              <Link href="/categories" className="hover:text-white">
                Categories
              </Link>
              <Link href="/oem-private-label" className="hover:text-white">
                OEM / Private Label
              </Link>
              <Link href="/faq" className="hover:text-white">
                FAQ
              </Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Support</p>
            <div className="mt-4 grid gap-2 text-sm">
              <Link href="/start-order" className="hover:text-white">
                Start Custom Order
              </Link>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/return-policy" className="hover:text-white">
                Return Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-white">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              Start a Project
            </p>
            <p className="mt-4 text-sm text-zinc-400">
              Need a quote for custom print or packaging? Share your brief and design files.
            </p>
            <Link
              href="/start-order"
              className="mt-5 inline-block rounded-full bg-blue-700 px-5 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-800"
            >
              Start Custom Order
            </Link>
          </div>
        </div>
        <div className="border-t border-zinc-800 px-4 py-6 text-center text-xs text-zinc-500 md:px-6">
          © {new Date().getFullYear()} Fuskan Global Exports. All rights reserved.
        </div>
      </footer>
    </>
  );
}
