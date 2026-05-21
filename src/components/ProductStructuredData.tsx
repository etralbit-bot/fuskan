import JsonLd from "@/components/JsonLd";
import type { Product } from "@/lib/mockData";
import { absoluteUrl } from "@/lib/seo";
import { siteName } from "@/lib/site";

type ProductStructuredDataProps = {
  product: Product;
};

export default function ProductStructuredData({ product }: ProductStructuredDataProps) {
  const productUrl = absoluteUrl(`/products/${product.slug}`);
  const categoryUrl = absoluteUrl(`/categories/${product.categorySlug}`);
  const imageList = product.images?.length ? product.images : product.image ? [product.image] : [];
  const descriptionText = product.shortDescription || product.description || "";

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: descriptionText,
    image: imageList,
    sku: product.id,
    url: productUrl,
    brand: { "@type": "Brand", name: siteName },
    category: product.category,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: product.category, item: categoryUrl },
      { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
    ],
  };

  return (
    <>
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbLd} />
    </>
  );
}
