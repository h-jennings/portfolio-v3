import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { WorkList } from '@/components/WorkList';
import { styled } from '@/stitches.config';
import { NextPage } from 'next';

const PageHeader = styled(Text, {
  lineHeight: '$body',
  fontSize: '$4',
});
const Work: NextPage = () => {
  return (
    <Stack gap='6'>
      <Stack gap='3'>
        <PageHeader as='h1'>Work</PageHeader>
        <Text as='h2' size='1'>
          3&mdash;PROJECTS
        </Text>
      </Stack>
      <WorkList />
    </Stack>
  );
};

export default Work;
