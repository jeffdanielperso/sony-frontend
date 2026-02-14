"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface AlternateUrlContextValue {
  alternateUrl: string | null;
  setAlternateUrl: (url: string | null) => void;
}

const AlternateUrlContext = createContext<AlternateUrlContextValue>({
  alternateUrl: null,
  setAlternateUrl: () => {},
});

export function AlternateUrlProvider({ children }: { children: React.ReactNode }) {
  const [alternateUrl, setAlternateUrl] = useState<string | null>(null);
  return (
    <AlternateUrlContext.Provider value={{ alternateUrl, setAlternateUrl }}>
      {children}
    </AlternateUrlContext.Provider>
  );
}

export function useAlternateUrl() {
  return useContext(AlternateUrlContext);
}

interface AlternateUrlSetterProps {
  url: string | null;
}

export function AlternateUrlSetter({ url }: AlternateUrlSetterProps) {
  const { setAlternateUrl } = useAlternateUrl();
  useEffect(() => {
    setAlternateUrl(url);
    return () => setAlternateUrl(null);
  }, [url, setAlternateUrl]);
  return null;
}
