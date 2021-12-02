import { Link } from '@/components/primitives/text';
import { styled } from '@/stitches.config';
import { ProjectGrid } from '@components/pages/home/ProjectGrid';
import { Stack } from '@components/primitives/Stack';
import { BodyText, H1 } from '@components/primitives/text';
import { PATHS } from '@utils/constants/paths.constants';
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
      <Stack gap={{ '@initial': '7', '@bp2': '9' }}>
        <Stack
          style={{ maxWidth: '640px' }}
          gap={{ '@initial': '2', '@bp2': '3' }}
        >
          <PageHeader leading='body'>
            Hunter Jennings is a frontend ui engineer interested in design
            systems, component architectures, and React.
          </PageHeader>
          <Stack gap='2'>
            <BodyText css={{ maxWidth: '520px' }}>
              Hunter currently works as a Frontend Developer for an
              award-winning digital creative agency{' '}
              <Link
                target='_blank'
                href={PATHS.seagulls}
                rel='noreferrer'
                style={{ textDecoration: 'underline' }}
                color='2'
              >
                Elegant Seagulls
              </Link>
              .
            </BodyText>
            {/* <BodyText>
              If you&apos;re a remote-friendly product company that wants to
              scale your ui with elegant, modern, web-based tools&mdash;I
              can&apos;t wait to meet you.
            </BodyText> */}
            <NextLink passHref href='/about'>
              <Link
                color='3'
                css={{ d: 'block' }}
                size={{
                  '@initial': '1',
                  '@bp2': '2',
                }}
              >
                Read More
              </Link>
            </NextLink>
          </Stack>
        </Stack>
        <ProjectGrid />
      </Stack>
    </>
  );
};

export default Index;
