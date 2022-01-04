import { lightTheme } from '@/stitches.config';
import { RootLayout } from '@components/layout/RootLayout';
import { useVisualViewportHeight } from '@utils/hooks/use-visual-viewport-height';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import '../styles/global.css';

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
