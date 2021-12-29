import { Stack } from '@/components/Stack';
import { styled } from '@/stitches.config';
import { H1, H2, Paragraph } from '@components/Text';
import type { NextPage } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

const PageHeader = styled(H1, {
  fontSize: 'clamp(1.5rem, 4vw - 0.2rem, 1.75rem);',
  '@bp2': {
    fontSize: '$3',
  },
});

const title = 'Home | Hunter Jennings';
const SEO: NextSeoProps = {
  title,
  openGraph: {
    title,
  },
};
const Index: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO} />
      <Stack gap='3xl'>
        {/* Intro */}
        <Stack as='section' gap='xl'>
          <Stack gap='m'>
            <H1 size='2' family='serif' leading='tight'>
              Hunter Jennings
            </H1>
            <Paragraph style={{ maxWidth: 600 }}>
              Frontend ui engineer interested in design systems, component
              architectures, and React.
            </Paragraph>
          </Stack>
          <Stack gap='xs'>
            <H2 color='2' aria-label="What I'm up to now" size='1'>
              Now
            </H2>
            <Paragraph>
              Currently working as a Frontend Developer for an award-winning
              digital creative agency Elegant Seagulls.
            </Paragraph>
          </Stack>
        </Stack>

        {/* Work */}
        <Stack as='section' gap='s'>
          <H1>Selected work</H1>
          <Paragraph>This is a test</Paragraph>
        </Stack>
      </Stack>
    </>
  );
};

export default Index;
