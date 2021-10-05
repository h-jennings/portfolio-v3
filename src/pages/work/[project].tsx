import { projectMetaData } from '@/data/projects';
import { ProjectIdentifiers } from '@/types/projects';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Work: NextPage<{ project: string }> = (props) => {
  const router = useRouter();
  const { project } = router.query;
  const data = projectMetaData[project as ProjectIdentifiers];
  return (
    <div style={{ width: '100%' }}>
      <pre style={{ wordWrap: 'break-word' }}>{data?.project}</pre>
    </div>
  );
};

export default Work;
