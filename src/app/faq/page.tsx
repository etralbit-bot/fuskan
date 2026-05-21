import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "FAQ",
  description:
    "MOQ, samples, lead times, customization, payment, and international shipping for OEM leather goods manufacturing.",
  path: "/faq",
});

const faqs: { q: string; a: string }[] = [
  {
    q: "What is your MOQ?",
    a: "Our MOQ starts from 10 pieces per design and may vary depending on product type.",
  },
  {
    q: "Do you provide samples?",
    a: "Yes, samples are available before bulk production for quality and specification approval.",
  },
  {
    q: "What is your production lead time?",
    a: "Production usually takes 25–35 days after sample approval.",
  },
  {
    q: "Can you customize products?",
    a: "Yes, we offer full OEM and private label customization including design, materials, and branding.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Standard terms are 40% advance and 60% before delivery.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we export globally under agreed shipping terms.",
  },
];

export default function FaqPage() {
  const faqPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="pb-20 md:pb-28">
      <JsonLd data={faqPageJsonLd} />
      <header className="rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Help Center</p>
        <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-zinc-900 md:text-5xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600">
          Quick answers about orders and manufacturing. For project-specific quotes, use{" "}
          <Link
            href="/start-order"
            className="font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700"
          >
            Start custom order
          </Link>
          .
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-zinc-200 rounded-3xl border border-zinc-200 bg-white shadow-sm">
        {faqs.map((item) => (
          <details key={item.q} className="group px-5 py-1 open:bg-zinc-50/80">
            <summary className="cursor-pointer list-none py-4 pr-8 text-sm font-bold uppercase tracking-wide text-zinc-900 outline-none marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                <span>{item.q}</span>
                <span className="mt-0.5 shrink-0 text-zinc-400 transition group-open:rotate-180">
                  ▼
                </span>
              </span>
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-zinc-600">{item.a}</p>
          </details>
        ))}
      </div>

      <section className="mx-auto mt-14 max-w-3xl rounded-[2rem] border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-6 shadow-sm md:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Catalogue</p>
        <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-zinc-900 md:text-3xl">
          Download our product catalogue
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base">
          Explore our full range of leather jackets, bags, wallets, belts, and gloves.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600">
          Download our catalogue to view product styles, customization options, and manufacturing
          capabilities.
        </p>
        <Link
          href="/catalogue"
          className="mt-6 inline-flex rounded-full bg-blue-700 px-8 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-blue-800"
        >
          Download catalogue
        </Link>
        <p className="mt-5 text-sm text-zinc-500">
          For custom requirements, feel free to submit your design or{" "}
          <Link href="/contact-us" className="font-semibold text-blue-700 underline underline-offset-2">
            contact us
          </Link>{" "}
          directly.
        </p>
      </section>

      <p className="mx-auto mt-12 max-w-3xl text-center text-sm text-zinc-500">
        More on programs and process:{" "}
        <Link href="/oem-private-label" className="font-semibold text-blue-700 underline underline-offset-2">
          OEM / Private label
        </Link>
      </p>
    </div>
  );
}
