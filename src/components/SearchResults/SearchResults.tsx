'use client';

import { useEffect, useState } from 'react';
import { TextAdList } from '../TextAdsList';
import { useAppContext } from '../context';
import { PaginationControl } from '../PaginationControl';
import { TEXT_ADS_PER_PAGE } from '../common/constants';
import ProductAdList from '../ProductAdsList/ProductAdList';

export interface SearchResultsProps {
  results: {
    response?: {
      search?: {
        results?: {
          'ads.north'?: {
            data: Array<{
              title: string;
              url: string;
              abstract: string;
              displayUrl: string;
              siteLinks?: {
                value: Array<{
                  text: string;
                  url: string;
                  snippet?: string;
                  snippet2?: string;
                }>;
              };
              iconUrl?: string;
              merchantRating?: {
                domain: string;
                rating: number;
                numRating: number;
              };
            }>;
            instrumentation: {
              ClientID: string;
              ImpressionGUID: string;
              SearchID: string;
              rguid: string;
            };
          };
          'ads.east'?: {
            data: any[];
            instrumentation: {
              ClientID: string;
              ImpressionGUID: string;
              SearchID: string;
              rguid: string;
            };
          };
          'ads.pla'?: {
            data: Array<{
              title: string;
              url: string;
              thumbnailUrl: string;
              sellername: string;
              originalprice: string;
              abstract: string;
              merchantRating?: {
                rating: number;
              };
            }>;
            instrumentation: {
              ClientID: string;
              ImpressionGUID: string;
              SearchID: string;
              rguid: string;
            };
          };
        };
      };
    },
    adSourceTag?: string;
  };
  cid?: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, cid }) => {
  const { query } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const transformAdsData = () => {
    const northAds =
      results.response?.search?.results?.['ads.north']?.data || [];
    const eastAds = results.response?.search?.results?.['ads.east']?.data || [];

    return [...northAds, ...eastAds].map((ad) => ({
      title: ad.title,
      url: ad.url,
      description: ad.abstract,
      displayUrl: ad.displayUrl,
      siteLinks: ad.siteLinks?.value,
      merchantRating: ad.merchantRating,
      iconUrl: ad.iconUrl,
      displayDomain: ad.displayDomain,
    }));
  };

  const allAds = transformAdsData();
  const totalPages = Math.max(Math.ceil(allAds.length / TEXT_ADS_PER_PAGE), 1);
  const plaData = results.response?.search?.results?.['ads.pla'];
  const searchID =
    results.response?.search?.results?.['ads.north']?.instrumentation?.SearchID ??
    results.response?.search?.results?.['ads.east']?.instrumentation?.SearchID ??
    results.response?.search?.results?.['ads.pla']?.instrumentation?.SearchID;

  const rguid =
    results.response?.search?.results?.['ads.north']?.instrumentation?.rguid ??
    results.response?.search?.results?.['ads.east']?.instrumentation?.rguid ??
    results.response?.search?.results?.['ads.pla']?.instrumentation?.rguid;

  const clientID =
    results.response?.search?.results?.['ads.north']?.instrumentation?.ClientID ??
    results.response?.search?.results?.['ads.east']?.instrumentation?.ClientID ??
    results.response?.search?.results?.['ads.pla']?.instrumentation?.ClientID;

  const impressionGUID =
    results.response?.search?.results?.['ads.north']?.instrumentation?.ImpressionGUID ??
    results.response?.search?.results?.['ads.east']?.instrumentation?.ImpressionGUID ??
    results.response?.search?.results?.['ads.pla']?.instrumentation?.ImpressionGUID;

  const trafficSource = results.adSourceTag;

  useEffect(() => {
    setCurrentPage(1);
    setTotalResults(allAds.length);
  }, [query, allAds.length]);

  useEffect(() => {
    if (searchID && trafficSource) {
      const beacon = document.createElement('img');
      beacon.src = `https://search.yahoo.com/beacon/geop/p?s=1197812282&ysid=${encodeURIComponent(searchID)}&traffic_source=${encodeURIComponent(trafficSource)}`;
      beacon.width = 1;
      beacon.height = 1;
      beacon.style.display = 'none';
      document.body.appendChild(beacon);
    }
  }, [searchID, trafficSource]);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.text = `
      (function(w, d, t, x, m, l, p) {
        w['XMLPlusSTObject'] = m;
        w[m] = w[m] || function() {
          (w[m].q = w[m].q || []).push(arguments);
        };
        w[m].l = 1 * new Date();
        l = d.createElement(t);
        p = d.getElementsByTagName(t)[0];
        l.type = "text/javascript";
        l.async = 1;
        l.defer = 1;
        l.src = x;
        p.parentNode.insertBefore(l, p);
      })(
        window,
        document,
        'script',
        'https://s.yimg.com/ds/scripts/selectTier-v1.1.0.js',
        'selectTier'
      );
      selectTier('init', {
        source_tag: '${trafficSource || ''}',
        ysid: '${searchID || ''}',
        cid: '${clientID || ''}',
        ig: '${impressionGUID || ''}',
        select_tier: {
          clarityId: 'clarityId',
          rguid: '${rguid || ''}'
        },
        test_mode: false
      });
    `;
    document.body.appendChild(script);
  }, [searchID, rguid, trafficSource]);

  if (!allAds.length) {
    return <p>No content</p>;
  }

  return (
    <div className='w-full'>
      <div className="pl-1 sm:pl-0">
        <span className="text-xs sm:text-sm md:text-base text-gray-600 inline-block overflow-hidden whitespace-nowrap">
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              Sponsored results for{" "}
              <span className="font-semibold text-dark-blue text-xs sm:text-sm md:text-base">{query}</span>
            </>
          )}
        </span>
      </div>

      <div className='w-full flex flex-col md:flex-row'>
        <div className='w-full md:flex-1'>
          {isLoading ? (
            <div className='flex justify-center items-center h-32'>
              <span>Loading results...</span>
            </div>
          ) : (
            <>
              {currentPage === 1 && plaData && (
                <div className='w-full'>
                  <ProductAdList plaData={plaData} />
                </div>
              )}

              <TextAdList
                ads={allAds
                  .slice(
                    (currentPage - 1) * TEXT_ADS_PER_PAGE,
                    currentPage * TEXT_ADS_PER_PAGE
                  )
                  .map((ad) => ({
                    title: ad.title,
                    url: ad.url,
                    description: ad.description,
                    displayDomain: ad.displayDomain,
                    iconUrl: ad.iconUrl,
                  }))}
              />
            </>
          )}
        </div>
      </div>

      <div className='py-4 md:py-8'>
        <PaginationControl
          pages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
