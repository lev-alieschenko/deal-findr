import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
import {
  generateJWT,
  getAccessToken,
  searchRequest,
} from '@/shared/utils/search-api';

export async function GET(request: NextRequest) {
  try {
    const headersList = headers();
    const realIP = headersList.get('x-real-ip');
    const realUA = headersList.get('x-real-ua');

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
      realUA || '',
      subid || 'textpla'
    );

    return new Response(JSON.stringify(searchResults), {
      headers: {
        'Content-Type': 'application/json',
        'X-User-IP': realIP || '',
        'X-User-UA': realUA || '',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
