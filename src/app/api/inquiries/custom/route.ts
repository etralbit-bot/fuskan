import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

type CustomInquiryPayload = {
  productLabel?: string;
  quantity?: string;
  targetDate?: string;
  fullName?: string;
  company?: string;
  email?: string;
  phone?: string;
  notes?: string;
  selectionsSummary?: string | null;
};

export async function POST(request: Request) {
  if (!writeClient) {
    return NextResponse.json(
      { error: "Sanity write token is missing. Set SANITY_API_WRITE_TOKEN in env." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as CustomInquiryPayload;
  if (!body.fullName || !body.email) {
    return NextResponse.json({ error: "Full name and email are required." }, { status: 400 });
  }

  await writeClient.create({
    _type: "customInquiry",
    productLabel: body.productLabel || "",
    quantity: body.quantity || "",
    targetDate: body.targetDate || "",
    fullName: body.fullName,
    company: body.company || "",
    email: body.email,
    phone: body.phone || "",
    notes: body.notes || "",
    selectionsSummary: body.selectionsSummary || "",
    submittedAt: new Date().toISOString(),
    status: "new",
  });

  return NextResponse.json({ ok: true });
}
