import type { Metadata } from "next";
import Link from "next/link";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "OEM & private label",
  description:
    "Complete OEM and private label manufacturing for leather goods and accessories worldwide.",
  path: "/oem-private-label",
});

const processSteps: { title: string; description: string }[] = [
  {
    title: "Design submission",
    description: "Share your design, concept, or reference.",
  },
  {
    title: "Product development",
    description: "Material selection and sample creation.",
  },
  {
    title: "Sample approval",
    description: "Final adjustments and confirmation.",
  },
  {
    title: "Bulk production",
    description: "Structured manufacturing process.",
  },
  {
    title: "Quality control",
    description: "In-line and final inspection.",
  },
  {
    title: "Packaging & shipment",
    description: "Delivered as per agreed terms.",
  },
];

const customizationItems = [
  "Fabric & materials",
  "Colors (Pantone matching available)",
  "Logo application (printing, embroidery, patches)",
  "Labels & packaging",
  "Product sizing & specifications",
];

const whoWeWorkWith = [
  "Clothing brands",
  "Sportswear companies",
  "Industrial distributors",
  "Wholesalers",
];

export default function OemPrivateLabelPage() {
  return (
    <div className="space-y-12 pb-20 md:pb-28">
      <header className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-950 px-6 py-12 text-white md:px-10 md:py-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-700/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <p className="relative text-[11px] font-bold uppercase tracking-[0.22em] text-blue-300">
          OEM / Private label
        </p>
        <h1 className="relative mt-3 max-w-3xl text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">
          Professional OEM Manufacturing For Leather Product Brands
        </h1>
        <p className="relative mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base">
          We manage design development, sampling, production, quality control, and export dispatch
          under one structured workflow for global buyers.
        </p>
        <div className="relative mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
          {[
            { value: "OEM", label: "Private-label programs" },
            { value: "6-step", label: "Production workflow" },
            { value: "B2B", label: "Global shipment support" },
          ].map((item) => (
            <article key={item.label} className="rounded-2xl border border-white/20 bg-white/5 p-4">
              <p className="text-xl font-black text-white">{item.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-zinc-300">{item.label}</p>
            </article>
          ))}
        </div>
      </header>

      <section className="grid gap-10 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-10">
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-zinc-900">
              Manufacturing process
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {processSteps.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-700">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-sm font-black uppercase tracking-wide text-zinc-900">
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-zinc-900">
              Customization capabilities
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {customizationItems.map((item) => (
                <li key={item} className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-6">
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-zinc-900">Who we work with</h2>
            <ul className="mt-5 space-y-3">
              {whoWeWorkWith.map((item) => (
                <li key={item} className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-blue-900">
              Start your OEM program
            </h2>
            <p className="mt-2 text-sm text-blue-900/85">
              Send your brief, target quantity, and timeline. Our team will reply with sampling and quotation options.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/start-order"
                className="inline-flex rounded-full bg-blue-700 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-800"
              >
                Start custom order
              </Link>
              <Link
                href="/faq"
                className="inline-flex rounded-full border border-blue-300 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-blue-900 hover:border-blue-500"
              >
                Read FAQ
              </Link>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
