import { RootLayout } from '@/components/RootLayout';
import { useVisualViewportHeight } from '@/hooks/use-visual-viewport-height';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useVisualViewportHeight();

  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
export default MyApp;
