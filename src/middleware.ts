import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const consolidatedRoutes: Record<string, string> = {
  "/sciatica-stretches-for-immediate-relief": "/sciatica-stretches-for-immediate-relief-with-photos",
  "/sciatica-stretches-immediate-relief": "/sciatica-stretches-for-immediate-relief-with-photos",
  "/sciatica-surgery-when-is-it-necessary": "/sciatica-surgery-when-necessary",
  "/best-mattress-for-sciatica-2026": "/best-mattress-for-sciatica",
  "/best-sleeping-position-for-sciatica": "/best-sleeping-positions-for-sciatica",
  "/sciatica-stretches-relief": "/sciatica-stretches-for-immediate-relief-with-photos",
};

export function middleware(request: NextRequest) {
  const target = consolidatedRoutes[request.nextUrl.pathname];
  if (!target) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = target;
  return NextResponse.redirect(url, 308);
}

export const config = { matcher: "/:path*" };
