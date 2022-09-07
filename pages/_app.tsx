import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { dehydrate, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect, useState } from 'react';
import { supabase } from "../lib/supabase"
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  supabase.auth.onAuthStateChange((event, session) => {
    fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    })
  })
  return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
  )
}
/**
 * <ThemeProvider attribute="class"></ThemeProvider>
 *  <ReactQueryDevtools initialIsOpen={false} />
 */

export default MyApp