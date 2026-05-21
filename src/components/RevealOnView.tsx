"use client";

import { useEffect, useRef, useState } from "react";

type RevealOnViewProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
};

export default function RevealOnView({
  children,
  className = "",
  delayMs = 0,
}: RevealOnViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`reveal-on-view ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
