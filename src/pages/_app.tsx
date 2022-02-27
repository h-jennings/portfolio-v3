import { lightTheme } from '@/stitches.config';
import '@/styles/global.scss';
import { RootLayout } from '@components/common/layout/RootLayout';
import { useVisualViewportHeight } from '@utils/common/hooks/use-visual-viewport-height';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Script from 'next/script';

const MyApp = ({ Component, pageProps }: AppProps) => {
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
      <ThemeProvider
        disableTransitionOnChange
        attribute='class'
        value={{ dark: 'dark-theme', light: lightTheme.className }}
        defaultTheme='system'
      >
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ThemeProvider>
    </>
  );
};
export default MyApp;
