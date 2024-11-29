import ReactPixel from 'react-facebook-pixel';

const options = {
  autoConfig: true,
  debug: process.env.NODE_ENV !== 'production',
};

export const initializePixel = () => {
  ReactPixel.init('965801518721056', undefined, options);
  ReactPixel.pageView();
};

export const trackAdClick = (adData: {
  contentType: 'product' | 'text';
  contentName: string;
  value?: number;
  currency?: string;
}) => {
  ReactPixel.track('Purchase', {
    content_type: adData.contentType,
    content_name: adData.contentName,
    value: adData.value || 0,
    currency: adData.currency || 'USD',
  });
};
