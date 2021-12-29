import { Flex } from '@/components/Flex';
import { Grid } from '@/components/Grid';
import { ProjectGrid } from '@/components/pages/home/ProjectGrid';
import { Stack } from '@/components/Stack';
import { styled } from '@/stitches.config';
import { PATHS } from '@/utils/constants/paths.constants';
import { H1, H2, Link, Paragraph, Text } from '@components/Text';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import type { NextPage } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';
import NextLink from 'next/link';

const title = 'Home | Hunter Jennings';
const SEO: NextSeoProps = {
  title,
  openGraph: {
    title,
  },
};

const StyledListItem = styled(Stack, {
  position: 'relative',
  $$bottom: 'calc((var(--space-m) / 2) * -1)',
  '&:after': {
    content: '',
    width: '$full',
    height: 0,
    borderTop: '1px dashed $slate8',
    position: 'absolute',
    bottom: '$$bottom',
    left: 0,
  },
  '&:last-of-type': {
    '&:after': {
      display: 'none',
    },
  },
  defaultVariants: {
    gap: '2xs',
  },
});

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

        {/* Writing */}
        <Stack as='section' gap='m'>
          {/* TODO: look into whether this is semantically correct to have an h1 for each section  */}
          <H1 leading='tight'>Writing</H1>
          <Stack as='ul' gap='m'>
            <StyledListItem as='li'>
              <NextLink href={PATHS.work} passHref>
                <Link size='1'>Website Redesign 2021</Link>
              </NextLink>
              <Text size='1' family='serif' as='time' dateTime='2021-12-08'>
                December 2021
              </Text>
            </StyledListItem>
            <StyledListItem as='li'>
              <NextLink href={PATHS.work} passHref>
                <Link size='1'>Opting out of algorithms</Link>
              </NextLink>
              <Text size='1' family='serif' as='time' dateTime='2021-12-08'>
                January 2022
              </Text>
            </StyledListItem>

            <StyledListItem as='li'>
              <NextLink href={PATHS.work} passHref>
                <Link size='1'>
                  Distraction free development with neovim and vscode
                </Link>
              </NextLink>
              <Text size='1' family='serif' as='time' dateTime='2021-12-08'>
                February 2022
              </Text>
            </StyledListItem>
          </Stack>
        </Stack>

        {/* Connect */}
      </Stack>
    </>
  );
};

export default Index;
