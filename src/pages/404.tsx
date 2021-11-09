import { ErrorContent } from '@/components/ErrorContent';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const Custom404: NextPage = () => {
  const title = 'Page Not Found | Hunter Jennings';
  const SEO = {
    title,
    openGraph: {
      title,
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
