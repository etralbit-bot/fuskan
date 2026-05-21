import type { Metadata } from "next";
import Link from "next/link";
import LegalPageShell from "@/components/LegalPageShell";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Terms & conditions",
  description:
    "Terms for orders, pricing, payment, lead time, shipping, intellectual property, and liability.",
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return (
    <LegalPageShell title="Terms & conditions" lastUpdated="April 2026">
      <section>
        <h2>Agreement</h2>
        <p>
          By engaging with Fuskan Global Exports, you agree to the following terms:
        </p>
      </section>

      <section>
        <h2>1. Orders &amp; production</h2>
        <p>
          All orders are processed based on mutually approved samples, specifications, and agreed
          terms.
        </p>
      </section>

      <section>
        <h2>2. Pricing</h2>
        <p>
          Prices are quoted based on product specifications, quantity, and customization requirements
          and may vary accordingly.
        </p>
      </section>

      <section>
        <h2>3. Payment terms</h2>
        <p>
          Standard payment terms are <strong>40% advance</strong> and <strong>60% before delivery</strong>{" "}
          unless otherwise agreed.
        </p>
      </section>

      <section>
        <h2>4. Lead time</h2>
        <p>
          Production timelines are shared at the time of order confirmation and depend on product
          complexity and quantity.
        </p>
      </section>

      <section>
        <h2>5. Shipping</h2>
        <p>
          Shipping terms (FOB, CIF, etc.) are agreed upon prior to order finalization.
        </p>
      </section>

      <section>
        <h2>6. Intellectual property</h2>
        <p>
          All buyer-submitted designs remain the property of the buyer and are not reproduced or
          shared without permission.
        </p>
      </section>

      <section>
        <h2>7. Liability</h2>
        <p>
          Fuskan Global Exports is not liable for delays caused by external factors such as shipping
          carriers, customs, or force majeure events.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be directed through our{" "}
          <Link href="/contact-us" className="font-semibold text-zinc-900 underline underline-offset-2">
            Contact
          </Link>{" "}
          page.
        </p>
      </section>
    </LegalPageShell>
  );
}
