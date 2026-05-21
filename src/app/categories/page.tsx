import type { Metadata } from "next";
import Link from "next/link";
import { pageSeo } from "@/lib/seo";
import { getCategories } from "@/lib/sanityData";

export const metadata: Metadata = pageSeo({
  title: "Categories",
  description:
    "Leather jackets, bags, wallets, belts, and leather gloves by Fuskan Global Exports.",
  path: "/categories",
});

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="space-y-14 pb-0">
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900">
            All Manufacturing Categories
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            Each category supports custom branding, packaging, and production planning.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.15)]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/30 to-black/5" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-200">
                  Category
                </p>
                <h2 className="mt-2 text-xl font-black uppercase leading-tight">{category.name}</h2>
                <p className="mt-2 text-sm text-zinc-100">{category.description}</p>
                <p className="mt-4 inline-flex items-center text-[11px] font-bold uppercase tracking-[0.16em] text-blue-200">
                  Explore category
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white px-5 py-10 md:px-8 md:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Category Portfolio</p>
        <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-zinc-900 md:text-5xl">
          Professional Leather Product Categories
        </h1>
        <p className="mt-4 max-w-3xl text-zinc-600">
          Browse our core manufacturing lines designed for importers, sourcing teams, and
          private-label programs with scalable production requirements.
        </p>

        <div className="mt-7 grid gap-3 md:max-w-3xl md:grid-cols-3">
          {[
            { value: `${categories.length}+`, label: "Core categories" },
            { value: "OEM", label: "Customization ready" },
            { value: "Export", label: "Quality controlled" },
          ].map((item) => (
            <article key={item.label} className="rounded-2xl border border-zinc-200 bg-white px-4 py-4">
              <p className="text-xl font-black text-zinc-900">{item.value}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="-mx-6 w-[calc(100%+3rem)] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(9,9,11,0.82) 0%, rgba(9,9,11,0.48) 100%), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="flex min-h-[460px] items-center justify-center px-6 py-14 text-center md:px-12">
          <div className="flex flex-col items-center">
            <h2 className="max-w-2xl text-3xl font-black uppercase text-white md:text-5xl">
              Need Factory Pricing For Your Product Category?
            </h2>
            <Link
              href="/start-order"
              className="mt-6 inline-block rounded-full bg-blue-700 px-6 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-800"
            >
              Start Production Brief
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
