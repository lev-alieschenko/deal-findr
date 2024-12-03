'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const PIXEL_ID = '965801518721056';

const MetaPixelProvider = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPixelInitialized, setIsPixelInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || isPixelInitialized) return;

    import('react-facebook-pixel')
      .then((module) => module.default)
      .then((ReactPixel) => {
        ReactPixel.init(PIXEL_ID, undefined, {
          autoConfig: true,
          debug: process.env.NODE_ENV !== 'production',
        });
        ReactPixel.pageView();
        setIsPixelInitialized(true);
      })
      .catch((error) => {
        console.error('Failed to initialize Meta Pixel:', error);
      });
  }, [isPixelInitialized]);

  useEffect(() => {
    if (!isPixelInitialized) return;

    import('react-facebook-pixel')
      .then((module) => module.default)
      .then((ReactPixel) => {
        ReactPixel.pageView();
      })
      .catch((error) => {
        console.error('Failed to track page view:', error);
      });
  }, [pathname, searchParams, isPixelInitialized]);

  return null;
};

export default MetaPixelProvider;
