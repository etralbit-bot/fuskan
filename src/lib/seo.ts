import type { Metadata } from "next";
import { getSiteUrl, siteName, siteTagline } from "./site";

export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

const defaultOgImage = () => ({ url: absoluteUrl("/logo.png"), alt: siteName });

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute URL (recommended for product/category hero images). */
  ogImage?: string;
  noindex?: boolean;
};

export function pageSeo({
  title,
  description,
  path,
  ogImage,
  noindex,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const images = ogImage
    ? [{ url: ogImage, alt: title }]
    : [defaultOgImage()];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "en_US",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
  };
}

/** Home: avoids duplicate brand suffix from the root title template. */
export function homeMetadata(): Metadata {
  const url = absoluteUrl("/");
  const absoluteTitle = `${siteName} — Leather items manufacturer`;
  const images = [defaultOgImage()];

  return {
    title: { absolute: absoluteTitle },
    description: siteTagline,
    alternates: { canonical: url },
    openGraph: {
      title: absoluteTitle,
      description: siteTagline,
      url,
      siteName,
      locale: "en_US",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle,
      description: siteTagline,
      images: images.map((i) => i.url),
    },
  };
}

export function rootLayoutMetadataExtras(): Pick<
  Metadata,
  "metadataBase" | "applicationName" | "keywords" | "authors" | "creator" | "formatDetection" | "verification"
> {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(getSiteUrl()),
    applicationName: siteName,
    authors: [{ name: siteName, url: absoluteUrl("/") }],
    creator: siteName,
    keywords: [
      "leather items manufacturer",
      "private label leather goods",
      "OEM leather products",
      "leather exporter",
      "custom leather accessories",
      "Fuskan Global Exports",
    ],
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    ...(google ? { verification: { google } } : {}),
  };
}
