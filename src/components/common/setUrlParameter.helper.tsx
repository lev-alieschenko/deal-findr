"use client";

export const setUrlParameter = (name: string, value: string): void => {
  const searchParams = new URLSearchParams();
  if (value !== "") {
    searchParams.set(name, value);
  }
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({}, "", newUrl);
};
