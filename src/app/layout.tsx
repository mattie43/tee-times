"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import "./globals.css";

const queryClient = new QueryClient();

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Tee Time Scraper</title>
      <body>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </QueryClientProvider>
      </body>
    </html>
  );
}
