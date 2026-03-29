import { PATHS } from '@/app/_utils/constants/paths.constants';
import { Analytics } from '@vercel/analytics/react';
import { css } from 'ds/css';
import { Metadata } from 'next';
import { Footer } from './_components/footer/footer';
import { Navigation } from './_components/navigation/navigation';
import { basierCircle, jetbrainsMono, untitledSerif } from './_styles/fonts';
import './_styles/global.css';
import { Providers } from './providers';

const title = 'Portfolio | Hunter Jennings';
const description = 'Hunter Jennings is a UI engineer based in Richmond, VA';

export const metadata: Metadata = {
  metadataBase: new URL(PATHS.base),
  robots: 'follow, index',
  title: {
    template: '%s | Hunter Jennings',
    default: title,
  },
  description,
  openGraph: {
    url: PATHS.base,
    type: 'website',
    locale: 'en_US',
    title,
    description,
  },
  twitter: {
    creator: '@jennings_hunter',
    site: '@jennings_hunter',
    card: 'summary_large_image',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      suppressHydrationWarning
      lang='en'
      className={`${basierCircle.variable} ${untitledSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Providers>
          <div className={container}>
            <div className={wrapper}>
              <Navigation />
              <main className={main}>{children}</main>
              <Footer />
            </div>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

const container = css({
  w: 'full',
  bgColor: 'uiBg',
  h: 'full',
  minH: 'screenH',
  display: 'flex',
  alignItems: 'center',
  flexDir: 'column',
  px: 's',
});

const wrapper = css({
  gridTemplateAreas: `'nav'
                      'main'
                      'footer'`,
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
  display: 'grid',
  maxW: 'channel',
  w: 'full',
  h: 'full',
  minH: 'screenH',
  pos: 'relative',
  zIndex: 'init',
});

const main = css({
  w: 'full',
  zIndex: 1,
  gridArea: 'main',
});
