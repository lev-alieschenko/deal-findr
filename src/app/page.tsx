'use client';

import { SearchResults } from '@/components/SearchResults';
import { ErrorDisplay } from '@/components/Error/Error';
import { ClientIP } from '@/components/ClienIp/Client';
import { useEffect, useState } from 'react';

export const runtime = 'edge';

const SearchResultsLoading = () => (
  <div className='p-4'>
    <div className='animate-pulse space-y-4'>
      <div className='h-4 bg-gray-200 rounded w-3/4'></div>
      <div className='h-4 bg-gray-200 rounded w-1/2'></div>
      <div className='h-4 bg-gray-200 rounded w-5/6'></div>
    </div>
  </div>
);

interface SearchParams {
  query?: string;
  subid?: string;
  t?: string;
}

export default function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [clientIP, setClientIP] = useState('');
  const [marketCode, setMarketCode] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchParams.query || !marketCode || !clientIP) {
        console.log('Missing query, market code, or IP:', {
          query: searchParams.query,
          marketCode,
          ip: clientIP,
        });
        return;
      }

      setIsLoading(true);
      try {
        const host = window.location.host;
        const protocol = window.location.protocol;

        const params = new URLSearchParams({
          query: searchParams.query,
          marketCode,
          clientIP: clientIP,
        });

        if (searchParams.subid) {
          params.append('subid', searchParams.subid);
        }

        if(searchParams.t) {
          params.append('t', searchParams.t);
        }

        console.log('Sending request with params:', params.toString());
        const response = await fetch(
          `${protocol}//${host}/api/yahoo?${params}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Search request failed');
        }

        const data = await response.json();
        setSearchResults(data);
        setError(null);
      } catch (err: any) {
        console.error('Search error:', err);
        setError(err);
        setSearchResults(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchParams.query, searchParams.subid, searchParams.t, marketCode, clientIP]);

  const handleIpAndMarketCodeReceived = (ip: string, code: string) => {
    console.log('Received IP:', ip, 'Market Code:', code);
    setClientIP(ip);
    setMarketCode(code);
  };

  if (!searchParams.query) {
    return (
      <div className='px-4 md:px-6 lg:px-40 pt-4 pb-12'>
        {/* <p className='font-black text-3xl'>Search ads!</p> */}
        <ClientIP onIpAndMarketCodeReceived={handleIpAndMarketCodeReceived} />
      </div>
    );
  }

  return (
    <main className='px-4 md:px-6 lg:px-40 pt-4 pb-12'>
      <ClientIP onIpAndMarketCodeReceived={handleIpAndMarketCodeReceived} />
      {isLoading ? (
        <SearchResultsLoading />
      ) : error ? (
        <ErrorDisplay error={error} />
      ) : (
        searchResults && <SearchResults results={searchResults} />
      )}
    </main>
  );
}
