'use client';

import React from 'react';
import { TextAdItem, TextAdItemProps } from './TextAdItem';

export const TextAdList: React.FC<{ ads: TextAdItemProps[] }> = ({ ads }) => {
  return (
    <div className='w-full max-w-full md:max-w-[608px]'>
      <div className='w-full'>
        <ul className='space-y-3'>
          {ads.map((ad, index) => (
            <li key={index} className='px-4 md:px-0'>
              <TextAdItem
                title={ad.title}
                url={ad.url}
                description={ad.description}
                displayDomain={ad.displayDomain}
                displayUrl={ad.displayUrl}
                iconUrl={ad.iconUrl}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
