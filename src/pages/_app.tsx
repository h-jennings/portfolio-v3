import { lightTheme } from '@/stitches.config';
import '@/styles/global.css';
import { RootLayout } from '@common/components/layout/RootLayout';
import { useVisualViewportHeight } from '@common/hooks/use-visual-viewport-height';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useVisualViewportHeight();

  return (
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
  );
};
export default MyApp;
