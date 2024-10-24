import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

const PUBLIC_FILE = /\.(.*)$/;

export default async function middleware(req: NextRequest) {
  if (PUBLIC_FILE.test(req.nextUrl.pathname)) {
    return;
  }

  if (req.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!api|static|.*\\..*|_next|favicon.ico|woff|woff2?|robots.txt).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
