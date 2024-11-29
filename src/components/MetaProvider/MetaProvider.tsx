'use client';

import { initializePixel } from '@/shared/utils/metaPixel';
import { useEffect } from 'react';

export default function MetaPixelProvider() {
  useEffect(() => {
    initializePixel();
  }, []);

  return null;
}
