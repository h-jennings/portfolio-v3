import '@/styles/global.css';
import { RootLayout } from '@components/common/layout/RootLayout/RootLayout';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import * as React from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      }),
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access  */}
        <Hydrate state={pageProps.dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider
            disableTransitionOnChange
            attribute='class'
            value={{ dark: 'dark-theme', light: 'light-theme' }}
            defaultTheme='system'
          >
            <RootLayout>
              <Component {...pageProps} />
            </RootLayout>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
      <Analytics />
    </>
  );
};
export default MyApp;
