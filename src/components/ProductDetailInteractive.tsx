"use client";

import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/mockData";
import { buildStandardOptionSelections } from "@/lib/productOptions";
import ProductCardWithLike from "@/components/ProductCardWithLike";
import ProductInquiryDialog from "@/components/ProductInquiryDialog";
import ProductLikeButton from "@/components/ProductLikeButton";
import StandardProductOptionsForm from "@/components/StandardProductOptionsForm";

type ProductDetailInteractiveProps = {
  product: Product;
  relatedProducts: Product[];
};

export default function ProductDetailInteractive({
  product,
  relatedProducts,
}: ProductDetailInteractiveProps) {
  const [selections, setSelections] = useState<Record<string, string | boolean>>(buildStandardOptionSelections);
  const [shakeOn, setShakeOn] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [inquirySnapshot, setInquirySnapshot] = useState<Record<string, string | boolean>>(
    buildStandardOptionSelections,
  );
  const images = useMemo(
    () => (product.images?.length ? product.images : product.image ? [product.image] : []),
    [product.images, product.image],
  );

  useEffect(() => {
    const t = window.setTimeout(() => setShakeOn(true), 2600);
    return () => window.clearTimeout(t);
  }, [product.slug]);

  useEffect(() => {
    setActiveImage(0);
  }, [product.slug]);

  const handleSelect = useCallback((id: string, value: string) => {
    setSelections((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleToggle = useCallback((id: string, value: boolean) => {
    setSelections((prev) => ({ ...prev, [id]: value }));
  }, []);

  const openInquiry = useCallback(() => {
    setInquirySnapshot({ ...selections });
    setInquiryOpen(true);
  }, [selections]);

  const richTextClass =
    "rich-text space-y-4 text-sm leading-relaxed text-zinc-600 [&_h3]:mt-8 [&_h3]:text-base [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-wide [&_h3]:text-zinc-900 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1.5 [&_p]:mt-3 [&_strong]:font-semibold [&_strong]:text-zinc-800";

  const descriptionBlocks = product.descriptionRich;

  return (
    <div className="space-y-10 pb-2">
      <ProductInquiryDialog
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        productName={product.name}
        productSlug={product.slug}
        initialSelections={inquirySnapshot}
      />

      <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-gradient-to-b from-white to-zinc-50/80 shadow-sm">
        <div className="grid gap-0 lg:grid-cols-12">
          <div className="border-b border-zinc-100 p-4 md:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
            <div className="relative h-[320px] overflow-hidden rounded-none border-0 bg-zinc-100 md:h-[520px] md:rounded-3xl md:border md:border-zinc-200 md:shadow-inner">
              <img
                src={images[activeImage] || ""}
                alt={product.name}
                className="h-full w-full object-contain"
              />
              <ProductLikeButton slug={product.slug} className="absolute right-3 top-3" />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveImage((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-xs font-bold text-white hover:bg-black/60"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImage((prev) => (prev + 1) % images.length)}
                    className="absolute right-12 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-xs font-bold text-white hover:bg-black/60"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2 md:grid-cols-5">
                {images.map((image, idx) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`overflow-hidden rounded-xl border ${
                      idx === activeImage ? "border-blue-600" : "border-zinc-200"
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${idx + 1}`} className="h-16 w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col px-4 pb-6 pt-5 md:col-span-5 md:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">
              {product.category}
            </p>
            <h1 className="mt-3 text-2xl font-black uppercase leading-tight tracking-tight text-zinc-900 md:text-3xl">
              {product.name}
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{product.shortDescription}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-5">
              <span className="text-xs font-semibold text-zinc-700">Have a custom design?</span>
              <Link
                href="/start-order"
                className={`inline-flex items-center rounded-full bg-blue-700 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-blue-800 ${shakeOn ? "product-detail-cta-shake" : ""}`}
              >
                Start Custom Order
              </Link>
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                Manufacturing specifications
              </p>
              <div className="mt-4">
                <StandardProductOptionsForm
                  selections={selections}
                  onSelect={handleSelect}
                  onToggle={handleToggle}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={openInquiry}
              className="mt-6 w-full rounded-full bg-blue-700 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-blue-800"
            >
              Send inquiry
            </button>

            <div className="mt-4">
              <Link
                href={`/categories/${product.categorySlug}`}
                className="text-xs font-bold uppercase tracking-wide text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline"
              >
                ← Back to {product.category}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-[2rem] border border-zinc-200 bg-white px-5 py-8 shadow-sm md:px-10 md:py-10">
        <h2 className="text-lg font-black uppercase tracking-tight text-zinc-900">Description</h2>
        <div className={`mt-5 ${richTextClass}`}>
          {Array.isArray(descriptionBlocks) && descriptionBlocks.length > 0 ? (
            <PortableText value={descriptionBlocks} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: product.descriptionRichHtml || `<p>${product.description || ""}</p>` }} />
          )}
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-3">
        <article className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-zinc-900">Premium Quality</p>
          <p className="mt-2 text-sm text-zinc-600">
            Consistent leather cutting, stitching, and finishing across every production run.
          </p>
        </article>
        <article className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-zinc-900">Sampling & scale</p>
          <p className="mt-2 text-sm text-zinc-600">
            From first samples through bulk runs, aligned to your brand timeline.
          </p>
        </article>
        <article className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-zinc-900">Dedicated Support</p>
          <p className="mt-2 text-sm text-zinc-600">
            Design guidance, sampling updates, and clear communication throughout production.
          </p>
        </article>
      </div>

      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-black uppercase tracking-tight">Related products</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCardWithLike key={item.slug} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
