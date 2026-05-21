"use client";

import { useState } from "react";

export default function ContactMessageForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setFeedback(null);
        const form = e.currentTarget;
        const formData = new FormData(form);
        setIsSubmitting(true);
        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.get("name"),
              email: formData.get("email"),
              topic: formData.get("topic"),
              message: formData.get("message"),
            }),
          });
          if (!response.ok) {
            const errorData = (await response.json().catch(() => null)) as { error?: string } | null;
            throw new Error(errorData?.error || "Request failed");
          }
          form.reset();
          setFeedback("Thanks, your message was sent.");
        } catch (error) {
          setFeedback(error instanceof Error ? error.message : "Could not send message. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <label className="grid gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">Name</span>
        <input
          type="text"
          name="name"
          className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
          placeholder="Your name"
          autoComplete="name"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">Email</span>
        <input
          type="email"
          name="email"
          className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
          placeholder="you@email.com"
          autoComplete="email"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">Topic</span>
        <select
          name="topic"
          className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
          defaultValue=""
        >
          <option value="" disabled>
            Select a topic
          </option>
          <option value="general">General question</option>
          <option value="partnership">Partnership / wholesale</option>
          <option value="media">Media / press</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label className="grid gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">Message</span>
        <textarea
          name="message"
          rows={5}
          className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
          placeholder="How can we help?"
        />
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full border-2 border-zinc-900 bg-white py-3.5 text-sm font-bold uppercase tracking-wide text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
      {feedback ? <p className="text-sm text-zinc-600">{feedback}</p> : null}
    </form>
  );
}
