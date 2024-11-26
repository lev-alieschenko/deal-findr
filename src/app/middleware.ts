import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = forwardedFor?.split(',')[0] || request.ip || '';
  const userAgent = request.headers.get('user-agent') || '';

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-real-ip', realIP);
  requestHeaders.set('x-real-ua', userAgent);
  requestHeaders.set('request-ip', request.ip || '');
  requestHeaders.set('request-url', request.url);
  requestHeaders.set('request-geo', JSON.stringify(request.geo));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/api/:path*',
};
