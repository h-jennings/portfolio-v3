import { BackToHome } from '@/components/BackToHome';
import { Box } from '@/components/Box';
import { Flex } from '@/components/Flex';
import { Grid } from '@/components/Grid';
import {
  ScrollContainerArea,
  ScrollContainerScrollbar,
  ScrollContainerThumb,
  ScrollContainerViewport,
} from '@/components/layout/ScrollContainer';
import { styled } from '@/stitches.config';
import { ProjectLinks } from '@components/pages/work/ProjectLinks';
import { Stack } from '@components/Stack';
import { BodyText, H2, H3, PageHeader, Paragraph } from '@components/Text';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { PATHS } from '@utils/constants/paths.constants';
import {
  ProjectMeta,
  ProjectPageData,
  PROJECT_METADATA,
  PROJECT_PAGE_DATA,
} from '@utils/constants/projects.constants';
import { ProjectIdentifiers } from '@utils/types/projects';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';
import * as React from 'react';

export const getStaticPaths: GetStaticPaths = () => {
  const paths = Object.keys(PROJECT_PAGE_DATA).map((pageId) => ({
    params: {
      project: pageId,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps<{
  projectData: ProjectPageData;
  projectIndex: number;
  description: string;
}> = ({ params }) => {
  const project = params?.project;

  const projectData: ProjectPageData | undefined =
    PROJECT_PAGE_DATA[project as ProjectIdentifiers];
  const projectMeta: ProjectMeta | undefined =
    PROJECT_METADATA[project as ProjectIdentifiers];
  const projectIndex = Object.keys(PROJECT_PAGE_DATA)
    .map((key) => key)
    .indexOf(project as string);

  return {
    props: {
      projectData,
      projectIndex,
      description: projectMeta?.description,
    },
  };
};

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

function Project({
  projectData,
  projectIndex,
  description,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const SEO: NextSeoProps = React.useMemo(() => {
    const title = `${projectData?.project} | Hunter Jennings`;
    const url = `${PATHS.base}${projectData?.path}`;
    return {
      title,
      canonical: url,
      description,
      openGraph: {
        title,
        url,
        description,
      },
    };
  }, [projectData, description]);

  return (
    <>
      <NextSeo {...SEO} />
      <Stack gap='3xl'>
        <Stack gap='xl'>
          <Box>
            <BackToHome />
            <Flex
              wrap='wrap'
              direction={{ '@initial': 'column', '@bp2': 'row' }}
              gap='3xs'
              justify='between'
              align='baseline'
            >
              <PageHeader>{projectData?.project}</PageHeader>
              <H2 color='2' size='1'>
                {projectData?.client}
              </H2>
            </Flex>
          </Box>
          {projectData?.images ? (
            <ScrollContainerArea>
              <ScrollContainerScrollbar orientation='horizontal'>
                <ScrollContainerThumb />
              </ScrollContainerScrollbar>
              <ScrollContainerViewport>
                <Grid
                  gap='s'
                  css={{
                    mb: '$l',
                    gtc: 'repeat(3, 40%)',
                    '@bp1': { mb: 'unset', gtc: 'repeat(3, 1fr)' },
                  }}
                >
                  <Box css={{ gridColumn: '1 / span 2' }}>
                    <AspectRatio.Root ratio={92 / 55}>
                      <Box
                        css={{
                          backgroundColor: '$slate8',
                          height: '100%',
                          borderRadius: '15px',
                        }}
                      />
                    </AspectRatio.Root>
                  </Box>
                  <Box>
                    <AspectRatio.Root ratio={4 / 5}>
                      <Box
                        css={{
                          backgroundColor: '$slate8',
                          borderRadius: '15px',
                          height: '100%',
                        }}
                      />
                    </AspectRatio.Root>
                  </Box>
                </Grid>
              </ScrollContainerViewport>
            </ScrollContainerArea>
          ) : null}
          <Stack gap='xs'>
            <H3 color='2' size='1' leading='tight'>
              Description
            </H3>
            <BodyText>{projectData?.details}</BodyText>
          </Stack>
          <Grid gap='s' columns='3'>
            <Stack gap='xs'>
              <H3 color='2' size='1' leading='tight'>
                Contributions
              </H3>
              <Flex gap='2xs' as='ul' wrap='wrap'>
                {projectData.contributions.map((contribution, i) => (
                  <Chip
                    key={contribution}
                    variant={i % 2 === 0 ? 'default' : 'darker'}
                  >
                    {contribution}
                  </Chip>
                ))}
              </Flex>
            </Stack>
            <Stack gap='xs' css={{ gridColumn: '2 / span 2' }}>
              <H3 color='2' size='1' leading='tight'>
                Dates
              </H3>
              <Paragraph leading='tight' size='1'>
                {projectData?.dates}
              </Paragraph>
            </Stack>
          </Grid>
        </Stack>
        <Stack gap='s'>
          <H3 color='2' size='1' leading='tight'>
            Other Projects
          </H3>
          <ProjectLinks projectIndex={projectIndex} />
        </Stack>
      </Stack>
    </>
  );
}

export default Project;
