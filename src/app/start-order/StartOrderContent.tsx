"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveSubmittedInquiry } from "@/lib/inquiries";

type DraftPayload = {
  productName?: string;
  productSlug?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  notes?: string;
  selections?: Record<string, string | boolean>;
};

export default function StartOrderContent() {
  const searchParams = useSearchParams();
  const productFromUrl = searchParams.get("product") ?? "";

  const [productLabel, setProductLabel] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [quantity, setQuantity] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [notes, setNotes] = useState("");
  const [selectionsSummary, setSelectionsSummary] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("fuskan_inquiry_draft");
      if (!raw) {
        if (productFromUrl) {
          setProductLabel(productFromUrl.replaceAll("-", " "));
        }
        return;
      }
      const data = JSON.parse(raw) as DraftPayload;
      if (data.productName) setProductLabel(data.productName);
      else if (data.productSlug) setProductLabel(data.productSlug.replaceAll("-", " "));
      else if (productFromUrl) setProductLabel(productFromUrl.replaceAll("-", " "));
      if (data.fullName) setFullName(data.fullName);
      if (data.email) setEmail(data.email);
      if (data.phone) setPhone(data.phone);
      if (data.notes) setNotes(data.notes);
      if (data.selections && typeof data.selections === "object") {
        const lines = Object.entries(data.selections).map(([k, v]) => {
          const label = k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
          return `${label}: ${String(v)}`;
        });
        setSelectionsSummary(lines.join("\n"));
      }
    } catch {
      if (productFromUrl) setProductLabel(productFromUrl.replaceAll("-", " "));
    }
  }, [productFromUrl]);

  return (
    <div className="space-y-10 pb-16 md:pb-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-900 px-6 py-10 text-white md:px-10 md:py-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-700/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
            Production inquiry
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase leading-tight tracking-tight md:text-4xl">
            Start your custom order
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-300">
            Share your brief for leather goods and accessories. Our team reviews every submission
            and responds with next steps, sampling options, and a structured quote.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              { value: "Step 1", label: "Submit project brief" },
              { value: "Step 2", label: "Review + clarifications" },
              { value: "Step 3", label: "Sampling / quote" },
            ].map((item) => (
              <article key={item.label} className="rounded-xl border border-white/20 bg-white/10 px-3 py-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-white">{item.value}</p>
                <p className="mt-1 text-[11px] text-zinc-200">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-10 lg:grid-cols-[1fr_340px]">
        <form
          className="space-y-10"
          onSubmit={async (e) => {
            e.preventDefault();
            setFeedback(null);
            setIsSubmitting(true);
            try {
              const response = await fetch("/api/inquiries/custom", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  productLabel,
                  quantity,
                  targetDate,
                  fullName,
                  company,
                  email,
                  phone,
                  notes,
                  selectionsSummary,
                }),
              });
              if (!response.ok) throw new Error("Request failed");
              saveSubmittedInquiry({
                type: "custom",
                productName: productLabel || "Custom order",
              });
              setFeedback("Your custom inquiry was submitted.");
            } catch {
              setFeedback("Could not submit inquiry. Please try again.");
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-start gap-4 border-b border-zinc-100 pb-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-black text-white">
                1
              </span>
              <div>
                <h2 className="text-sm font-black uppercase tracking-wide text-zinc-900">
                  Project & product
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  What are we producing and at what scale?
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 md:col-span-2">
                <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">
                  Product / style reference
                </span>
                <input
                  type="text"
                  name="productType"
                  value={productLabel}
                  onChange={(e) => setProductLabel(e.target.value)}
                  className="rounded-xl border border-zinc-300 bg-zinc-50/80 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  placeholder="e.g. Leather jacket, duffle bag, bi-fold wallet"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">
                  Estimated quantity
                </span>
                <input
                  type="text"
                  name="quantity"
                  inputMode="numeric"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  placeholder="Units or range"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">
                  Target delivery
                </span>
                <input
                  type="text"
                  name="targetDate"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  placeholder="Month / season / hard date"
                />
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-start gap-4 border-b border-zinc-100 pb-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-black text-white">
                2
              </span>
              <div>
                <h2 className="text-sm font-black uppercase tracking-wide text-zinc-900">
                  Contact & company
                </h2>
                <p className="mt-1 text-xs text-zinc-500">Who we should reply to for this project.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">
                  Full name
                </span>
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">
                  Company / brand
                </span>
                <input
                  type="text"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  placeholder="Optional"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">
                  Work email
                </span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">
                  Phone / WhatsApp
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  placeholder="+92 …"
                  autoComplete="tel"
                />
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-start gap-4 border-b border-zinc-100 pb-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-black text-white">
                3
              </span>
              <div>
                <h2 className="text-sm font-black uppercase tracking-wide text-zinc-900">
                  Files & specifications
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Tech packs, logos, size charts, or reference images.
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-5">
              <label className="grid gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">
                  Upload files
                </span>
                <div className="rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 py-8 text-center transition hover:border-zinc-400 hover:bg-zinc-100/80">
                  <input
                    type="file"
                    name="designFile"
                    multiple
                    className="mx-auto block w-full max-w-xs cursor-pointer text-sm text-zinc-600 file:mr-4 file:rounded-full file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:text-white"
                  />
                  <p className="mt-2 text-xs text-zinc-500">
                    PDF, AI, EPS, PNG — up to 25 MB per file recommended.
                  </p>
                </div>
              </label>
              {selectionsSummary && (
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                    Options from product page
                  </p>
                  <pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-relaxed text-zinc-700">
                    {selectionsSummary}
                  </pre>
                </div>
              )}
              <label className="grid gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">
                  Production notes
                </span>
                <textarea
                  name="notes"
                  rows={5}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  placeholder="Leather type, logo method, packaging, compliance needs, and target delivery timeline."
                />
              </label>
            </div>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-zinc-500">
              By submitting, you agree our team may contact you about this project. See our{" "}
              <a href="/privacy-policy" className="font-semibold text-blue-700 underline">
                Privacy Policy
              </a>
              .
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-blue-700 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-blue-800 sm:w-auto sm:min-w-[200px]"
            >
              {isSubmitting ? "Submitting..." : "Submit inquiry"}
            </button>
          </div>
          {feedback ? <p className="text-sm text-zinc-600">{feedback}</p> : null}
        </form>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
              What happens next
            </p>
            <ol className="mt-4 space-y-4 text-sm text-zinc-700">
              <li className="flex gap-3">
                <span className="font-black text-blue-700">1.</span>
                <span>We confirm receipt and may ask clarifying questions.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-blue-700">2.</span>
                <span>You receive sampling or pricing options, depending on scope.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-blue-700">3.</span>
                <span>Production begins after written approval and agreed terms.</span>
              </li>
            </ol>
          </div>
          <div className="rounded-3xl border border-blue-200 bg-blue-50/80 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-900">Need help first?</p>
            <p className="mt-2 text-sm text-blue-900/90">
              For general questions—not a full production brief—use our{" "}
              <a href="/contact-us" className="font-bold underline underline-offset-2">
                Contact
              </a>{" "}
              page instead.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
