import type { Metadata } from "next";
import Link from "next/link";
import { pageSeo } from "@/lib/seo";
import { getCategories } from "@/lib/sanityData";

export const metadata: Metadata = pageSeo({
  title: "Product catalogue",
  description:
    "Download the Fuskan Global Exports catalogue by category: leather jackets, bags, wallets, belts, and gloves.",
  path: "/catalogue",
});

export default async function CataloguePage() {
  const categories = await getCategories();

  return (
    <section className="mx-auto max-w-5xl pb-20 pt-2 md:pb-28">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Catalogue</p>
      <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-zinc-900">
        Download our product catalogue
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600">
        Explore our full range of leather jackets, bags, wallets, belts, and gloves. Browse by
        category and download available catalogue files directly.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {categories.map((category) => (
          <article key={category.slug} className="rounded-3xl border border-zinc-200 bg-white p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">Category</p>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-zinc-900">{category.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{category.description}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/categories/${category.slug}`}
                className="inline-flex rounded-full border border-zinc-300 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-zinc-700 transition hover:bg-zinc-100"
              >
                View category
              </Link>
              {category.catalogueFileUrl ? (
                <a
                  href={category.catalogueFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-zinc-800"
                >
                  Download catalogue
                </a>
              ) : (
                <span className="inline-flex rounded-full bg-zinc-100 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Catalogue upload pending
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:p-8">
        <p className="text-sm leading-relaxed text-zinc-700">
          Need a consolidated catalogue or have custom requirements? Share your business details and
          target market so we can send the best-fit product overview.
        </p>
        <a
          href="mailto:fuskanglobalexports@gmail.com?subject=Catalogue%20Request"
          className="mt-6 inline-flex rounded-full bg-zinc-900 px-8 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-zinc-800"
        >
          Request catalogue by email
        </a>
      </div>
    </section>
  );
}
