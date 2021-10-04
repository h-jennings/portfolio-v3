import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Work: NextPage<{ project: string }> = (props) => {
  const router = useRouter();
  const { project } = router.query;
  return <div>{project}</div>;
};

export default Work;
