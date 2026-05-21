import type { Metadata } from "next";
import Link from "next/link";
import LegalPageShell from "@/components/LegalPageShell";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Return & sample policy",
  description:
    "B2B policy for custom OEM and private label manufacturing at Fuskan Global Exports.",
  path: "/return-policy",
});

export default function ReturnPolicyPage() {
  return (
    <LegalPageShell title="Return & sample policy" lastUpdated="April 2026">
      <section>
        <h2>Custom manufacturing (B2B)</h2>
        <p>
          As a manufacturer working on customized <strong>OEM</strong> and{" "}
          <strong>private label</strong> orders, Fuskan Global Exports does not offer standard
          product returns.
        </p>
      </section>

      <section>
        <h2>Buyer-approved production</h2>
        <p>
          All products are manufactured according to buyer-approved samples and specifications.
          Therefore, returns are not applicable for customized or bulk production orders in the same
          way as off-the-shelf retail goods.
        </p>
      </section>

      <section>
        <h2>Defects or specification issues</h2>
        <p>
          However, in case of any manufacturing defect or inconsistency with approved
          specifications, we are committed to resolving the issue through:
        </p>
        <ul>
          <li>Replacement</li>
          <li>Adjustment in future orders</li>
          <li>A mutually agreed solution</li>
        </ul>
      </section>

      <section>
        <h2>Samples before bulk</h2>
        <p>
          Samples provided before bulk production allow buyers to verify quality, materials, and
          specifications to ensure satisfaction before order confirmation.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          For questions about this policy or a specific order, contact us via our{" "}
          <Link href="/contact-us" className="font-semibold text-zinc-900 underline underline-offset-2">
            Contact
          </Link>{" "}
          page.
        </p>
      </section>
    </LegalPageShell>
  );
}
