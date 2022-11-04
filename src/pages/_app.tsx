import '@/styles/global.css';
import { RootLayout } from '@components/common/layout/RootLayout/RootLayout';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useVisualViewportHeight } from '@utils/common/hooks/use-visual-viewport-height';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Script from 'next/script';
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
  useVisualViewportHeight();

  return (
    <>
      <Script
        defer
        data-domain='hunterjennings.dev'
        src='https://plausible.io/js/plausible.outbound-links.js'
      />
      <Script
        id='404-tracking'
        dangerouslySetInnerHTML={{
          __html: `
          window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) } 
          `,
        }}
      />

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
    </>
  );
};
export default MyApp;
