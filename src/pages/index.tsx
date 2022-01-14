import { styled } from '@/stitches.config';
import { CustomLink } from '@common/components/CustomLink';
import { Flex } from '@common/components/Flex';
import { Grid } from '@common/components/Grid';
import { Stack } from '@common/components/Stack';
import {
  BodyText,
  H1,
  H2,
  Link,
  Paragraph,
  Text,
} from '@common/components/Text';
import { PATHS } from '@common/utils/constants/paths.constants';
import {
  parseDateToLongDateString,
  sortMdxDataByDateDesc,
} from '@common/utils/helpers/date.helpers';
import { getAllWritingsData } from '@common/utils/helpers/mdx-data.helpers';
import { MdxData } from '@common/utils/types/mdx-data';
import { ProjectGrid } from '@home/components/ProjectGrid';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';
import NextLink from 'next/link';

const TITLE = 'Home | Hunter Jennings';
const SEO: NextSeoProps = {
  title: TITLE,
  openGraph: {
    title: TITLE,
  },
};

const Index = ({
  featuredWritings,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
              Currently working as a Frontend Developer for the award-winning
              digital creative agency&mdash;
              <Link
                target='_blank'
                href={PATHS.seagulls}
                rel='noreferrer'
                underline='whileHover'
                color='3'
              >
                Elegant Seagulls
              </Link>
              .
            </Paragraph>
            <BodyText>
              Other stuff I&apos;m working on{' '}
              <CustomLink
                data-cy='now-link'
                css={{ color: '2', underline: true }}
                href={PATHS.now}
              >
                now
              </CustomLink>
            </BodyText>
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
              <ArrowRightIcon aria-hidden color='var(--colors-slate11)' />
            </Grid>
          </Flex>
          <ProjectGrid />
        </Stack>

        {/* Writing */}
        <Stack as='section' gap='m'>
          <Flex direction='row' justify='between' align='center'>
            <H1 leading='tight'>Writing</H1>
            <Grid
              gap='2xs'
              justify='end'
              align='center'
              css={{ gridTemplateColumns: 'auto auto' }}
            >
              <NextLink href={PATHS.writing} passHref>
                <Link css={{ d: 'block' }} color='2' size='1' leading='tight'>
                  view all
                </Link>
              </NextLink>
              <ArrowRightIcon aria-hidden color='var(--colors-slate11)' />
            </Grid>
          </Flex>
          <Stack as='ul' gap='m'>
            {featuredWritings?.map(({ fileName, metaData }) => (
              <StyledListItem key={fileName} as='li'>
                <div>
                  <NextLink
                    href={`${PATHS.writing}/[slug]`}
                    as={`${PATHS.writing}/${fileName.replace(/\.mdx?$/, '')}`}
                    passHref
                  >
                    <Link size='1'>{metaData?.title}</Link>
                  </NextLink>
                </div>
                <Text size='1' family='serif' as='time' dateTime='2021-12-08'>
                  {parseDateToLongDateString(metaData?.publishDate)}
                </Text>
              </StyledListItem>
            ))}
          </Stack>
        </Stack>

        {/* Connect */}

        <Stack as='section' gap='m'>
          <H1 leading='tight'>Connect</H1>
          <Stack gap='xl'>
            <Paragraph>
              I&apos;m not currently looking for new opportunities, but feel
              free to reach out if you&apos;d like. I&apos;m always happy to
              hear from folks and talk shop.
            </Paragraph>
            <Stack as='ul' gap='s'>
              <Grid align='center' as='li' gap='s' columns='3'>
                <H2 size='1' leading='tight'>
                  Twitter
                </H2>
                <div style={{ gridColumn: '2 / span 2' }}>
                  <div>
                    <Link
                      target='_blank'
                      href={PATHS.twitter}
                      rel='noreferrer'
                      size='1'
                      color='2'
                      leading='tight'
                      css={{ d: 'inline-block' }}
                    >
                      @jennings_hunter
                    </Link>
                  </div>
                </div>
              </Grid>
              <Grid align='center' as='li' gap='s' columns='3'>
                <H2 size='1' leading='tight'>
                  Email
                </H2>
                <div style={{ gridColumn: '2 / span 2' }}>
                  <div>
                    <Link
                      href={PATHS.email}
                      css={{ d: 'inline-block' }}
                      leading='tight'
                      size='1'
                      color='2'
                    >
                      jenningsdhunter@gmail.com
                    </Link>
                  </div>
                </div>
              </Grid>
              <Grid align='center' as='li' gap='s' columns='3'>
                <H2 size='1' leading='tight'>
                  Github
                </H2>
                <div style={{ gridColumn: '2 / span 2' }}>
                  <div>
                    <Link
                      css={{ d: 'inline-block' }}
                      target='_blank'
                      href={PATHS.github}
                      rel='noreferrer'
                      size='1'
                      color='2'
                      leading='tight'
                    >
                      h-jennings
                    </Link>
                  </div>
                </div>
              </Grid>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  featuredWritings: MdxData[];
}> = () => {
  const writingsData = sortMdxDataByDateDesc(getAllWritingsData());

  const featuredWritings: MdxData[] = writingsData.filter(
    (writing) => writing?.metaData?.featured,
  );

  return {
    props: { featuredWritings },
  };
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
  defaultVariants: {
    gap: '3xs',
  },
});

export default Index;
