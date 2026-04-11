import { PATHS } from '@/app/_utils/constants/paths.constants';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
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
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
