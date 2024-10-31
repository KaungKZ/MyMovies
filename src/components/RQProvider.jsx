"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactNode } from "react";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount) => {
        if (failureCount >= 1) {
          return false;
        }

        return true;
      },
    },
    mutations: {
      retry: (failureCount) => {
        if (failureCount >= 1) {
          return false;
        }

        return true;
      },
    },
  },
});

export default function RQProviders({ children }) {
  // to fetch from the cache data instead of calling same api repeatly

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
