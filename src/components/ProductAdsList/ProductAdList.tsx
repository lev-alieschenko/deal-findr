import React from 'react';
import { ProductAdItem } from './ProductAdItem';

interface PLAData {
  data: {
    title: string;
    url: string;
    thumbnailUrl?: string;
    sellername?: string;
    originalprice?: string;
    abstract?: string;
    merchantRating?: {
      rating?: number;
    };
  }[];
}

const transformPLAData = (plaData: PLAData) => {
  if (!plaData?.data) return [];

  return plaData.data.map((ad) => ({
    title: ad.title.replace(/<[^>]*>/g, ''),
    url: ad.url,
    photoUrl: ad.thumbnailUrl || '/api/placeholder/112/100',
    sellername: ad.sellername || 'Unknown Seller',
    price: parseFloat((ad.originalprice || '').replace('$', '')) || 0,
    additional: ad.abstract?.split('.')[0],
    rating: ad.merchantRating?.rating
      ? ad.merchantRating.rating / 2
      : undefined,
  }));
};

const ProductAdList: React.FC<{ plaData: PLAData }> = ({ plaData }) => {
  const transformedAds = transformPLAData(plaData);

  if (transformedAds.length === 0) {
    return null;
  }

  return (
    <div className='w-full mb-4 h-fit pl-2 pt-2 pr-4 pb-4 border-t-2 border-l-2 border-gray-800 border-r border-b border-gray-300'>
      <div className='py-1 flex flex-row justify-between'>
        <h1 className='leading-8'>Shopping</h1>
        <p className='text-sm text-gray-400 leading-8'>Ads</p>
      </div>
      <ul className='grid grid-cols-4 gap-2'>
        {transformedAds.map((ad, index) => (
          <li key={index}>
            <ProductAdItem
              title={ad.title}
              url={ad.url}
              photoUrl={ad.photoUrl}
              sellername={ad.sellername}
              price={ad.price}
              additional={ad.additional}
              rating={ad.rating}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductAdList;
