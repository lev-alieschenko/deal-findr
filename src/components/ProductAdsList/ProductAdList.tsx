import React, { useState, useRef, useEffect } from 'react';
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
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    if (transformedAds.length === 0) {
      return;
    }
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, [transformedAds.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current && !isScrolling) {
      setIsScrolling(true);
      const container = scrollContainerRef.current;
      const scrollAmount =
        direction === 'left' ? -container.clientWidth : container.clientWidth;

      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });

      setTimeout(() => {
        setIsScrolling(false);
        checkScrollButtons();
      }, 300);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && showRightArrow) {
        scroll('right');
      } else if (diff < 0 && showLeftArrow) {
        scroll('left');
      }
      setTouchStart(null);
    }
  };

  return (
    <div className='w-full mb-4 h-fit'>
      <div className='py-1 flex items-center gap-4'>
        <h1 className='text-lg md:text-xl font-semibold leading-8'>Shopping</h1>
        <p className='text-sm text-gray-400 leading-8'>Ads</p>
      </div>

      <div className='relative'>
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 rounded-full py-1 px-2 shadow-md hover:bg-gray-300 transition-all duration-200 -ml-4 hidden md:block'
            aria-label='Previous items'
          >
            {'<'}
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 rounded-full py-1 px-2 shadow-md hover:bg-gray-300 transition-all duration-200 -mr-4 hidden md:block'
            aria-label='Next items'
          >
            {'>'}
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className='overflow-x-auto scrollbar-hide scroll-smooth'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className='flex gap-1 min-w-max px-1'>
            {transformedAds.map((ad, index) => (
              <div key={index} className='w-[160px] md:w-[140px] flex-shrink-0'>
                <ProductAdItem
                  title={ad.title}
                  url={ad.url}
                  photoUrl={ad.photoUrl}
                  sellername={ad.sellername}
                  price={ad.price}
                  additional={ad.additional}
                  rating={ad.rating}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdList;
