import { NextRequest } from 'next/server';
import {
  generateJWT,
  getAccessToken,
  searchRequest,
} from '@/shared/utils/search-api';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const userAgent = request.headers.get('user-agent') || '';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIP = forwardedFor?.split(',')[0] || request.ip || '';

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const subid = searchParams.get('subid');

    if (!query) {
      return new Response('Query parameter is required', { status: 400 });
    }

    const jwt = await generateJWT();
    const accessToken = await getAccessToken(jwt);
    const searchResults = await searchRequest(
      accessToken,
      query,
      userAgent,
      subid || 'textpla'
    );

    return new Response(JSON.stringify(searchResults), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
