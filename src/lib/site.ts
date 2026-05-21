export const siteName = "Fuskan Global Exports";

export const siteTagline =
  "Leather items manufacturer for private label, OEM, and export-ready production.";

const DEFAULT_DEV_URL = "http://localhost:3000";

/**
 * Canonical site origin for Open Graph, JSON-LD, sitemaps, and canonical URLs.
 * Set `NEXT_PUBLIC_SITE_URL` in production (for example `https://www.yourdomain.com`).
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://${host}`;
  }
  return DEFAULT_DEV_URL;
}
