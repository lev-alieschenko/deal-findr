import { getAdSourceTag } from "@/components/common/getAdSourceTag";
import {
  generateJWT,
  getAccessToken,
  searchRequest,
} from '@/shared/utils/search-api';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const searchParams = request.nextUrl.searchParams;

    const query = searchParams.get('query');
    const t = searchParams.get('t');
    const subid = searchParams.get('subid');
    const clientIP = searchParams.get('clientIP');
    const marketCode = searchParams.get('marketCode');

    if (!clientIP) {
      return new Response(JSON.stringify({ error: 'Client IP is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!marketCode) {
      return new Response(JSON.stringify({ error: 'MarketCode is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const jwt = await generateJWT();
    const accessToken = await getAccessToken(jwt);
    const adSourceTag = await getAdSourceTag(t);
    const searchResults = await searchRequest(
      accessToken,
      query,
      userAgent,
      subid || 'textpla',
      1,
      clientIP,
      marketCode,
      adSourceTag
    );

    return new Response(JSON.stringify(searchResults), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
