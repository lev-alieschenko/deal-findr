import { SearchResultsProps } from '@/components/SearchResults';
import * as jose from 'jose';

export const CONFIG = {
  clientId: '8a5a1638-9231-45a1-89e5-086f41e1f86b',
  clientSecret: 'xwlzSxWo0XJSHf7U/I1mAFjg7fv6NwxhaYvp8S5/HVkF4suX4Q',
  host: 'https://id.b2b.yahooinc.com',
  path: '/identity/oauth2/access_token',
  realm: 'sagw',
  searchAppId: 'ad0ff316',
  serveUrl: 'https://deal-findr.pages.dev/',
} as const;

export const getIpAddress = async (): Promise<string> => {
  try {
    const response = await fetch('https://hutils.loxal.net/whois');
    const data = await response.json();
    return data.ip || '0.0.0.0';
  } catch (error) {
    console.error('Failed to get IP address:', error);
    return '0.0.0.0';
  }
};

export const generateJWT = async (): Promise<string> => {
  try {
    const aud = `${CONFIG.host}${CONFIG.path}?realm=${CONFIG.realm}`;
    const secret = new TextEncoder().encode(CONFIG.clientSecret);
    const now = Math.floor(Date.now() / 1000);
    const exp = now + 600;

    return await new jose.SignJWT({
      iss: CONFIG.clientId,
      sub: CONFIG.clientId,
      aud: aud,
      iat: now,
      exp: exp,
    })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .sign(secret);
  } catch (error) {
    console.error('JWT Generation Error:', error);
    throw new Error('Failed to generate JWT');
  }
};

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const getAccessToken = async (jwt: string): Promise<string> => {
  const identityBody = new URLSearchParams({
    grant_type: 'client_credentials',
    client_assertion_type:
      'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion: jwt,
    realm: CONFIG.realm,
    scope: 'sdata',
  });

  try {
    const response = await fetch(`${CONFIG.host}${CONFIG.path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: identityBody.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: AccessTokenResponse = await response.json();

    if (!data.access_token) {
      throw new Error('No access token in response');
    }

    return data.access_token;
  } catch (error: any) {
    console.error('Access token request failed:', error);
    throw new Error(`Failed to obtain access token: ${error.message}`);
  }
};

export const searchRequest = async (
  accessToken: string,
  query: string,
  subid?: string,
  page: number = 1,
  resultsPerPage: number = 10
): Promise<any> => {
  const ip = await getIpAddress();
  const searchUrl = new URL('https://api.search.yahoo.com/sdata/v3/search');

  const searchParams = {
    appid: CONFIG.searchAppId,
    query: query,
    market: 'en-US',
    uIP: ip,
    serveUrl: CONFIG.serveUrl,
    features: 'ads.pla,ads,ads.north,ads.east',
    adSourceTag: 'brandclick_s2s_sapip_3161_goog_dealfindr2',
    adType: subid || 'text,pla',
    'ads-review': '1',
    'ads-sitelink': '1',
    'ads-merchantRating': '1',
    'ads-callout': '1',
    'ads-action': '1',
    'ads-longAdTitle': '1',
    'ads-fourthLine': '1',
    'ads.north-count': '10',
    'ads.east-count': '10',
    'ads-image': '1',
    'ads-favicon': '1',
    'ads.pla-eliteBadge': '1',
    'ads.pla-priceDrop': '1',
    'ads-page': page.toString(),
  };

  Object.entries(searchParams).forEach(([key, value]) => {
    searchUrl.searchParams.append(key, value);
  });

  try {
    const response = await fetch(searchUrl.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.error?.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  } catch (error: any) {
    console.error('Search request failed:', error);
    throw new Error(error.message || 'Search request failed');
  }
};
