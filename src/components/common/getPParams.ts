export const getPParams = (searchParams: Record<string, string>) => {
  return Object.entries(searchParams)
    .filter(([key]) => {
      const lowerKey = key.toLowerCase();
      return lowerKey !== "cid" && lowerKey !== "clickid" && lowerKey !== "subid";
    })
    .map(([_, value]) => value);
};
