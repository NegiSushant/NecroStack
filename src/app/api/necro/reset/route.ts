import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

export async function POST() {
  try {
    await prismaClient.$transaction([
      prismaClient.reanimated_modules.deleteMany(),
      prismaClient.dead_relics.deleteMany({
        where: {
          relic_code: {
            startsWith: "CUSTOM-",
          },
        },
      }),
      prismaClient.dead_relics.updateMany({
        data: {
          status: "IN_CRYPT",
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message:
        "Crypt reset complete. All 3 seeded relics are back in IN_CRYPT status.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to reset crypt demo",
      },
      { status: 500 },
    );
  }
}
