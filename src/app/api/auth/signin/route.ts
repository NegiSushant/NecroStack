import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";
import { verifyPassword, signAuthToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Query user
    const user = await prismaClient.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or ritual password." },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Invalid email or ritual password." },
        { status: 401 }
      );
    }

    const now = new Date();
    await prismaClient.user.update({
      where: { id: user.id },
      data: { lastSignInAt: now },
    });

    const token = await signAuthToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      lastSignInAt: now,
      createdAt: user.createdAt,
    };

    const response = NextResponse.json({
      success: true,
      user: safeUser,
    });

    response.cookies.set("necro_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to authenticate session." },
      { status: 500 }
    );
  }
}

