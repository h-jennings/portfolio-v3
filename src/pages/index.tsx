import { Box } from '@/components/primitives/Box';
import { Stack } from '@/components/primitives/Stack';
import { StyledLink } from '@/components/primitives/StyledLink';
import { ProjectGrid } from '@/components/ProjectGrid';
import { styled } from '@/stitches.config';
import { Text } from '@components/primitives/Text';
import type { NextPage } from 'next';
import Link from 'next/link';

const Intro = styled(Stack, {
  maxWidth: '640px',
});

const PageHeader = styled(Text, {
  fontSize: 'clamp(1.125rem, 4vw - 0.2rem, 1.75rem);',
  lineHeight: '$body',
  '@bp2': {
    fontSize: '$3',
  },
});
const Paragraph = styled(Text, {
  maxWidth: '520px',
  color: '$text2',
  lineHeight: '$body',
  fontSize: '$1',
  '@bp2': {
    fontSize: '$2',
  },
});
const ReadMoreLink = styled(StyledLink, {
  fontSize: '$1',
  color: '$text3',
  '@bp2': {
    fontSize: '$2',
  },
});

const Index: NextPage = () => {
  return (
    <Stack gap={{ '@initial': '7', '@bp2': '9' }}>
      <Intro gap={{ '@initial': '2', '@bp2': '3' }}>
        <PageHeader as='h1'>
          Hunter Jennings is a frontend ui engineer interested in design systems
          and component architecture.
        </PageHeader>
        <Stack gap='1'>
          <Paragraph as='p'>
            If you&apos;re a remote-friendly product company that wants to scale
            your ui with elegant, modern, web-based tools&mdash;I can&apos;t
            wait to meet you.
          </Paragraph>
          <Box>
            <Link passHref href='/about'>
              <ReadMoreLink>Read More</ReadMoreLink>
            </Link>
          </Box>
        </Stack>
      </Intro>
      <ProjectGrid />
    </Stack>
  );
};

export default Index;
