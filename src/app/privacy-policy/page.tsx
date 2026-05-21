import type { Metadata } from "next";
import Link from "next/link";
import LegalPageShell from "@/components/LegalPageShell";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Privacy policy",
  description: "How Fuskan Global Exports collects, uses, and protects your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="Privacy Policy" lastUpdated="April 2026">
      <section>
        <h2>Our commitment</h2>
        <p>
          At Fuskan Global Exports, we respect your privacy and are committed to protecting any
          information you share with us.
        </p>
      </section>

      <section>
        <h2>Information we may collect</h2>
        <p>
          When you contact us, submit inquiries, or upload designs through our website, we may
          collect basic information such as:
        </p>
        <ul>
          <li>Your name</li>
          <li>Company name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Project details relevant to your inquiry or order</li>
        </ul>
      </section>

      <section>
        <h2>How we use your information</h2>
        <p>This information is used solely to:</p>
        <ul>
          <li>Respond to inquiries</li>
          <li>Process requests and quotations</li>
          <li>Improve our services and communication</li>
        </ul>
      </section>

      <section>
        <h2>Sharing of information</h2>
        <p>
          We do not sell, rent, or share your personal or business information with third parties,
          except where required to fulfill your request (such as shipping or production
          coordination).
        </p>
      </section>

      <section>
        <h2>Designs and specifications</h2>
        <p>
          All submitted designs and specifications are treated as{" "}
          <strong>confidential</strong> and are not shared or reproduced without permission.
        </p>
      </section>

      <section>
        <h2>Your agreement</h2>
        <p>By using our website, you agree to the terms of this privacy policy.</p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          For questions about this policy, please reach us via our{" "}
          <Link href="/contact-us" className="font-semibold text-zinc-900 underline underline-offset-2">
            Contact
          </Link>{" "}
          page.
        </p>
      </section>
    </LegalPageShell>
  );
}
