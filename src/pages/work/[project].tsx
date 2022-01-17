import { styled } from '@/stitches.config';
import { BackToLink } from '@common/components/BackToLink';
import { Box } from '@common/components/Box';
import { Flex } from '@common/components/Flex';
import { Grid } from '@common/components/Grid';
import {
  ScrollContainerArea,
  ScrollContainerScrollbar,
  ScrollContainerThumb,
  ScrollContainerViewport,
} from '@common/components/ScrollContainer';
import { Stack } from '@common/components/Stack';
import {
  BodyText,
  H2,
  H3,
  Link,
  PageHeader,
  Paragraph,
} from '@common/components/Text';
import { PATHS } from '@common/utils/constants/paths.constants';
import { getMetaImage } from '@common/utils/helpers/meta-image.helpers';
import { ProjectLinks } from '@work/components/ProjectLinks';
import {
  ProjectMeta,
  ProjectPageData,
  PROJECT_METADATA,
  PROJECT_PAGE_DATA,
} from '@work/utils/constants/projects.constants';
import { ProjectIdentifiers } from '@work/utils/types/projects';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';
import Image from 'next/image';
import * as React from 'react';

const Project = ({
  projectData,
  projectIndex,
  description,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = `${projectData?.project} | Hunter Jennings`;
  const url = `${PATHS.base}${projectData?.path}`;
  const image = projectData?.metaImage;
  const [imageLeft, imageRight] = projectData?.images;
  const SEO: NextSeoProps = {
    title,
    canonical: url,
    description,
    openGraph: {
      title,
      url,
      description,
      ...getMetaImage(image),
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <Stack gap='3xl'>
        <Stack gap='xl'>
          <Box>
            <BackToLink href={PATHS.home}>Back to home</BackToLink>
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
                  <ImageContainer
                    css={{
                      gridColumn: '1 / span 2',
                    }}
                  >
                    <Image
                      src={imageLeft}
                      alt=''
                      layout='responsive'
                      blurDataURL={imageLeft}
                      placeholder='blur'
                      width={460}
                      height={275}
                      quality={95}
                    />
                  </ImageContainer>
                  <ImageContainer>
                    <Image
                      src={imageRight}
                      alt=''
                      layout='responsive'
                      blurDataURL={imageLeft}
                      placeholder='blur'
                      width={220}
                      height={275}
                      quality={95}
                    />
                  </ImageContainer>
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
            <Stack gap='l'>
              <Stack gap='xs' css={{ gridColumn: '2 / span 2' }}>
                <H3 color='2' size='1' leading='tight'>
                  Dates
                </H3>
                <Paragraph leading='tight' size='1'>
                  {projectData?.dates}
                </Paragraph>
              </Stack>
              {projectData?.url ? (
                <div>
                  <Link
                    href={projectData.url}
                    color='2'
                    size='1'
                    underline='whileHover'
                    leading='tight'
                  >
                    Link to the site
                  </Link>
                </div>
              ) : null}
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
};

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

const ImageContainer = styled('div', {
  borderRadius: '15px',
  overflow: 'hidden',
  backgroundColor: '$slate8',
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

export default Project;
