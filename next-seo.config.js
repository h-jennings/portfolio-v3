import { PATHS } from '@utils/common/constants/paths.constants';

const title = 'Portfolio';
const description =
  'Hunter Jennings is a Frontend Developer based in Richmond, VA';

/** @type {import('next-seo').NextSeoProps} */
const SEO = {
  title,
  titleTemplate: '%s | Hunter Jennings',
  description,
  canonical: process.env.NEXT_PUBLIC_URL,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_URL,
    images: [
      {
        url: PATHS.og,
      },
    ],
    title,
    description,
  },
  twitter: {
    handle: '@jennings_hunter',
    site: '@jennings_hunter',
    cardType: 'summary_large_image',
  },
};

export default SEO;
