import { projectSlugs } from '@/api/cms.api';
import {
  GetProjectDocument,
  GetProjectQuery,
  GetProjectQueryVariables,
  useGetProjectQuery,
} from '@/graphql/generated/types.generated';
import { spawnHygraphCMSClientInstance, withUrqlSSR } from '@/graphql/urql';
import { styled } from '@/stitches.config';
import { BackToLink } from '@components/common/BackToLink';
import { Box } from '@components/common/Box';
import { ButtonLink } from '@components/common/CustomLink';
import { Flex } from '@components/common/Flex';
import { Grid } from '@components/common/Grid';
import { ArrowTopRightIcon } from '@components/common/icons/ArrowTopRightIcon';
import { Media } from '@components/common/Media';
import { RichText } from '@components/common/RichText';
import {
  ScrollContainerArea,
  ScrollContainerScrollbar,
  ScrollContainerThumb,
  ScrollContainerViewport,
} from '@components/common/ScrollContainer';
import { Seo } from '@components/common/Seo';
import { Stack } from '@components/common/Stack';
import { H2, H3, PageHeader, Paragraph, Text } from '@components/common/Text';
import { ProjectLinks } from '@components/work/ProjectLinks';
import { RichTextContent } from '@graphcms/rich-text-types';
import { PATHS } from '@utils/common/constants/paths.constants';
import { transformImageUrl } from '@utils/common/helpers/transform-image-url.helpers';
import { getYear } from 'date-fns';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { useRouter } from 'next/router';

const Project = ({
  projectIndex,
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { query } = useRouter();
  const { project: path } = query;
  const [{ data }] = useGetProjectQuery({ variables: { slug } });
  const { project, projectsMeta } = data ?? {};
  const projectDataCMS = project?.[0];
  const {
    name,
    client,
    seo,
    media,
    contribution,
    date,
    link,
    descriptionLong,
  } = projectDataCMS ?? {};

  return (
    <>
      <Seo
        title={seo?.title}
        url={`${PATHS.base}/work/${path}`}
        description={seo?.description ?? undefined}
        image={seo?.image?.url}
      />
      <Stack gap='3xl'>
        <Stack gap='xl'>
          <Box>
            <BackToLink href={PATHS.work}>Back to work</BackToLink>
            <Flex
              wrap='wrap'
              direction={{ '@initial': 'column', '@bp2': 'row' }}
              gap='3xs'
              justify='between'
              align='baseline'
            >
              <PageHeader>{name}</PageHeader>
              {client?.name ? (
                <H2 color='2' size='1'>
                  {client.name}
                </H2>
              ) : null}
            </Flex>
          </Box>
          <ScrollContainerArea>
            <ScrollContainerScrollbar orientation='horizontal'>
              <ScrollContainerThumb />
            </ScrollContainerScrollbar>
            <ScrollContainerViewport>
              <ImageGrid gap='s'>
                {media?.map(({ mediaType, url }, idx) => {
                  if (mediaType == null) return null;
                  const isEven = (idx + 1) % 2 === 0;
                  const width = isEven ? 220 : 460;
                  const height = 275;

                  const item = (idx % 3) as 0 | 1 | 2;

                  let u = url;
                  if (mediaType === 'IMAGE') {
                    u = transformImageUrl(url);
                  }

                  return (
                    <MediaContainer key={idx} item={item}>
                      <Media
                        type={mediaType}
                        url={u}
                        width={width}
                        height={height}
                      />
                    </MediaContainer>
                  );
                })}
              </ImageGrid>
            </ScrollContainerViewport>
          </ScrollContainerArea>
          <Stack gap='xs'>
            <H3 color='2' size='1' leading='tight'>
              Description
            </H3>
            {descriptionLong ? (
              <RichText content={descriptionLong.raw as RichTextContent} />
            ) : null}
          </Stack>
          <Grid gap='m' columns='3'>
            <Stack gap='xs'>
              <H3 color='2' size='1' leading='tight'>
                Contributions
              </H3>
              <Flex gap='2xs' as='ul' wrap='wrap'>
                {contribution?.map((c, i) => (
                  <Chip key={c} variant={i % 2 === 0 ? 'default' : 'darker'}>
                    {c}
                  </Chip>
                ))}
              </Flex>
            </Stack>
            <Stack css={{ gridColumn: 'span 2 / -1' }} gap='m'>
              <Stack gap='xs' css={{ gridColumn: '2 / span 2' }}>
                <H3 color='2' size='1' leading='tight'>
                  Dates
                </H3>
                <Paragraph leading='tight' size='1'>
                  {date?.map((d, i) => {
                    return (
                      <Text key={i} leading='tight' size='1'>
                        {i > 0 ? ' - ' : ''}
                        {getYear(new Date(d as string))}
                      </Text>
                    );
                  })}
                </Paragraph>
              </Stack>
              <div>
                {link ? (
                  <ButtonLink title={`Visit ${link}`} href={link}>
                    <span>Visit Site</span>
                    <ArrowTopRightIcon />
                  </ButtonLink>
                ) : null}
              </div>
            </Stack>
          </Grid>
        </Stack>
        <Stack gap='s'>
          <H3 color='2' size='1' leading='tight'>
            Other Projects
          </H3>
          <ProjectLinks
            projectIndex={projectIndex}
            projectsMeta={projectsMeta}
          />
        </Stack>
      </Stack>
    </>
  );
};

const MediaContainer = styled('div', {
  borderRadius: '$card',
  isolation: 'isolate',
  overflow: 'hidden',
  height: '$full',
  backgroundColor: '$slate8',
  variants: {
    item: {
      0: {
        gridColumn: '1 / span 2',
      },
      1: {
        gridColumn: '3 / -1',
      },
      2: {
        gridColumn: '1 / -1',
      },
    },
  },
});

const ImageGrid = styled(Grid, {
  mb: '$l',
  gtc: 'repeat(3, 40%)',
  '@bp1': { mb: 'unset', gtc: 'repeat(3, 1fr)' },
});

const Chip = styled('li', {
  px: '$2xs',
  py: '$3xs',
  whiteSpace: 'nowrap',
  borderRadius: '$pill',
  fontSize: 12,
  lineHeight: '$tight',
  variants: {
    variant: {
      darker: {
        backgroundColor: '$gold5',
        color: '$gold10',
      },
      default: {
        backgroundColor: '$gold7',
        color: '$gold10',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await projectSlugs.fetch();

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    await projectSlugs.cache.set(data);
  }

  const paths = data.projects.map((p) => {
    const { slug } = p;
    return {
      params: { project: slug },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{
  projectIndex: number;
  preview: boolean;
  slug: string;
}> = async ({ params, preview = false }) => {
  const slug = params?.project;
  const { client, ssrCache } = spawnHygraphCMSClientInstance(preview);
  const projectData = await client
    ?.query<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, {
      slug: slug as string,
    })
    .toPromise();

  if (!projectData?.data?.project[0]) {
    return {
      notFound: true,
    };
  }

  let p = await projectSlugs.cache.get();

  if (!p) {
    p = await projectSlugs.fetch();
  }

  const slugs = p.projects.map((proj) => proj.slug);
  const projectIndex = slugs.indexOf(slug as string);

  return {
    props: {
      urqlState: ssrCache.extractData(),
      projectIndex,
      preview,
      slug: slug as string,
    },
  };
};

export default withUrqlSSR(Project);
