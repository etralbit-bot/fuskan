import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CalBookingButton from "@/components/CalBookingButton";
import JsonLd from "@/components/JsonLd";
import ProductCardWithLike from "@/components/ProductCardWithLike";
import { absoluteUrl, pageSeo } from "@/lib/seo";
import { getCategories, getProducts } from "@/lib/sanityData";

type CategoryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) {
    return {};
  }
  return pageSeo({
    title: category.name,
    description: category.description,
    path: `/categories/${slug}`,
    ogImage: category.image,
  });
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.categorySlug === category.slug,
  );

  const categoryUrl = absoluteUrl(`/categories/${category.slug}`);
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: categoryUrl,
    isPartOf: { "@type": "WebSite", name: "Fuskan Global Exports", url: absoluteUrl("/") },
  };

  return (
    <section className="space-y-10">
      <JsonLd data={collectionLd} />
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">Category</p>
        <h1 className="mt-2 text-4xl font-black uppercase tracking-tight">{category.name}</h1>
        <p className="mt-4 max-w-2xl text-zinc-600">{category.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categoryProducts.map((product) => (
          <ProductCardWithLike
            key={product.slug}
            product={product}
            imageClassName="h-[305px] w-full object-contain bg-zinc-100 md:h-[340px]"
          />
        ))}
      </div>

      <section className="rounded-3xl border border-zinc-800 bg-black px-6 py-8 mb-6">
        <h2 className="text-2xl font-black uppercase tracking-tight text-white">
          Need custom product?
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-300">
          Share your requirements with our team and we will help you choose the right materials,
          finishing, and production path.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <CalBookingButton className="rounded-full border border-white px-5 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-white hover:text-zinc-900">
            Book Call
          </CalBookingButton>
          <Link
            href="/start-order"
            className="rounded-full bg-amber-700 px-5 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-amber-800"
          >
            Start Custom Order
          </Link>
        </div>
      </section>
    </section>
  );
}
