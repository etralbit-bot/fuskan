import type { ReactNode } from "react";

type LegalPageShellProps = {
  eyebrow?: string;
  title: string;
  lastUpdated?: string;
  children: ReactNode;
};

/**
 * Shared layout for legal documents: readable width, spacing, and bottom margin before the site footer.
 */
export default function LegalPageShell({
  eyebrow = "Legal",
  title,
  lastUpdated = "April 2026",
  children,
}: LegalPageShellProps) {
  return (
    <article className="mx-auto max-w-4xl space-y-8 pb-24 pt-2 md:pb-32">
      <header className="rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white px-6 py-8 md:px-8 md:py-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-zinc-900 md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-zinc-500">Last updated: {lastUpdated}</p>
      </header>
      <div className="prose-legal rounded-3xl border border-zinc-200 bg-white p-6 text-sm leading-relaxed text-zinc-700 shadow-sm md:p-8 md:text-base [&_h2]:mt-10 [&_h2]:text-xs [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-[0.18em] [&_h2]:text-zinc-900 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:marker:text-zinc-400">
        {children}
      </div>
    </article>
  );
}
