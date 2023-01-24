import { ErrorContent } from '@components/common/ErrorContent';
import { Seo } from '@components/common/Seo';
import { PATHS } from '@utils/common/constants/paths.constants';
import { NextPage } from 'next';
import Script from 'next/script';

const Custom404: NextPage = () => {
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
      <Seo
        title='Page Not Found'
        description='Something went wrong.'
        noindex={true}
        nofollow={true}
        image={`${PATHS.og}?title=404&subtitle=Something went wrong.`}
      />
      <ErrorContent statusCode={404} />
    </>
  );
};

export default Custom404;
