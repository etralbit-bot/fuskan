import { createClient } from "next-sanity";
import { categories as fallbackCategories, products as fallbackProducts } from "@/lib/mockData";

type ProductItem = (typeof fallbackProducts)[number];
type CategoryItem = (typeof fallbackCategories)[number];

const categoriesQuery = `*[_type == "category"] | order(coalesce(sortOrder, 999999) asc, name asc){
  name,
  "slug": slug.current,
  description,
  "image": coalesce(image.asset->url, ""),
  "sortOrder": sortOrder,
  "catalogueFileUrl": catalogueFile.asset->url,
  "catalogueFileName": catalogueFile.asset->originalFilename
}`;

const productsQuery = `*[_type == "product"] | order(name asc){
  "id": _id,
  name,
  "slug": slug.current,
  "featured": coalesce(featured, false),
  shortDescription,
  description,
  descriptionRichHtml,
  descriptionRich,
  detailsRich,
  "images": coalesce(images[].asset->url, []),
  "image": coalesce(images[0].asset->url, image.asset->url, ""),
  "category": category->name,
  "categorySlug": category->slug.current
}`;

function hasSanityConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET);
}

function getReadClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-21",
    useCdn: true,
  });
}

export async function getCategories(): Promise<CategoryItem[]> {
  if (!hasSanityConfig()) return fallbackCategories;
  const data = await getReadClient().fetch<CategoryItem[]>(categoriesQuery);
  if (!data?.length) return fallbackCategories;
  return data.map((item) => ({ ...item, image: item.image || fallbackCategories[0]?.image || "" }));
}

export async function getProducts(): Promise<ProductItem[]> {
  if (!hasSanityConfig()) return fallbackProducts;
  const data = await getReadClient().fetch<ProductItem[]>(productsQuery);
  if (!data?.length) return fallbackProducts;
  return data.map((item, index) => ({
    ...item,
    images:
      item.images?.length
        ? item.images
        : fallbackProducts[index % fallbackProducts.length]?.images ||
          [item.image || fallbackProducts[index % fallbackProducts.length]?.image || ""],
    image:
      item.image ||
      item.images?.[0] ||
      fallbackProducts[index % fallbackProducts.length]?.images?.[0] ||
      fallbackProducts[index % fallbackProducts.length]?.image ||
      "",
    description: item.description || item.shortDescription || "",
    descriptionRichHtml: item.descriptionRichHtml || `<p>${item.description || item.shortDescription || ""}</p>`,
    featured: typeof item.featured === "boolean" ? item.featured : Boolean(fallbackProducts[index % fallbackProducts.length]?.featured),
  }));
}
