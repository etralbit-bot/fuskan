"use client";

import Link from "next/link";
import type { Product } from "@/lib/mockData";
import ProductLikeButton from "@/components/ProductLikeButton";

type ProductCardWithLikeProps = {
  product: Product;
  imageClassName?: string;
};

const DEFAULT_IMAGE = "h-[210px] w-full object-contain bg-zinc-100 md:h-[260px]";

export default function ProductCardWithLike({
  product,
  imageClassName = DEFAULT_IMAGE,
}: ProductCardWithLikeProps) {
  const primaryImage = product.images?.[0] || product.image || "";
  return (
    <article className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_18px_36px_rgba(15,23,42,0.14)]">
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block">
          <img
            src={primaryImage}
            alt={product.name}
            className={`${imageClassName} transition duration-300`}
          />
        </Link>
        <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          {product.category}
        </span>
        <ProductLikeButton slug={product.slug} className="absolute right-2 top-2" />
      </div>
      <Link href={`/products/${product.slug}`} className="block p-4 md:p-5">
        <h3 className="text-sm font-black uppercase leading-tight text-zinc-900 md:text-base">
          {product.name}
        </h3>
        <p className="mt-2 text-xs leading-5 text-zinc-600">{product.shortDescription}</p>
        <p className="mt-4 inline-flex items-center text-[11px] font-bold uppercase tracking-[0.14em] text-blue-700 group-hover:text-blue-800">
          View specifications
        </p>
      </Link>
    </article>
  );
}
