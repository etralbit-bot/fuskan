import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

type ProductInquiryPayload = {
  productName?: string;
  productSlug?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  notes?: string;
  selections?: Record<string, string | boolean>;
};

export async function POST(request: Request) {
  if (!writeClient) {
    return NextResponse.json(
      { error: "Sanity write token is missing. Set SANITY_API_WRITE_TOKEN in env." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as ProductInquiryPayload;
  if (!body.productName || !body.productSlug || !body.fullName || !body.email) {
    return NextResponse.json(
      { error: "Product, full name, and email are required." },
      { status: 400 },
    );
  }

  await writeClient.create({
    _type: "productInquiry",
    productName: body.productName,
    productSlug: body.productSlug,
    fullName: body.fullName,
    email: body.email,
    phone: body.phone || "",
    notes: body.notes || "",
    selectionsJson: JSON.stringify(body.selections ?? {}, null, 2),
    submittedAt: new Date().toISOString(),
    status: "new",
  });

  return NextResponse.json({ ok: true });
}
