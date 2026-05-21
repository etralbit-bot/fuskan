import type { Metadata } from "next";
import Link from "next/link";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "About us",
  description:
    "Pakistan-based leather items manufacturer for private label and OEM export programs.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 pb-20 text-center md:pb-28">
      <header className="rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">About us</p>
        <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-zinc-900 md:text-5xl">
          Fuskan Global Exports
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-zinc-600">
          Manufacturing partner for brands and importers seeking reliable leather production with
          quality consistency and clear communication.
        </p>
      </header>

      <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-zinc-700">
        <p>
          Fuskan Global Exports is a{" "}
          <strong className="text-zinc-900">Pakistan-based leather items manufacturer</strong>{" "}
          specializing in OEM and private label production for international markets.
        </p>
        <p>
          We work with brands, distributors, and wholesalers to develop customized products under
          private label programs, ensuring each project meets specific design, material, and branding
          requirements.
        </p>
        <p>
          Our product range includes leather jackets, leather gloves, bags, wallets, belts, and
          other leather accessories.
        </p>
        <p>
          With a focus on quality control, structured production, and clear communication, we aim to
          build long-term partnerships with our clients.
        </p>
        <p>
          Fuskan Global Exports is committed to delivering reliable manufacturing solutions tailored
          to global market standards.
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
        {[
          { value: "OEM", label: "Private-label manufacturing" },
          { value: "B2B", label: "Global buyer focused" },
          { value: "QC", label: "Structured quality process" },
        ].map((item) => (
          <article key={item.label} className="rounded-2xl border border-zinc-200 bg-white p-4">
            <p className="text-lg font-black text-zinc-900">{item.value}</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-500">
              {item.label}
            </p>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Link
          href="/start-order"
          className="inline-flex rounded-full bg-blue-700 px-6 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-800"
        >
          Start custom order
        </Link>
        <Link
          href="/oem-private-label"
          className="inline-flex rounded-full border border-zinc-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wide text-zinc-900 hover:border-zinc-900"
        >
          OEM / Private label
        </Link>
        <Link
          href="/faq"
          className="inline-flex rounded-full border border-zinc-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wide text-zinc-900 hover:border-zinc-900"
        >
          FAQ
        </Link>
      </div>
    </div>
  );
}
