import JsonLd from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/seo";
import { getSiteUrl, siteName } from "@/lib/site";

/**
 * Organization + WebSite structured data on every page.
 */
export default function SiteWideJsonLd() {
  const url = getSiteUrl();
  const logo = absoluteUrl("/logo.png");

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url,
    logo: { "@type": "ImageObject", url: logo },
    description:
      "Leather items manufacturer for OEM and private label programs, serving global brands and distributors.",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url,
    publisher: { "@type": "Organization", name: siteName, url, logo: { "@type": "ImageObject", url: logo } },
    inLanguage: "en-US",
  };

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
    </>
  );
}
