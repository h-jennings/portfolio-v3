import {
  GetProjectsDocument,
  GetProjectsQuery,
  GetProjectsQueryVariables,
} from '@/graphql/generated/types.generated';
import { spawnHygraphCMSClientInstance, withUrqlSSR } from '@/graphql/urql';
import { styled } from '@/stitches.config';
import { StyledLink } from '@components/common/CustomLink';
import { Flex } from '@components/common/Flex';
import { Grid } from '@components/common/Grid';
import { ArrowRightIcon } from '@components/common/icons/ArrowRightIcon';
import { Stack } from '@components/common/Stack';
import {
  BodyText,
  H1,
  H2,
  H3,
  Link,
  Paragraph,
  Text,
} from '@components/common/Text';
import { ProjectGrid } from '@components/home/ProjectGrid';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { PATHS } from '@utils/common/constants/paths.constants';
import {
  parseDateToLongDateString,
  sortMdxDataByDateDesc,
} from '@utils/common/helpers/date.helpers';
import { getAllWritingsData } from '@utils/common/helpers/mdx-data.helpers';
import { MdxData } from '@utils/common/types/mdx-data';
import type { GetStaticProps, InferGetStaticPropsType, PageConfig } from 'next';
import { NextSeo } from 'next-seo';
import NextLink from 'next/link';
import * as React from 'react';

const Index = ({
  featuredWritings,
  count,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        title='Home'
        openGraph={{
          title: 'Home',
        }}
      />
      <VisuallyHidden.Root>
        <H1>Home</H1>
      </VisuallyHidden.Root>
      <Stack gap='3xl'>
        <IntroductionSection />
        <WorkSection count={count} />
        <WritingsSection writings={featuredWritings} />
        <ConnectSection />
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  featuredWritings: MdxData[] | [];
  count: number;
}> = async ({ preview }) => {
  const { client, ssrCache } = spawnHygraphCMSClientInstance(preview);
  const PROJECT_COUNT = 3;

  await client
    ?.query<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, {
      count: PROJECT_COUNT,
    })
    .toPromise();

  const writingsData = sortMdxDataByDateDesc(getAllWritingsData());

  const featuredWritings: MdxData[] | [] = writingsData
    .filter((writing) => writing.metaData.status !== 'draft')
    .filter((writing) => writing.metaData.featured);

  return {
    props: {
      urqlState: ssrCache.extractData(),
      count: PROJECT_COUNT,
      featuredWritings,
    },
    revalidate: 60,
  };
};

const IntroductionSection = () => {
  return (
    <Stack as='section' gap='xl'>
      <Stack gap='m'>
        <H2
          aria-label='Who is Hunter Jennings'
          size='2'
          family='serif'
          leading='tight'
        >
          Hunter Jennings
        </H2>
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
          <Link href={PATHS.seagulls} underline='whileHover' color='3'>
            Elegant Seagulls
          </Link>
          .
        </Paragraph>
        <BodyText>
          Other stuff I&apos;m working on{' '}
          <StyledLink data-cy='now-link' color='2' underline href={PATHS.now}>
            now
          </StyledLink>
        </BodyText>
      </Stack>
    </Stack>
  );
};

const WorkSection = ({ count }: { count: number }) => {
  return (
    <Stack as='section' gap='s'>
      <Flex direction='row' justify='between' align='center'>
        <H2 leading='tight'>Selected work</H2>
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
      <ProjectGrid count={count} />
    </Stack>
  );
};

interface WritingsSectionProps {
  writings: MdxData[] | [];
}

const WritingsSection = ({ writings }: WritingsSectionProps) => {
  const hasWritings = writings.length > 0;

  if (!hasWritings) return null;

  return (
    <Stack as='section' gap='m'>
      <Flex direction='row' justify='between' align='center'>
        <H2 leading='tight'>Writing</H2>
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
        {writings.map(({ fileName, metaData }) => {
          return (
            <StyledListItem key={fileName} as='li'>
              <div>
                <NextLink
                  href={`${PATHS.writing}/[slug]`}
                  as={`${PATHS.writing}/${fileName.replace(/\.mdx?$/, '')}`}
                  passHref
                >
                  <Link size='1'>{metaData.title}</Link>
                </NextLink>
              </div>
              <Text size='1' family='serif' as='time' dateTime='2021-12-08'>
                {parseDateToLongDateString(metaData.publishDate)}
              </Text>
            </StyledListItem>
          );
        })}
      </Stack>
    </Stack>
  );
};

const ConnectSection = () => {
  return (
    <Stack as='section' gap='m'>
      <H2 leading='tight'>Connect</H2>
      <Stack gap='xl'>
        <Paragraph>
          I&apos;m not currently looking for new opportunities, but feel free to
          reach out if you&apos;d like. I&apos;m always happy to hear from folks
          and talk shop.
        </Paragraph>
        <Stack as='ul' gap='s'>
          <ConnectLinkListItem label='Twitter'>
            <Link
              href={PATHS.twitter}
              size='1'
              color='2'
              leading='tight'
              css={{ d: 'inline-block' }}
            >
              @jennings_hunter
            </Link>
          </ConnectLinkListItem>
          <ConnectLinkListItem label='Email'>
            <Link
              href={PATHS.email}
              css={{ d: 'inline-block' }}
              leading='tight'
              size='1'
              color='2'
            >
              jenningsdhunter@gmail.com
            </Link>
          </ConnectLinkListItem>
          <ConnectLinkListItem label='Github'>
            <Link
              css={{ d: 'inline-block' }}
              href={PATHS.github}
              size='1'
              color='2'
              leading='tight'
            >
              h-jennings
            </Link>
          </ConnectLinkListItem>
          <ConnectLinkListItem label='Resume'>
            <Link
              css={{ d: 'inline-block' }}
              href={PATHS.cv}
              size='1'
              color='2'
              leading='tight'
            >
              read.cv/hunterjennings
            </Link>
          </ConnectLinkListItem>
        </Stack>
      </Stack>
    </Stack>
  );
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

interface ConnectLinkListItemProps {
  label: string;
}

const ConnectLinkListItem = ({
  label,
  children,
}: React.PropsWithChildren<ConnectLinkListItemProps>) => {
  return (
    <Grid align='center' as='li' gap='s' columns='3'>
      <H3 size='1' leading='tight'>
        {label}
      </H3>
      <div style={{ gridColumn: '2 / span 2' }}>
        <div>{children}</div>
      </div>
    </Grid>
  );
};

export const config: PageConfig = {
  unstable_includeFiles: ['../data/writings/**/*.mdx'],
};

export default withUrqlSSR(Index);
