import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // TODO: Get content type (chapter, entry) and redirect to "UI-ready" route like /chapter/:slug
  const nextUrl = request.nextUrl;
  return NextResponse.redirect(new URL(nextUrl, request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/node/:path*'],
};