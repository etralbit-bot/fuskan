"use client";

import { useEffect, useState } from "react";
import { isSlugLiked, toggleLikedSlug } from "@/lib/likedProducts";

type ProductLikeButtonProps = {
  slug: string;
  className?: string;
};

export default function ProductLikeButton({ slug, className = "" }: ProductLikeButtonProps) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isSlugLiked(slug));
  }, [slug]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowLiked = toggleLikedSlug(slug);
    setLiked(nowLiked);
    window.dispatchEvent(new Event("liked-products-changed"));
  };

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? "Unlike product" : "Like product"}
      title={liked ? "Remove from saved" : "Save product"}
      onClick={handleClick}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white/95 shadow-sm backdrop-blur transition hover:scale-105 hover:bg-white ${liked ? "border-red-500 text-red-600" : "border-zinc-200 text-zinc-500"} ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
