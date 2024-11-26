import { headers } from 'next/headers';

export const runtime = 'edge';

export async function GET() {
  const headersList = headers();

  const info = {
    realIp: headersList.get('x-real-ip') || '0.0.0.0',
    ip: headersList.get('request-ip') || '0.0.0.0',
    userAgent: headersList.get('x-real-ua') || '',
    url: headersList.get('request-url') || '',
    geo: JSON.parse(headersList.get('request-geo') || '{}'),
  };

  return new Response(JSON.stringify(info), {
    headers: { 'Content-Type': 'application/json' },
  });
}
