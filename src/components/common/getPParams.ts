export const getPParams = (searchParams: Record<string, string>) => {
  return Object.entries(searchParams)
    .filter(([key, value]) => {
      const lowerKey = key.toLowerCase();
      const isPParam = /^p\d+$/.test(lowerKey); // matches p1, p2, p3, ...
      const isAllowedKey = isPParam || ["cid", "clickid", "subid"].includes(lowerKey);
      return isAllowedKey && value.trim() !== "";
    })
    .map(([_, value]) => value);
};
