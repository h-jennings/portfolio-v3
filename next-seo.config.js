import { PATHS } from '@utils/common/constants/paths.constants';

const title = 'Portfolio';
const description =
  'Hunter Jennings is a Frontend Developer based in Richmond, VA';

/** @type {import('next-seo').NextSeoProps} */
const SEO = {
  title,
  titleTemplate: '%s | Hunter Jennings',
  description,
  canonical: PATHS.base,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: PATHS.base,
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
