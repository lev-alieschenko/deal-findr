import { Suspense } from 'react';
import { SearchResults } from '@/components/SearchResults';
import { ErrorDisplay } from '@/components/Error/Error';
import {
  generateJWT,
  getAccessToken,
  searchRequest,
} from '@/shared/utils/search-api';
import { headers } from 'next/headers';

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

export default async function Home({
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

async function SearchContent({
  searchParams,
}: {
  searchParams: { query?: string; subid?: string };
}) {
  if (searchParams.query == undefined) {
    return <p className='font-black text-3xl'>Search ads!</p>;
  }

  try {
    const { query, subid } = searchParams;
    const jwt = await generateJWT();
    const accessToken = await getAccessToken(jwt);
    const userAgent = headers().get('user-agent') || '';
    const searchResults = await searchRequest(
      accessToken,
      query,
      subid ?? '',
      userAgent ?? ''
    );
    return <SearchResults results={searchResults} />;
  } catch (error: any) {
    return <ErrorDisplay error={error} />;
  }
}
