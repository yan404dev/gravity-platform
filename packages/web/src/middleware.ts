import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // PASS-THROUGH MIDDLEWARE - MOCKED AUTH
  // In a real app with Supabase, we would check for sessions here.
  // For now, we allow all requests or rely on client-side mocks.

  // If you want to simulate protections, you could check for a dummy cookie here.

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
