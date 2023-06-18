import './_styles/global.css';
import { basierCircle, untitledSerif, jetbrainsMono } from './_styles/fonts';
import { Providers } from './providers';
import { Metadata } from 'next';
import { css } from 'ds/css';
import { Footer } from './_components/footer/footer';
import { Analytics } from '@vercel/analytics/react';
import { PATHS } from '@utils/common/constants/paths.constants';
import { Navigation } from './_components/navigation/navigation';

// TODO: wip working on migrating root layout to app dir

const title = 'Portfolio | Hunter Jennings';
const description =
  'Hunter Jennings is a Frontend Developer based in Richmond, VA';

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
  display: 'flex',
  w: 'full',
  zIndex: 1,
  gridArea: 'main',
});
