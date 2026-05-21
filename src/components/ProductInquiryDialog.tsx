"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import StandardProductOptionsForm from "@/components/StandardProductOptionsForm";
import { saveSubmittedInquiry } from "@/lib/inquiries";

type ProductInquiryDialogProps = {
  open: boolean;
  onClose: () => void;
  productName: string;
  productSlug: string;
  /** Snapshot taken when dialog opens — pre-fills options */
  initialSelections: Record<string, string | boolean>;
};

export default function ProductInquiryDialog({
  open,
  onClose,
  productName,
  productSlug,
  initialSelections,
}: ProductInquiryDialogProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selections, setSelections] = useState(initialSelections);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setSelections({ ...initialSelections });
      setFullName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setError(null);
      setIsSubmitting(false);
    }
  }, [open, initialSelections]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSelect = (id: string, value: string) => {
    setSelections((prev) => ({ ...prev, [id]: value }));
  };

  const handleToggle = (id: string, value: boolean) => {
    setSelections((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const payload = {
      productSlug,
      productName,
      fullName,
      email,
      phone,
      notes,
      selections,
      savedAt: new Date().toISOString(),
    };
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiries/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      saveSubmittedInquiry({ type: "product", productName });
    } catch {
      setError("Could not submit inquiry. Please try again.");
      setIsSubmitting(false);
      return;
    }
    try {
      window.sessionStorage.setItem("fuskan_inquiry_draft", JSON.stringify(payload));
    } catch {
      /* ignore */
    }
    onClose();
    router.push(`/start-order?product=${encodeURIComponent(productSlug)}`);
  };

  if (!mounted || !open) return null;

  return createPortal(
    <>
      <button
        type="button"
        aria-label="Close dialog"
        className="fixed inset-0 z-[200] bg-black/55 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-dialog-title"
        className="fixed left-1/2 top-1/2 z-[201] flex max-h-[min(90vh,820px)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 bg-white px-5 py-4">
          <h2 id="inquiry-dialog-title" className="text-lg font-black uppercase tracking-tight text-zinc-900">
            Send inquiry
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Close dialog"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5">
          <p className="text-sm text-zinc-600">
            Product: <span className="font-semibold text-zinc-900">{productName}</span>
          </p>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
              Your selections
            </p>
            <div className="mt-3">
              <StandardProductOptionsForm
                selections={selections}
                onSelect={handleSelect}
                onToggle={handleToggle}
              />
            </div>
          </div>

          <label className="grid gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">Full name</span>
            <input
              required
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm"
              autoComplete="name"
            />
          </label>
          <label className="grid gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm"
              autoComplete="email"
            />
          </label>
          <label className="grid gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">Phone</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm"
              autoComplete="tel"
            />
          </label>
          <label className="grid gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">Notes (optional)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm"
              placeholder="Quantity, timeline, design files…"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-zinc-900 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-zinc-800"
          >
            {isSubmitting ? "Submitting..." : "Continue to order form"}
          </button>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </form>
      </div>
    </>,
    document.body,
  );
}
