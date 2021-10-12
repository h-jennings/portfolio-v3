import { Stack } from '@/components/primitives/Stack';
import { text } from '@/components/primitives/Text';
import { WorkList } from '@/components/WorkList';
import { css } from '@/stitches.config';
import { NextPage } from 'next';

const pageHeader = css(text, {
  lineHeight: '$body',
  fontSize: '$4',
});
const Work: NextPage = () => {
  return (
    <Stack gap='6'>
      <Stack gap='3'>
        <h1 className={pageHeader()}>Work</h1>
        <h2 className={text({ size: '2' })}>3&mdash;PROJECTS</h2>
      </Stack>
      <WorkList />
    </Stack>
  );
};

export default Work;
