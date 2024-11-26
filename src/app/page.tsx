import { SearchResults } from '@/components/SearchResults';
import { ErrorDisplay } from '@/components/Error/Error';
import { headers } from 'next/headers';
import { Suspense } from 'react';

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

async function IpDisplay() {
  const host = headers().get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  const headersList = headers();

  const ips = headersList.get('x-real-ua');
  console.log('ips:', ips);

  let ip = 'Unknown IP';

  try {
    const response = await fetch(`${protocol}://${host}/api/ip`);

    const data = await response.json();
    console.log(data);
    ip = data.ip;
  } catch (error) {
    console.error('Failed to fetch IP:', error);
  }

  return <div className='text-sm text-gray-500 ml-2'>Your IP: {ip}</div>;
}

async function SearchContent({
  searchParams,
}: {
  searchParams: { query?: string; subid?: string };
}) {
  if (!searchParams.query) {
    return (
      <div>
        <p className='font-black text-3xl'>Search ads!</p>
        <IpDisplay />
      </div>
    );
  }

  try {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    headersList.get('request-ip');
    console.log('request-ip:', headersList.get('request-ip'));

    console.log(userAgent);

    const params = new URLSearchParams({
      query: searchParams.query,
    });

    if (searchParams.subid) {
      params.append('subid', searchParams.subid);
    }

    const response = await fetch(`${protocol}://${host}/api/yahoo?${params}`, {
      headers: {
        Accept: 'application/json',
        'User-Agent': userAgent,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Search request failed');
    }

    const searchResults = await response.json();
    return (
      <div>
        <IpDisplay />
        <SearchResults results={searchResults} />
      </div>
    );
  } catch (error: any) {
    console.error('Search error:', error);
    return <ErrorDisplay error={error} />;
  }
}

export default function Home({
  searchParams,
}: {
  searchParams: { query?: string; subid?: string };
}) {
  return (
    <main>
      <Suspense fallback={<SearchResultsLoading />}>
        <SearchContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
