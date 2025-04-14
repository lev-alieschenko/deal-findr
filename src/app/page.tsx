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

interface AnuraResponse {
  score: string;
  riskLevel?: string;
  [key: string]: any;
}

// Extend window for Anura callback
declare global {
  interface Window {
    handleAnuraResponse?: (response: AnuraResponse) => void;
  }
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
  const [clicks, setClicks] = useState(0);
  const [impressions, setImpressions] = useState(0);

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
        const domainName = window.location.hostname.replace(/^www\./, '').split('.')[0].toUpperCase();
        const protocol = window.location.protocol;
        const startTime = performance.now();

        const params = new URLSearchParams({
          query: searchParams.query,
          marketCode,
          clientIP: clientIP,
          hostName: domainName,
        });

        if (searchParams.subid) {
          params.append('subid', searchParams.subid);
        }

        if (searchParams.t) {
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
        const endTime = performance.now();
        const timeSpent = ((endTime - startTime) / 1000).toFixed(2);

        setSearchResults(data);
        setError(null);
        setImpressions((prev) => prev + 1);
        setClicks((prev) => prev + 1);

        if (searchParams.subid) {
          await insertDataIntoSupabase(protocol, host, searchParams.subid, timeSpent);
          if (typeof window !== 'undefined') {
            loadAnuraScript(searchParams.subid, searchParams.t!, `${protocol}//${host}`);
          }
        }
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

  const insertDataIntoSupabase = async (
    protocol: string,
    host: string,
    subid: string,
    timeSpent: string
  ) => {
    try {
      const ctr = impressions > 0 ? clicks / impressions : 0;
      const response = await fetch(`${protocol}//${host}/api/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: searchParams.query,
          subid,
          time_till_click: parseFloat(timeSpent),
          ip: clientIP,
          market_code: marketCode,
          userAgent: navigator.userAgent,
          ctr,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Data successfully added to Supabase:', result);
      } else {
        console.error('Failed to insert into Supabase:', result.error);
      }
    } catch (error) {
      console.error('Error inserting data into Supabase:', error);
    }
  };

  const loadAnuraScript = (subid: string, typetag: string, baseUrl: string) => {
    const callbackName = 'handleAnuraResponse';

    window[callbackName] = async (response: any) => {
      try {
        const data = typeof response?.getResult === 'function' ? response.getResult() : response;
        console.log('Anura response data:', response);
        console.log('getId:', response.getId());
        console.log('getMobile:', response.getResult());
        console.log('isbad:', response.isBad());
        console.log('getError:', response.getError());
        console.log('isWarning:', response.isWarning());
        
        // const res = await fetch(`${baseUrl}/api/anura-score`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     subid,
        //     score: data?.score,
        //     riskLevel: data?.riskLevel,
        //     fullPayload: data,
        //     timestamp: new Date().toISOString(),
        //   }),
        // });

        // const result = await res.json();
        // console.log('Anura score saved:', result);
      } catch (err) {
        console.error('Error handling Anura response:', err);
      }
    };

    const script = document.createElement('script');
    const request = {
      instance: 2685694301,
      source: subid,
      campaign: typetag,
      callback: callbackName,
    };

    const params: string[] = [];
    for (const key in request) {
      params.push(`${key}=${encodeURIComponent((request as any)[key])}`);
    }

    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://script.anura.io/request.js?${params.join('&')}`;
    document.head.appendChild(script);
  };

  const handleIpAndMarketCodeReceived = (ip: string, code: string) => {
    console.log('Received IP:', ip, 'Market Code:', code);
    setClientIP(ip);
    setMarketCode(code);
  };

  if (!searchParams.query) {
    return (
      <div className='px-4 md:px-6 lg:px-32 pt-4 pb-12'>
        <ClientIP onIpAndMarketCodeReceived={handleIpAndMarketCodeReceived} />
      </div>
    );
  }

  return (
    <main className='px-4 md:px-6 lg:px-32 pt-4 pb-12'>
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
