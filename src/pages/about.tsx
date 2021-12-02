import { PATHS } from '@utils/constants/paths.constants';
import { NextPage } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

const url = `${PATHS.base}${PATHS.about}`;
const title = 'About | Hunter Jennings';
const SEO: NextSeoProps = {
  title,
  canonical: url,
  openGraph: {
    title,
    url,
  },
};
const About: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO} />
      <div>About Page</div>
    </>
  );
};

export default About;
