export const getPParams = (searchParams: Record<string, string>) => {
  return Object.entries(searchParams)
    .filter(([key, value]) => {
      const lowerKey = key.toLowerCase();
      return lowerKey !== "cid" && lowerKey !== "clickid" && lowerKey !== "subid" && value.trim() !== "";
    })
    .map(([_, value]) => value);
};
