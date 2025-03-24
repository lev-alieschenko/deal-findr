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

  const crazySearchAdSourceMap: Record<string, string> = {
    fb_n2s: 'brandclick_n2s_sapip_3163_fb_crazy-search',
    out_n2s: 'brandclick_n2s_sapip_3163_out_crazy-search',
    boo_n2s: 'brandclick_n2s_sapip_3163_boo_crazy-search',
    tiktok_n2s: 'brandclick_n2s_sapip_3163_tiktok_crazy-search',
    s2s: 'brandclick_s2s_sapip_3161_crazy-search',
    d2s: 'brandclick_d2s_sapip_3162_crazy-search',
    n2s3c: 'brandclick_n2s3c_sapip_12647_crazy-search',
  };

  const tofindnowAdSourceMap: Record<string, string> = {
    fb_n2s: 'brandclick_n2s_sapip_3163_fb_tofindnow',
    out_n2s: 'brandclick_n2s_sapip_3163_out_tofindnow',
    boo_n2s: 'brandclick_n2s_sapip_3163_boo_tofindnow',
    tiktok_n2s: 'brandclick_n2s_sapip_3163_tiktok_tofindnow',
    s2s: 'brandclick_s2s_sapip_3161_tofindnow',
    d2s: 'brandclick_d2s_sapip_3162_tofindnow',
    n2s3c: 'brandclick_n2s3c_sapip_12647_tofindnow',
  };

  const gofinditnowAdSourceMap: Record<string, string> = {
    fb_n2s: 'brandclick_n2s_sapip_3163_fb_gofinditnow',
    out_n2s: 'brandclick_n2s_sapip_3163_out_gofinditnow',
    boo_n2s: 'brandclick_n2s_sapip_3163_boo_gofinditnow',
    tiktok_n2s: 'brandclick_n2s_sapip_3163_tiktok_gofinditnow',
    s2s: 'brandclick_s2s_sapip_3161_gofinditnow',
    d2s: 'brandclick_d2s_sapip_3162_gofinditnow',
    n2s3c: 'brandclick_n2s3c_sapip_12647_gofinditnow',
  };

  const supersearchesAdSourceMap: Record<string, string> = {
    fb_n2s: 'brandclick_n2s_sapip_3163_fb_supersearches',
    out_n2s: 'brandclick_n2s_sapip_3163_out_supersearches',
    boo_n2s: 'brandclick_n2s_sapip_3163_boo_supersearches',
    tiktok_n2s: 'brandclick_n2s_sapip_3163_tiktok_supersearches',
    s2s: 'brandclick_s2s_sapip_3161_supersearches',
    d2s: 'brandclick_d2s_sapip_3162_supersearches',
    n2s3c: 'brandclick_n2s3c_sapip_12647_supersearches',
  };

  const topsearchsAdSourceMap: Record<string, string> = {
    fb_n2s: 'brandclick_n2s_sapip_3163_fb_topsearchs',
    out_n2s: 'brandclick_n2s_sapip_3163_out_topsearchs',
    boo_n2s: 'brandclick_n2s_sapip_3163_boo_topsearchs',
    tiktok_n2s: 'brandclick_n2s_sapip_3163_tiktok_topsearchs',
    s2s: 'brandclick_s2s_sapip_3161_topsearchs',
    d2s: 'brandclick_d2s_sapip_3162_topsearchs',
    n2s3c: 'brandclick_n2s3c_sapip_12647_topsearchs',
  };

  const topsearchlistsAdSourceMap: Record<string, string> = {
    fb_n2s: 'brandclick_n2s_sapip_3163_fb_topsearchlists',
    out_n2s: 'brandclick_n2s_sapip_3163_out_topsearchlists',
    boo_n2s: 'brandclick_n2s_sapip_3163_boo_topsearchlists',
    tiktok_n2s: 'brandclick_n2s_sapip_3163_tiktok_topsearchlists',
    s2s: 'brandclick_s2s_sapip_3161_topsearchlists',
    d2s: 'brandclick_d2s_sapip_3162_topsearchlists',
    n2s3c: 'brandclick_n2s3c_sapip_12647_topsearchlists',
  };

  const topsearchlistAdSourceMap: Record<string, string> = {
    fb_n2s: 'brandclick_n2s_sapip_3163_fb_topsearchlist',
    out_n2s: 'brandclick_n2s_sapip_3163_out_topsearchlist',
    boo_n2s: 'brandclick_n2s_sapip_3163_boo_topsearchlist',
    tiktok_n2s: 'brandclick_n2s_sapip_3163_tiktok_topsearchlist',
    s2s: 'brandclick_s2s_sapip_3161_topsearchlist',
    d2s: 'brandclick_d2s_sapip_3162_topsearchlist',
    n2s3c: 'brandclick_n2s3c_sapip_12647_topsearchlist',
  };

  const searchingbetterAdSourceMap: Record<string, string> = {
    fb_n2s: 'brandclick_n2s_sapip_3163_fb_searchingbetter',
    out_n2s: 'brandclick_n2s_sapip_3163_out_searchingbetter',
    boo_n2s: 'brandclick_n2s_sapip_3163_boo_searchingbetter',
    tiktok_n2s: 'brandclick_n2s_sapip_3163_tiktok_searchingbetter',
    s2s: 'brandclick_s2s_sapip_3161_searchingbetter',
    d2s: 'brandclick_d2s_sapip_3162_searchingbetter',
    n2s3c: 'brandclick_n2s3c_sapip_12647_searchingbetter',
  };

  const finderquickAdSourceMap: Record<string, string> = {
    fb_n2s: 'brandclick_n2s_sapip_3163_fb_finderquick',
    out_n2s: 'brandclick_n2s_sapip_3163_out_finderquick',
    boo_n2s: 'brandclick_n2s_sapip_3163_boo_finderquick',
    tiktok_n2s: 'brandclick_n2s_sapip_3163_tiktok_finderquick',
    s2s: 'brandclick_s2s_sapip_3161_finderquick',
    d2s: 'brandclick_d2s_sapip_3162_finderquick',
    n2s3c: 'brandclick_n2s3c_sapip_12647_finderquick',
  };

  const alwaysdealsAdSourceMap: Record<string, string> = {
    fb_n2s: 'brandclick_n2s_sapip_3163_fb_always-deals',
    out_n2s: 'brandclick_n2s_sapip_3163_out_always-deals',
    boo_n2s: 'brandclick_n2s_sapip_3163_boo_always-deals',
    tiktok_n2s: 'brandclick_n2s_sapip_3163_tiktok_always-deals',
    s2s: 'brandclick_s2s_sapip_3161_always-deals',
    d2s: 'brandclick_d2s_sapip_3162_always-deals',
    n2s3c: 'brandclick_n2s3c_sapip_12647_always-deals',
  };

  const normalizedHost = hostName?.toUpperCase(); // Normalize for case-insensitive comparison

  if (normalizedHost === 'LOCALHOST' || normalizedHost === 'DEAL-FINDR') {
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

  if (normalizedHost === 'CRAZY-SEARCH') {
    return crazySearchAdSourceMap[t ?? ''] || 'brandclick_n2s_sapip_3163_fb_crazy-search';
  }

  if (normalizedHost === 'TOFINDNOW') {
    return tofindnowAdSourceMap[t ?? ''] || 'brandclick_n2s_sapip_3163_fb_tofindnow';
  }

  if (normalizedHost === 'GOFINDITNOW') {
    return gofinditnowAdSourceMap[t ?? ''] || 'brandclick_n2s_sapip_3163_fb_gofinditnow';
  }

  if (normalizedHost === 'SUPERSEARCHES') {
    return supersearchesAdSourceMap[t ?? ''] || 'brandclick_n2s_sapip_3163_fb_supersearches';
  }

  if (normalizedHost === 'TOPSEARCHES') {
    return topsearchsAdSourceMap[t ?? ''] || 'brandclick_n2s_sapip_3163_fb_topsearchs';
  }

  if (normalizedHost === 'TOPSEARCHELISTS') {
    return topsearchlistsAdSourceMap[t ?? ''] || 'brandclick_n2s_sapip_3163_fb_topsearchlists';
  }

  if (normalizedHost === 'TOPSEARCHELIST') {
    return topsearchlistAdSourceMap[t ?? ''] || 'brandclick_n2s_sapip_3163_fb_topsearchlist';
  }

  if (normalizedHost === 'SEARCHINGBETTER') {
    return searchingbetterAdSourceMap[t ?? ''] || 'brandclick_n2s_sapip_3163_fb_searchingbetter';
  }

  if (normalizedHost === 'FINDERQUICK') {
    return finderquickAdSourceMap[t ?? ''] || 'brandclick_n2s_sapip_3163_fb_finderquick';
  }

  if (normalizedHost === 'ALWAYS-DEALS') {
    return alwaysdealsAdSourceMap[t ?? ''] || 'brandclick_n2s_sapip_3163_fb_always-deals';
  }

  // Default for other hosts
  return 'brandclick_n2s_sapip_3163_fb_dealfindr2';
};
