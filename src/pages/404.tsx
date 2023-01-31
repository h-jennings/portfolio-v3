import { ErrorContent } from '@components/common/ErrorContent';
import { Seo } from '@components/common/Seo';
import { PATHS } from '@utils/common/constants/paths.constants';
import { NextPage } from 'next';

const Custom404: NextPage = () => {
  return (
    <>
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
