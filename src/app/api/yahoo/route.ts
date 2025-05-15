import { getAdSourceTag } from "@/components/common/getAdSourceTag";
import {
  generateJWT,
  getAccessToken,
  searchRequest,
} from '@/shared/utils/search-api';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getCachedAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now) {
    return cachedToken.value;
  }

  const jwtStart = now;
  const jwt = await generateJWT();
  console.log(`JWT generated in ${Date.now() - jwtStart}ms`);

  const tokenStart = Date.now();
  const accessToken = await getAccessToken(jwt);
  console.log(`Access token retrieved in ${Date.now() - tokenStart}ms`);

  cachedToken = {
    value: accessToken,
    expiresAt: now + 5 * 60 * 1000, // 5 minutes cache
  };

  return accessToken;
}

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
    // const clientIP = searchParams.get('clientIP');
    // const marketCode = searchParams.get('marketCode');
    const clientIP = searchParams.get('clientIP');
    const marketCode = searchParams.get('marketCode');

    if (!clientIP || !marketCode || !query) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await withTimeout(
      (async () => {
        const [accessToken, adSourceTag] = await Promise.all([
          getCachedAccessToken(),
          getAdSourceTag(t, hostName)
        ]);

        const searchStart = Date.now();
        const response = await searchRequest(
          accessToken,
          query,
          userAgent,
          subid || 'textpla',
          1,
          clientIP,
          marketCode,
          adSourceTag
        );
        console.log(`Search executed in ${Date.now() - searchStart}ms`);
        const forwarded = request.headers.get('x-forwarded-for');
        const countryCode = request.headers.get('x-vercel-ip-country');
        const ip = forwarded?.split(',')[0]?.trim() || request.ip || 'Unknown';
        response.ip = ip;
        response.marketCode = countryCode;
        return response;
      })(),
      8000 // total timeout: 8 seconds
    );

    const duration = Date.now() - start;
    console.log(`Search completed in ${duration}ms`);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    const duration = Date.now() - start;
    console.error(`Error after ${duration}ms:`, error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.message?.includes("timed out") ? 408 : 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
