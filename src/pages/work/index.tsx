import { Stack } from '@/components/primitives/Stack';
import { pageHeader, text } from '@/components/primitives/Text';
import { WorkList } from '@/components/WorkList';
import { NextPage } from 'next';

const Work: NextPage = () => {
  return (
    <Stack gap={{ '@initial': '4', '@bp2': '6' }}>
      <Stack gap={{ '@initial': '2', '@bp2': '3' }}>
        <h1 className={pageHeader()}>Selected Work</h1>
        <h2 className={text({ size: { '@initial': '1', '@bp2': '2' } })}>
          3&mdash;PROJECTS
        </h2>
      </Stack>
      <WorkList />
    </Stack>
  );
};

export default Work;
