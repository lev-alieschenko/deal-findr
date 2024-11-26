import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment) {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return Response.json({
        ip: data.ip,
        userAgent: request.headers.get('user-agent') || '',
        url: request.url,
        geo: request.geo || {},
      });
    } catch (error) {
      console.error('Failed to fetch IP:', error);
    }
  }

  const cfIP = request.headers.get('cf-connecting-ip');
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const trueClientIP = request.headers.get('true-client-ip');
  const cfIPv4 = request.headers.get('cf-connecting-ipv4');

  let ip =
    cfIPv4 ||
    forwardedFor?.split(',')[0].match(/(\d+\.){3}\d+/)?.[0] ||
    cfIP ||
    realIP ||
    trueClientIP ||
    '0.0.0.0';

  if (ip.includes(':')) {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      ip = data.ip;
    } catch (error) {
      console.error('Failed to fetch IPv4:', error);
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
