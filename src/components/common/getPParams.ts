export const getPParams = (searchParams: Record<string, string>) => {
  return Object.entries(searchParams)
    .filter(([key]) => key !== "cid")
    .map(([_, value]) => value);
};
