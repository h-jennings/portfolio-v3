import { ErrorContent } from '@common/components/ErrorContent';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Script from 'next/script';

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
      <Script
        id='404-page-logger'
        dangerouslySetInnerHTML={{
          __html: `
            plausible("404",{ props: { path: document.location.pathname } });
          `,
        }}
      />
      <NextSeo {...SEO} noindex={true} nofollow={true} />
      <ErrorContent statusCode={404} />
    </>
  );
};

export default Custom404;
