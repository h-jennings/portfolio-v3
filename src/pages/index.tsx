import { Flex } from '@/components/Flex';
import { Grid } from '@/components/Grid';
import { ProjectGrid } from '@/components/pages/home/ProjectGrid';
import { Stack } from '@/components/Stack';
import { styled } from '@/stitches.config';
import { PATHS } from '@/utils/constants/paths.constants';
import { H1, H2, Link, Paragraph } from '@components/Text';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import type { NextPage } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';
import NextLink from 'next/link';

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
          <Flex direction='row' justify='between' align='center'>
            <H1 leading='tight'>Selected work</H1>
            <Grid
              gap='2xs'
              justify='end'
              align='center'
              css={{ gridTemplateColumns: 'auto auto' }}
            >
              <NextLink href={PATHS.work} passHref>
                <Link css={{ d: 'block' }} color='2' size='1' leading='tight'>
                  view all
                </Link>
              </NextLink>
              <ArrowRightIcon color='var(--colors-slate11)' />
            </Grid>
          </Flex>
          <ProjectGrid />
        </Stack>
      </Stack>
    </>
  );
};

export default Index;
