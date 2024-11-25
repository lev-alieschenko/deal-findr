import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = forwardedFor?.split(',')[0] || request.ip || '';

  const userAgent = request.headers.get('user-agent') || '';

  const response = NextResponse.next();

  response.headers.set('x-real-ip', realIP);
  response.headers.set('x-real-ua', userAgent);

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
