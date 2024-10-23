import React from 'react';
import Image from 'next/image';

export interface RelatedSearchBarProps {
  query: string;
  cb: () => void;
}

export const RelatedSearchBar: React.FC<RelatedSearchBarProps> = ({
  query,
  cb,
}) => {
  query = query.length > 29 ? query.slice(0, 29) + '...' : query;
  return (
    <div
      className='w-[318px] flex flex-row -mx-5 px-5 py-4 cursor-pointer hover:underline'
      onClick={cb}
    >
      <div className='mr-3 flex items-center justify-center'>
        <Image
          className='object-cover'
          src='/search.png'
          alt='DealFinder logo'
          width={20}
          height={20}
        />
      </div>
      <p className='text-base'>{query}</p>
    </div>
  );
};
