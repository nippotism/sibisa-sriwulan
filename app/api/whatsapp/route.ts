// app/api/whatsapp/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const wa = await prisma.whatsapp.findFirst();
  if (!wa || !wa.number) {
    return NextResponse.json({ error: "No number set" }, { status: 404 });
  }
  return NextResponse.json({ number: wa.number });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { number } = body;

  // Validasi nomor WhatsApp
  if (!number || typeof number !== "string" || !/^\+?[1-9]\d{1,14}$/.test(number)) {
    return NextResponse.json(
      { error: "Invalid WhatsApp number format" },
      { status: 400 }
    );
  }

  try {
    // Simpan nomor WhatsApp ke database
    await prisma.whatsapp.upsert({
      where: { id: 1 }, // Asumsi hanya ada satu entri
      update: { number },
      create: { number },
    });

    return NextResponse.json({ message: "WhatsApp number updated successfully" });
  } catch (error) {
    console.error("Error updating WhatsApp number:", error);
    return NextResponse.json(
      { error: "Failed to update WhatsApp number" },
      { status: 500 }
    );
  }
}
