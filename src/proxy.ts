import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuthToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("necro_session")?.value;
  const session = token ? await verifyAuthToken(token) : null;

  const isProtectedPath =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isAuthPath = pathname === "/signin" || pathname === "/signup";

  // 1. Protected route guard
  if (isProtectedPath && !session) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 2. Auth page guard (redirect already logged-in users away from signin/signup)
  if (isAuthPath && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};

