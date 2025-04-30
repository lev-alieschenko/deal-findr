export const getPParams = (searchParams: Record<string, string>) => {
  return Object.entries(searchParams)
    .filter(([key, value]) => {
      const lowerKey = key.toLowerCase();
      const isPParam = /^p\d+$/i.test(lowerKey);
      return isPParam && value.trim() !== "";
    })
    .map(([_, value]) => value);
};
