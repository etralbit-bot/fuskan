import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Profile",
  description: "Your saved products and inquiry list (private to this browser).",
  path: "/profile",
  noindex: true,
});

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
