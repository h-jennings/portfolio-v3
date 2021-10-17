import { ErrorContent } from '@/components/ErrorContent';
import { NextPage } from 'next';

const Custom404: NextPage = () => {
  return <ErrorContent statusCode={404} />;
};
export default Custom404;
