import { NextRequest, NextResponse } from 'next/server';
import {
  generateJWT,
  getAccessToken,
  searchRequest,
} from '@/shared/utils/search-api';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const userAgent = request.headers.get('user-agent') || '';
    const searchParams = request.nextUrl.searchParams;

    const query = searchParams.get('query');
    const subid = searchParams.get('subid');
    const clientIP = searchParams.get('clientIP');

    if (!clientIP) {
      return NextResponse.json(
        { error: 'Client IP is required' },
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const jwt = await generateJWT();
    const accessToken = await getAccessToken(jwt);
    const searchResults = await searchRequest(
      accessToken,
      query,
      userAgent,
      subid || 'textpla',
      1,
      clientIP
    );

    return NextResponse.json(searchResults, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
