import { RootLayout } from '@components/layout/RootLayout';
import { useVisualViewportHeight } from '@utils/hooks/use-visual-viewport-height';
import type { AppProps } from 'next/app';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  useVisualViewportHeight();

  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
export default MyApp;
