"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { readSubmittedInquiries, type SubmittedInquiry } from "@/lib/inquiries";
import { products } from "@/lib/mockData";
import { readLikedSlugs } from "@/lib/likedProducts";

function productNameForSlug(slug: string) {
  return products.find((p) => p.slug === slug)?.name ?? slug.replaceAll("-", " ");
}

export default function ProfilePage() {
  const [likedProducts, setLikedProducts] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return readLikedSlugs();
  });

  const refreshLiked = useCallback(() => {
    setLikedProducts(readLikedSlugs());
  }, []);
  const [inquiries, setInquiries] = useState<SubmittedInquiry[]>(() => {
    if (typeof window === "undefined") return [];
    return readSubmittedInquiries();
  });

  const refreshInquiries = useCallback(() => {
    setInquiries(readSubmittedInquiries());
  }, []);

  useEffect(() => {
    window.addEventListener("liked-products-changed", refreshLiked);
    window.addEventListener("storage", refreshLiked);
    window.addEventListener("submitted-inquiries-changed", refreshInquiries);
    window.addEventListener("storage", refreshInquiries);
    return () => {
      window.removeEventListener("liked-products-changed", refreshLiked);
      window.removeEventListener("storage", refreshLiked);
      window.removeEventListener("submitted-inquiries-changed", refreshInquiries);
      window.removeEventListener("storage", refreshInquiries);
    };
  }, [refreshInquiries, refreshLiked]);

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">Customer Profile</p>
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-4xl">
          Saved Products & Inquiries
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600">
          Track your favorite products and review inquiry history in one place.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-wide text-zinc-900">Liked Products</h2>
          {likedProducts.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {likedProducts.map((productSlug) => (
                <li key={productSlug} className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm">
                  <Link href={`/products/${productSlug}`} className="font-semibold hover:underline">
                    {productNameForSlug(productSlug)}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600">
              You have no liked products yet.
            </div>
          )}
        </article>

        <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-wide text-zinc-900">Recent Inquiries</h2>
          {inquiries.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {inquiries.map((inquiry) => (
                <li
                  key={inquiry.id}
                  className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-700"
                >
                  <p className="font-bold uppercase tracking-wide text-zinc-900">{inquiry.id}</p>
                  <p className="mt-1">{inquiry.productName}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
                    {inquiry.status} · {inquiry.date}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600">
              No inquiries submitted yet.
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
