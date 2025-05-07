import * as jose from 'jose';

export const CONFIG = {
  clientId: '8a5a1638-9231-45a1-89e5-086f41e1f86b',
  clientSecret: 'xwlzSxWo0XJSHf7U/I1mAFjg7fv6NwxhaYvp8S5/HVkF4suX4Q',
  host: 'https://id.b2b.yahooinc.com',
  path: '/identity/oauth2/access_token',
  realm: 'sagw',
  searchAppId: 'ad0ff316',
  serveUrl: 'https://deal-findr.com',
} as const;

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

// Prevent flooding with rapid requests
let lastRequestTime = 0;
const minInterval = 500; // 500ms between requests
const MAX_RETRIES = 2; // Retry limit for transient failures (e.g., 408)

export const searchRequest = async (
  accessToken: string,
  query: string,
  userAgent: string,
  subid?: string,
  page: number = 1,
  clientIP: string = '0.0.0.0',
  marketCode: string = "en-US",
  adSourceTag: string = 'brandclick_s2s_sapip_3161_goog_dealfindr2'
): Promise<any> => {
  const delayIfNeeded = async () => {
    const currentTime = Date.now();
    const timeSinceLastRequest = currentTime - lastRequestTime;
    if (timeSinceLastRequest < minInterval) {
      await new Promise((resolve) =>
        setTimeout(resolve, minInterval - timeSinceLastRequest)
      );
    }
    lastRequestTime = Date.now();
  };

  const buildSearchUrl = (): string => {
    const searchUrl = new URL('https://api.search.yahoo.com/sdata/v3/search');
    const searchParams = {
      appid: CONFIG.searchAppId,
      query: query,
      market: marketCode,
      uIP: clientIP,
      serveUrl: CONFIG.serveUrl,
      features: 'ads.pla,ads,ads.north,ads.east',
      adSourceTag,
      adType: subid || 'textpla',
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
    return searchUrl.toString();
  };

  const attemptSearch = async (retry: number = 0): Promise<any> => {
    await delayIfNeeded();
    const url = buildSearchUrl();
    console.log('Search URL:', url);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': userAgent,
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Connection: 'keep-alive',
        },
        redirect: "follow"
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMsg =
          errorData?.error?.message || `HTTP error! status: ${response.status}`;

        if (response.status === 408 && retry < MAX_RETRIES) {
          console.warn(`Retrying (${retry + 1}) due to 408 Timeout...`);
          await new Promise(res => setTimeout(res, 1000)); // wait 1 second before retry
          return attemptSearch(retry + 1);
        }

        throw new Error(errorMsg);
      }

      return await response.json();
    } catch (error: any) {
      console.error('Search request failed:', error);
      throw new Error(error.message || 'Search request failed');
    }
  };

  return attemptSearch();
};
