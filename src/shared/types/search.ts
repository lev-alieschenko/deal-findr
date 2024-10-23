export interface IdentityBody {
  grant_type: string;
  client_assertion_type: string;
  client_assertion: string;
  realm: string;
  scope: string;
}

export interface AccessTokenResponse {
  access_token: string;
  expires_in?: number;
  token_type?: string;
}

export interface SearchResponse {
  response?: {
    search?: {
      results?: {
        'ads.north'?: {
          data: AdData[];
          meta: any;
        };
        'ads.east'?: {
          data: AdData[];
          meta: any;
        };
      };
    };
    status?: {
      code: number;
      message: string;
    };
  };
  error?: {
    code?: string;
    message?: string;
  };
}

export interface AdData {
  title: string;
  abstract: string;
  displayUrl: string;
  url: string;
  siteLinks?: {
    value: SiteLink[];
  };
  merchantRating?: {
    domain: string;
    rating: number;
    numRating: number;
  };
  calloutExtension?: {
    value: { text: string }[];
  };
  actionExtension?: {
    value: { text: string; url: string }[];
  };
}

export interface SiteLink {
  text: string;
  url: string;
  snippet?: string;
  snippet2?: string;
}
