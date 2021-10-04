import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { WorkList } from '@/components/WorkList';
import { NextPage } from 'next';

const Work: NextPage = () => {
  return (
    <Stack gap='6'>
      <Stack gap='3'>
        <Text as='h1' size='4'>
          Work
        </Text>
        <Text as='h2' size='1'>
          3&mdash;PROJECTS
        </Text>
      </Stack>
      <WorkList />
    </Stack>
  );
};

export default Work;
