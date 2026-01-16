import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  try {
    // ✅ clone request headers
    const requestHeaders = new Headers(request.headers);

    // ✅ attach full URL to REQUEST headers
    requestHeaders.set("x-full-url", request.nextUrl.href);

    const session = await auth.api.getSession({
      headers: await headers()
    });

    const pathname = request.nextUrl.pathname;

    if (!session) {
      if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
        // ✅ pass modified REQUEST headers forward
        return NextResponse.next({
          request: { headers: requestHeaders },
        });
      }

      return NextResponse.redirect(
        new URL(`/login?redirectUrl=${pathname}`, request.url)
      );
    }

    if (pathname.startsWith("/admin")) {
      if (session.user.role !== "admin") {
        return NextResponse.redirect(
          new URL(request.headers.get("referer") || "/dashboard", request.url)
        );
      }
    }

    // ✅ pass modified REQUEST headers forward
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/profile",
    "/buy:path*",
    "/settings",
    "/notifications",
    "/swap",
    "/card",
    "/referral",
    "/send/:path*",
    "/bot/:path*",
    "/receive/:path*",
    "/crypto/:path*",
  ]
};