"use client";

import {
  EMBROIDERY_TYPE_OPTIONS,
  FABRIC_GSM_OPTIONS,
  PRINTING_TYPE_OPTIONS,
} from "@/lib/productOptions";

type StandardProductOptionsFormProps = {
  selections: Record<string, string | boolean>;
  onSelect: (id: string, value: string) => void;
  onToggle: (id: string, value: boolean) => void;
};

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5">
      <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${checked ? "bg-zinc-900" : "bg-zinc-300"}`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition ${checked ? "left-6" : "left-0.5"}`}
        />
      </button>
    </div>
  );
}

export default function StandardProductOptionsForm({
  selections,
  onSelect,
  onToggle,
}: StandardProductOptionsFormProps) {
  const printingOn = Boolean(selections.printing);
  const embroideryOn = Boolean(selections.embroidery);

  return (
    <div className="grid gap-4">
      <ToggleRow
        label="Embroidery"
        checked={embroideryOn}
        onChange={(v) => onToggle("embroidery", v)}
      />
      {embroideryOn && (
        <label className="grid gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">
            Embroidery type
          </span>
          <select
            value={String(selections.embroideryType ?? EMBROIDERY_TYPE_OPTIONS[0])}
            onChange={(e) => onSelect("embroideryType", e.target.value)}
            className="rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900"
          >
            {EMBROIDERY_TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="grid gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">
          Leather thickness wanted
        </span>
        <select
          value={String(selections.fabricGsm ?? "250")}
          onChange={(e) => onSelect("fabricGsm", e.target.value)}
          className="rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900"
        >
          {FABRIC_GSM_OPTIONS.map((gsm) => (
            <option key={gsm} value={gsm}>
              {gsm} mm
            </option>
          ))}
        </select>
      </label>
      <ToggleRow
        label="Printing"
        checked={printingOn}
        onChange={(v) => onToggle("printing", v)}
      />
      {printingOn && (
        <label className="grid gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-700">
            Printing type
          </span>
          <select
            value={String(selections.printingType ?? PRINTING_TYPE_OPTIONS[0])}
            onChange={(e) => onSelect("printingType", e.target.value)}
            className="rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900"
          >
            {PRINTING_TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      )}
      <ToggleRow
        label="Inside labels"
        checked={Boolean(selections.neckLabels)}
        onChange={(v) => onToggle("neckLabels", v)}
      />
      <ToggleRow
        label="Custom tags"
        checked={Boolean(selections.customTags)}
        onChange={(v) => onToggle("customTags", v)}
      />
      <ToggleRow
        label="Custom packaging"
        checked={Boolean(selections.customBags)}
        onChange={(v) => onToggle("customBags", v)}
      />
      <ToggleRow
        label="Sample required first"
        checked={Boolean(selections.sampleFirst)}
        onChange={(v) => onToggle("sampleFirst", v)}
      />
    </div>
  );
}
