import type { MetadataRoute } from "next";
import { siteName, siteTagline } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Fuskan",
    description: siteTagline,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
      },
    ],
  };
}
