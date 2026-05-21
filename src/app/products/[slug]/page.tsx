import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailInteractive from "@/components/ProductDetailInteractive";
import ProductStructuredData from "@/components/ProductStructuredData";
import { pageSeo } from "@/lib/seo";
import { getProducts } from "@/lib/sanityData";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);
  if (!product) {
    return {};
  }
  return pageSeo({
    title: product.name,
    description: product.shortDescription,
    path: `/products/${slug}`,
    ogImage: product.images?.[0] || product.image,
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);
  const relatedProducts = products
    .filter((item) => item.categorySlug === product?.categorySlug && item.slug !== product?.slug)
    .slice(0, 3);

  if (!product) {
    notFound();
  }

  return (
    <section>
      <ProductStructuredData product={product} />
      <ProductDetailInteractive key={product.slug} product={product} relatedProducts={relatedProducts} />
    </section>
  );
}
