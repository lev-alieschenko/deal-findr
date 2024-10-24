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
          };
          'ads.east'?: {
            data: any[];
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
          };
        };
      };
    };
  };
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
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

  useEffect(() => {
    setCurrentPage(1);
    setTotalResults(allAds.length);
  }, [query, allAds.length]);

  if (!query) {
    return <p>No content</p>;
  }

  return (
    <div className='w-full px-4 md:px-0'>
      <div className='pl-2 md:pl-5'>
        <span className='text-sm text-gray-600 inline-block overflow-hidden whitespace-nowrap'>
          {isLoading ? 'Loading...' : `About ${totalResults} results`}
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
