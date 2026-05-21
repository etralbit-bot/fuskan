import type { Metadata } from "next";
import Link from "next/link";
import { pageSeo } from "@/lib/seo";
import ContactMessageForm from "./ContactMessageForm";

export const metadata: Metadata = pageSeo({
  title: "Contact us",
  description:
    "Reach Fuskan Global Exports for leather goods manufacturing questions, partnerships, and support.",
  path: "/contact-us",
});

export default function ContactUsPage() {
  return (
    <div className="pb-20 md:pb-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Contact</p>
          <h1 className="mt-3 text-4xl font-black uppercase leading-tight tracking-tight text-zinc-900 md:text-5xl">
            Let&apos;s talk
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-600">
            Questions about our factory capabilities, partnerships, or how we work? Reach out here.
            For custom production with files and quantities, use{" "}
            <Link
              href="/start-order"
              className="font-semibold text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900"
            >
              Start custom order
            </Link>{" "}
            so we can route your brief correctly.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Email</p>
              <a
                href="mailto:fuskanglobalexports@gmail.com"
                className="mt-2 block text-sm font-semibold text-zinc-900 hover:text-blue-700"
              >
                fuskanglobalexports@gmail.com
              </a>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Phone</p>
              <a
                href="tel:+923246405356"
                className="mt-2 block text-sm font-semibold text-zinc-900 hover:text-blue-700"
              >
                +92 324 6405356
              </a>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Office</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-800">
                Sialkot, Pakistan 51310
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 text-xs text-zinc-600">
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 font-medium">
              Mon–Fri · 9:00 AM – 6:00 PM (PKT)
            </span>
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 font-medium">
              Response within 1–2 business days
            </span>
          </div>
        </div>

        <div className="rounded-[2rem] border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-6 shadow-sm md:p-8">
          <h2 className="text-lg font-black uppercase tracking-tight text-zinc-900">Quick message</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Short questions only—no need to attach tech packs here.
          </p>
          <ContactMessageForm />
        </div>
      </div>
    </div>
  );
}
