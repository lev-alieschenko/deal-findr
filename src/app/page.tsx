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

async function SearchContent({
  searchParams,
}: {
  searchParams: { query?: string; subid?: string };
}) {
  if (!searchParams.query) {
    return <p className='font-black text-3xl'>Search ads!</p>;
  }

  try {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

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
    return <SearchResults results={searchResults} />;
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
