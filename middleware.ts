import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Ignore static assets, api routes, next internals, and static file extensions
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/brand") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/Recursos") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Extract host from headers or URL
  const forwardedHost = request.headers.get("x-forwarded-host");
  const hostHeader = request.headers.get("host");
  const nextHostname = request.nextUrl.hostname;
  const rawHost = (forwardedHost || hostHeader || nextHostname || "").toLowerCase();
  const cleanHost = rawHost.split(":")[0].trim();

  // Support domain simulation for local development / testing
  // e.g. http://localhost:3000/?simulate_domain=vatechcolombia.com.co
  const simulatedDomain = searchParams.get("simulate_domain")?.toLowerCase();
  const effectiveHost = simulatedDomain || cleanHost;

  // Check preview bypass: ?preview=vatech or cookie vatech_preview=true
  const previewParam = searchParams.get("preview");
  const hasPreviewCookie = request.cookies.get("vatech_preview")?.value === "true";
  const isBypassed = previewParam === "vatech" || hasPreviewCookie;

  // Determine environments:
  // 1. vatech-one.vercel.app & other vercel preview branches -> Full website
  // 2. localhost & 127.0.0.1 -> Full website
  // 3. vatechcolombia.com.co / www.vatechcolombia.com.co -> Under Construction
  const isVercelApp =
    effectiveHost.endsWith(".vercel.app") || effectiveHost === "vatech-one.vercel.app";
  const isLocalhost =
    effectiveHost === "localhost" || effectiveHost === "127.0.0.1";

  // Production domain check:
  // Applies to vatechcolombia.com.co, www.vatechcolombia.com.co, vatechcolombia.com,
  // and any custom production domain assigned to the project.
  const isUnderConstructionDomain =
    effectiveHost.includes("vatechcolombia.com.co") ||
    effectiveHost.includes("vatechcolombia.com") ||
    (!isVercelApp && !isLocalhost);

  // If on the production domain and not bypassed, rewrite all page requests to /en-construccion
  if (isUnderConstructionDomain && !isBypassed) {
    if (pathname !== "/en-construccion") {
      const url = request.nextUrl.clone();
      url.pathname = "/en-construccion";
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // If authorized preview token provided, set cookie to allow free browsing on the production domain
  if (previewParam === "vatech") {
    const response = NextResponse.next();
    response.cookies.set("vatech_preview", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: "lax",
    });
    return response;
  }

  // Normal routing (vatech-one.vercel.app or local development)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
