import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

type ContactPayload = {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
};

export async function POST(request: Request) {
  if (!writeClient) {
    return NextResponse.json(
      { error: "Sanity write token is missing. Set SANITY_API_WRITE_TOKEN in env." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as ContactPayload;
  if (!body.name || !body.email || !body.topic || !body.message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  await writeClient.create({
    _type: "contactMessage",
    name: body.name,
    email: body.email,
    topic: body.topic,
    message: body.message,
    submittedAt: new Date().toISOString(),
    status: "new",
  });

  return NextResponse.json({ ok: true });
}
