export const INQUIRIES_STORAGE_KEY = "fuskan_submitted_inquiries";

export type SubmittedInquiry = {
  id: string;
  type: "product" | "custom";
  productName: string;
  status: "Pending";
  date: string;
};

function safeParse(value: string | null): SubmittedInquiry[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is SubmittedInquiry =>
        item &&
        typeof item.id === "string" &&
        (item.type === "product" || item.type === "custom") &&
        typeof item.productName === "string" &&
        item.status === "Pending" &&
        typeof item.date === "string",
    );
  } catch {
    return [];
  }
}

export function readSubmittedInquiries(): SubmittedInquiry[] {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(INQUIRIES_STORAGE_KEY));
}

export function saveSubmittedInquiry(inquiry: Omit<SubmittedInquiry, "id" | "status" | "date">) {
  if (typeof window === "undefined") return;
  const existing = readSubmittedInquiries();
  const entry: SubmittedInquiry = {
    id: `INQ-${Date.now()}`,
    type: inquiry.type,
    productName: inquiry.productName,
    status: "Pending",
    date: new Date().toISOString().slice(0, 10),
  };
  window.localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify([entry, ...existing]));
  window.dispatchEvent(new Event("submitted-inquiries-changed"));
}
