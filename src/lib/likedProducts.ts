export const LIKED_PRODUCTS_KEY = "liked_products";

export function readLikedSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LIKED_PRODUCTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function writeLikedSlugs(slugs: string[]) {
  window.localStorage.setItem(LIKED_PRODUCTS_KEY, JSON.stringify(slugs));
}

export function toggleLikedSlug(slug: string): boolean {
  const current = readLikedSlugs();
  const exists = current.includes(slug);
  const next = exists ? current.filter((s) => s !== slug) : [...current, slug];
  writeLikedSlugs(next);
  return !exists;
}

export function isSlugLiked(slug: string): boolean {
  return readLikedSlugs().includes(slug);
}
