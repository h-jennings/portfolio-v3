import { ErrorContent } from '@common/components/ErrorContent';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const Custom404: NextPage = () => {
  const TITLE = 'Page Not Found | Hunter Jennings';
  const SEO = {
    title: TITLE,
    openGraph: {
      title: TITLE,
    },
  };
  return (
    <>
      <NextSeo {...SEO} noindex={true} nofollow={true} />
      <ErrorContent statusCode={404} />
    </>
  );
};

export default Custom404;
