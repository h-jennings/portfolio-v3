/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import {
  GetProjectsDocument,
  GetProjectsQuery,
  useGetProjectsQuery,
} from '@/graphql/generated/types.generated';
import { spawnHygraphCMSClientInstance, withUrqlSSR } from '@/graphql/urql';
import { styled } from '@/stitches.config';
import { BackToLink } from '@components/common/BackToLink';
import { Box } from '@components/common/Box';
import { Grid } from '@components/common/Grid';
import { LinkBox, LinkOverlay } from '@components/common/LinkBox';
import { Media } from '@components/common/Media';
import { ProjectCard } from '@components/common/ProjectCard';
import { Seo } from '@components/common/Seo';
import { Stack } from '@components/common/Stack';
import { H2, PageHeader, Paragraph } from '@components/common/Text';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';
import { PATHS } from '@utils/common/constants/paths.constants';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';

const Work = () => {
  const [{ data }] = useGetProjectsQuery();
  const { projects } = data ?? {};

  const featuredProject = projects
    ?.filter((project) => Boolean(project.featured))
    .map((project) => project)[0];

  return (
    <>
      <Seo
        title='Work'
        description='A curated collection of my work throughout the years.'
        url={`${PATHS.base}${PATHS.work}`}
      />
      <Stack gap='xl'>
        <Box>
          <BackToLink href={PATHS.home}>Back to home</BackToLink>
          <PageHeader>Work</PageHeader>
        </Box>
        {featuredProject ? (
          <Stack gap='m'>
            <H2 size='2' leading='tight'>
              Featured
            </H2>
            <LinkBox>
              <Box
                css={{
                  px: '$s',
                  pt: '$s',
                  pb: '$m',
                  borderRadius: 'calc($space$s + $card)',
                  backgroundColor: '$slate3',
                }}
              >
                <Stack gap='m'>
                  {featuredProject.featureMediaWide.mediaType ? (
                    <FeaturedMediaContainer>
                      <Media
                        type={featuredProject.featureMediaWide.mediaType}
                        url={featuredProject.featureMediaWide.url}
                        width={460}
                        height={275}
                      />
                    </FeaturedMediaContainer>
                  ) : null}
                  <Box>
                    <NextLink
                      href={`${PATHS.work}/[project]`}
                      as={`${PATHS.work}/${featuredProject.slug}`}
                      passHref
                    >
                      <LinkOverlay>
                        <Paragraph size='1' css={{ d: 'inline-block' }}>
                          {featuredProject.name}
                        </Paragraph>
                      </LinkOverlay>
                    </NextLink>
                    {featuredProject.description ? (
                      <RichText
                        renderers={{
                          p: ({ children }) => (
                            <Paragraph size='1' color='2' css={{ pt: '$3xs' }}>
                              {children}
                            </Paragraph>
                          ),
                        }}
                        content={
                          featuredProject.description.raw as RichTextContent
                        }
                      />
                    ) : null}
                  </Box>
                </Stack>
              </Box>
            </LinkBox>
          </Stack>
        ) : null}
        <Stack gap='m'>
          <H2 size='2' leading='tight'>
            All Work
          </H2>
          <Grid
            gap='s'
            gapY='m'
            css={{
              gtc: 'repeat(auto-fill, minmax(200px, 1fr))',
            }}
            as='ul'
          >
            {projects?.map((project) => {
              return (
                <li key={project.id}>
                  <ProjectCard project={project} />
                </li>
              );
            })}
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};

const FeaturedMediaContainer = styled('div', {
  borderRadius: '$card',
  isolation: 'isolate',
  overflow: 'hidden',
  height: '$full',
  backgroundColor: '$slate8',
});

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const { client, ssrCache } = spawnHygraphCMSClientInstance(preview);
  const projectsData = await client
    ?.query<GetProjectsQuery>(GetProjectsDocument, {})
    .toPromise();

  if (!projectsData?.data?.projects) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withUrqlSSR(Work);
