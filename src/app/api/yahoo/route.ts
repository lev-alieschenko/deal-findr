import { getAdSourceTag } from "@/components/common/getAdSourceTag";
import {
  generateJWT,
  getAccessToken,
  searchRequest,
} from '@/shared/utils/search-api';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Search request timed out'));
    }, timeoutMs);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

export async function GET(request: NextRequest) {
  const start = Date.now();

  try {
    const userAgent = request.headers.get('user-agent') || '';
    const searchParams = request.nextUrl.searchParams;

    const query = searchParams.get('query');
    const t = searchParams.get('t');
    const hostName = searchParams.get('hostName');
    const subid = searchParams.get('subid');
    const clientIP = searchParams.get('clientIP');
    const marketCode = searchParams.get('marketCode');

    if (!clientIP || !marketCode || !query) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const jwt = await generateJWT();
    const accessToken = await getAccessToken(jwt);
    const adSourceTag = await getAdSourceTag(t, hostName);

    const searchResults = await withTimeout(
      searchRequest(
        accessToken,
        query,
        userAgent,
        subid || 'textpla',
        1,
        clientIP,
        marketCode,
        adSourceTag
      ),
      5000 // timeout in milliseconds
    );

    const duration = Date.now() - start;
    console.log(`Search completed in ${duration}ms`);

    return new Response(JSON.stringify(searchResults), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    const duration = Date.now() - start;
    console.error(`Error after ${duration}ms:`, error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
