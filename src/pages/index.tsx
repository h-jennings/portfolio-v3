import { styled } from '@/stitches.config';
import { Stack } from '@components/Stack';
import { H1, Text } from '@components/Text';
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
      <Stack gap={{ '@initial': '7', '@bp2': '9' }}>
        <Text family='serif' size='2'>
          This is a test
        </Text>
      </Stack>
    </>
  );
};

export default Index;
