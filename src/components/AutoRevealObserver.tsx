"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR =
  "main h1, main h2, main h3, main h4, main p, main section, main article, main li, main img, main form, main aside, main blockquote, main [data-reveal]";

export default function AutoRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)).filter(
      (element) => !element.closest("[data-no-reveal]"),
    );

    elements.forEach((element, index) => {
      if (element.classList.contains("reveal-on-view")) return;
      element.classList.add("reveal-on-view");
      element.style.transitionDelay = `${Math.min(index * 18, 240)}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
