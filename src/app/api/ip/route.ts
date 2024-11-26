import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const cfIP = request.headers.get('cf-connecting-ip');
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const trueClientIP = request.headers.get('true-client-ip');

  let ip =
    cfIP || forwardedFor?.split(',')[0] || realIP || trueClientIP || '0.0.0.0';

  if (ip === '::1' || ip === '127.0.0.1') {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      ip = data.ip;
    } catch (error) {
      console.error('Failed to fetch external IP:', error);
    }
  }

  const info = {
    ip,
    userAgent: request.headers.get('user-agent') || '',
    url: request.url,
    geo: request.geo || {},
  };

  return Response.json(info);
}
