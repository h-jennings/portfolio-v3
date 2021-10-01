import { Box } from '@/components/primitives/Box';
import { Stack } from '@/components/primitives/Stack';
import { StyledLink } from '@/components/primitives/StyledLink';
import { ProjectGrid } from '@/components/ProjectGrid';
import { RootLayout } from '@/components/RootLayout';
import { styled } from '@/stitches.config';
import { Text } from '@components/primitives/Text';
import type { NextPage } from 'next';
import Link from 'next/link';

const Intro = styled(Stack, {
  maxWidth: '640px',
});

const Index: NextPage = () => {
  return (
    <RootLayout>
      <Stack gap='9'>
        <Intro gap='3'>
          <Text as='h1' css={{ fontSize: '$3', lineHeight: '$body' }}>
            Hunter Jennings is a frontend ui engineer interested in design
            systems and component architecture.
          </Text>
          <Stack gap='1'>
            <Text
              as='p'
              css={{
                maxWidth: '520px',
                color: '$text2',
                fontSize: '$2',
                lineHeight: '$body',
              }}>
              If you&apos;re a remote-friendly product company that wants to
              scale your ui with elegant, modern, web-based tools&mdash;I
              can&apos;t wait to meet you.
            </Text>
            <Box>
              <Link passHref href='/about'>
                <StyledLink css={{ color: '$text3' }}>Read More</StyledLink>
              </Link>
            </Box>
          </Stack>
        </Intro>
        <ProjectGrid />
      </Stack>
    </RootLayout>
  );
};

export default Index;
