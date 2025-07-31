import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    // console.log("Fetched Users:", users);
    return NextResponse.json(users);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const userData = {
      name: body.name,
      numberPhone: body.numberPhone,
      email: body.email,
      beratSampah: 0,
      besi: body.besi ?? 0,
      kaca: body.kaca ?? 0,
      kertas: body.kertas ?? 0,
      plastik: body.plastik ?? 0,
      sterofoam: body.sterofoam ?? 0,
      totalWeight: body.totalWeight ?? 0,
      totalPoints: body.totalPoints ?? 0,
    };

    const user = await prisma.user.create({
      data: userData,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
