"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

const STORAGE_KEY = "fuskan_first_visit_popup_seen";

export default function FirstVisitDialog() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.localStorage.getItem(STORAGE_KEY);
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => setIsVisible(true), 50);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  const closeDialog = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
    window.setTimeout(() => setIsOpen(false), 240);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={closeDialog}
        className={`absolute inset-0 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="first-visit-title"
        className={`relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/30 bg-white p-6 shadow-2xl transition-all duration-300 md:p-8 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-600/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-zinc-900/10 blur-2xl" />

        <div className="relative">
          <div className="mb-4">
            <BrandLogo className="h-16 w-auto max-w-[120px]" widthPx={126} heightPx={140} />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700">
            Welcome to Fuskan Global Exports
          </p>
          <h2
            id="first-visit-title"
            className="mt-3 text-2xl font-black uppercase leading-tight text-zinc-900 md:text-3xl"
          >
            Download Our Catalogue And Start Your Custom Order
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Explore product ideas, quality options, and pricing guidance. Get started with
            your custom order in minutes.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogue"
              onClick={closeDialog}
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-zinc-700"
            >
              Download Catalogue
            </Link>
            <Link
              href="/start-order"
              onClick={closeDialog}
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-3 text-xs font-bold uppercase tracking-wide text-zinc-900 transition hover:border-zinc-900"
            >
              Start Custom Order
            </Link>
          </div>

          <button
            type="button"
            onClick={closeDialog}
            className="mt-5 text-xs font-semibold uppercase tracking-wide text-zinc-500 transition hover:text-zinc-700"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
