import { updateSession } from "@/app/lib/supabase/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = [
  "/",
  "/about",
  "/contact",
  "/suites",
  "/amenities",
  "/gallery",
  "/auth",
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = publicPaths.some(
      (publicPath) => path === publicPath || path.startsWith(`${publicPath}/`)
  );

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
