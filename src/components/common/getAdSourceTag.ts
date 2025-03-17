export const getAdSourceTag = (t: string | null, hostName: string | null) => {
  const dealAdSourceMap: Record<string, string> = {
    fb_n2s: 'brandclick_n2s_sapip_3163_fb_dealfindr2',
    out_n2s: 'brandclick_n2s_sapip_3163_out_dealfindr2',
    boo_n2s: 'brandclick_n2s_sapip_3163_boo_dealfindr2',
    tiktok_n2s: 'brandclick_n2s_sapip_3163_tiktok_dealfindr2',
    s2s: 'brandclick_n2s_sapip_3163_fb_dealfindr2',
    d2s: 'brandclick_d2s_sapip_3162_gdn_dealfindr2',
    n2s3c: 'brandclick_n2s3c_sapip_12647_dealfindr',
  };

  const dealSearcherAdSourceMap: Record<string, string> = {
    fb_n2s: 'brandclick_n2s_sapip_3163_fb_deal-searcher',
    out_n2s: 'brandclick_n2s_sapip_3163_out_deal-searcher',
    boo_n2s: 'brandclick_n2s_sapip_3163_boo_deal-searcher',
    tiktok_n2s: 'brandclick_n2s_sapip_3163_tiktok_deal-searcher',
    s2s: 'brandclick_s2s_sapip_3161_goog_deal-searcher',
    d2s: 'brandclick_d2s_sapip_3162_gdn_deal-searcher',
    n2s3c: 'brandclick_n2s3c_sapip_12647_deal-searcher',
  };

  const searchableDealAdSourceMap: Record<string, string> = {
    fb_n2s: 'brandclick_n2s_sapip_3163_fb_searchabledeal',
    out_n2s: 'brandclick_n2s_sapip_3163_out_searchabledeal',
    boo_n2s: 'brandclick_n2s_sapip_3163_boo_searchabledeal',
    tiktok_n2s: 'brandclick_n2s_sapip_3163_tiktok_searchabledeal',
    s2s: 'brandclick_s2s_sapip_3161_goog_searchabledeal',
    d2s: 'brandclick_d2s_sapip_3162_gdn_searchabledeal',
    n2s3c: 'brandclick_n2s3c_sapip_12647_searchabledeal',
  };

  const search101AdSourceMap: Record<string, string> = {
    fb_n2s: 'brandclick_n2s_sapip_3163_fb_search-101',
    out_n2s: 'brandclick_n2s_sapip_3163_out_search-101',
    boo_n2s: 'brandclick_n2s_sapip_3163_boo_search-101',
    tiktok_n2s: 'brandclick_n2s_sapip_3163_tiktok_search-101',
    s2s: 'brandclick_s2s_sapip_3161_goog_search-101',
    d2s: 'brandclick_d2s_sapip_3162_gdn_search-101',
    n2s3c: 'brandclick_n2s3c_sapip_12647_search-101',
  };

  const normalizedHost = hostName?.toUpperCase(); // Normalize for case-insensitive comparison

  if (normalizedHost === 'LALHOST' || normalizedHost === 'DEAL-FINDR') {
    return dealAdSourceMap[t ?? ''] || 'brandclick_n2s_sapip_3163_fb_dealfindr2';
  }

  if (normalizedHost === 'DEAL-SEARCHER') {
    return dealSearcherAdSourceMap[t ?? ''] || 'brandclick_n2s_sapip_3163_fb_deal-searcher';
  }

  if (normalizedHost === 'SEARCHABLEDEAL') {
    return searchableDealAdSourceMap[t ?? ''] || 'brandclick_n2s_sapip_3163_fb_searchabledeal';
  }

  if (normalizedHost === 'SEARCH-101') {
    return search101AdSourceMap[t ?? ''] || 'brandclick_n2s_sapip_3163_fb_search-101';
  }

  // Default for other hosts
  return 'brandclick_n2s_sapip_3163_fb_dealfindr2';
};
