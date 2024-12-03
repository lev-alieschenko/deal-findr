export const trackAdClick = async (adData: {
  contentType: 'product' | 'text';
  contentName: string;
  value?: number;
  currency?: string;
}) => {
  if (typeof window === 'undefined') return;

  try {
    const ReactPixel = await import('react-facebook-pixel').then(
      (module) => module.default
    );

    ReactPixel.track('Purchase', {
      content_type: adData.contentType,
      content_name: adData.contentName,
      value: adData.value || 0,
      currency: adData.currency || 'USD',
    });
  } catch (error) {
    console.error('Failed to track ad click:', error);
  }
};
