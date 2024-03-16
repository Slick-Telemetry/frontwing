import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `Auther`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Authorization', 'Bearer my-secret-token');
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
};
