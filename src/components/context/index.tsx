"use client";

import { createContext, useState, useContext } from "react";

const AppContext = createContext<any>("");

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");

  return (
    <AppContext.Provider
      value={{
        query,
        setQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
