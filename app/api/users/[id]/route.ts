import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const body = await request.json();
    const { besi, kaca, kertas, plastik, sterofoam } = body;

    // Validasi input
    if (
      typeof besi !== "number" ||
      typeof kaca !== "number" ||
      typeof kertas !== "number" ||
      typeof plastik !== "number" ||
      typeof sterofoam !== "number" ||
      besi < 0 ||
      kaca < 0 ||
      kertas < 0 ||
      plastik < 0 ||
      sterofoam < 0
    ) {
      return NextResponse.json(
        { error: "Invalid values for waste types" },
        { status: 400 }
      );
    }

    // Get the existing user
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Accumulate new values
    const updatedBesi = (existingUser.besi || 0) + besi;
    const updatedKaca = (existingUser.kaca || 0) + kaca;
    const updatedKertas = (existingUser.kertas || 0) + kertas;
    const updatedPlastik = (existingUser.plastik || 0) + plastik;
    const updatedSterofoam = (existingUser.sterofoam || 0) + sterofoam;

    const updatedTotalWeight =
      updatedBesi +
      updatedKaca +
      updatedKertas +
      updatedPlastik +
      updatedSterofoam;

    const updatedTotalPoints =
      updatedBesi * 5000 +
      updatedKaca * 4000 +
      updatedKertas * 3000 +
      updatedPlastik * 2000 +
      updatedSterofoam * 1000;

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        besi: updatedBesi,
        kaca: updatedKaca,
        kertas: updatedKertas,
        plastik: updatedPlastik,
        sterofoam: updatedSterofoam,
        totalWeight: updatedTotalWeight,
        totalPoints: updatedTotalPoints,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
} 

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10); // Konversi id ke number

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    // Menghapus user berdasarkan ID
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
