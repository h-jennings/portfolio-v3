/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { styled } from '@/stitches.config';
import { BackToLink } from '@components/common/BackToLink';
import { Box } from '@components/common/Box';
import { ButtonLink } from '@components/common/CustomLink';
import { Flex } from '@components/common/Flex';
import { Grid } from '@components/common/Grid';
import { ArrowTopRightIcon } from '@components/common/icons/ArrowTopRightIcon';
import {
  ScrollContainerArea,
  ScrollContainerScrollbar,
  ScrollContainerThumb,
  ScrollContainerViewport,
} from '@components/common/ScrollContainer';
import { Stack } from '@components/common/Stack';
import {
  BodyText,
  H2,
  H3,
  PageHeader,
  Paragraph,
} from '@components/common/Text';
import { ProjectLinks } from '@components/work/ProjectLinks';
import { PATHS } from '@utils/common/constants/paths.constants';
import { getMetaImage } from '@utils/common/helpers/meta-image.helpers';
import {
  ProjectMeta,
  ProjectPageData,
  PROJECT_METADATA,
  PROJECT_PAGE_DATA,
} from '@utils/work/constants/projects.constants';
import { ProjectIdentifiers } from '@utils/work/types/projects';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';
import Image from 'next/image';

const Project = ({
  projectData,
  projectIndex,
  description,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = `${projectData.project} | Hunter Jennings`;
  const url = `${PATHS.base}${projectData.path}`;
  const image = projectData.metaImage;
  const [imageLeft, imageRight] = projectData.images;
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
              <PageHeader>{projectData.project}</PageHeader>
              <H2 color='2' size='1'>
                {projectData.client}
              </H2>
            </Flex>
          </Box>
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
          <Stack gap='xs'>
            <H3 color='2' size='1' leading='tight'>
              Description
            </H3>
            <BodyText>{projectData.details}</BodyText>
          </Stack>
          <Grid gap='m' columns='3'>
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
            <Stack css={{ gridColumn: 'span 2 / -1' }} gap='m'>
              <Stack gap='xs' css={{ gridColumn: '2 / span 2' }}>
                <H3 color='2' size='1' leading='tight'>
                  Dates
                </H3>
                <Paragraph leading='tight' size='1'>
                  {projectData.dates}
                </Paragraph>
              </Stack>
              <div>
                {projectData.url ? (
                  <ButtonLink
                    title={`Visit ${projectData.url}`}
                    href={projectData.url}
                  >
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

  const projectData: ProjectPageData =
    PROJECT_PAGE_DATA[project as ProjectIdentifiers];
  const projectMeta: ProjectMeta =
    PROJECT_METADATA[project as ProjectIdentifiers];
  const projectIndex = Object.keys(PROJECT_PAGE_DATA)
    .map((key) => key)
    .indexOf(project as string);

  return {
    props: {
      projectData,
      projectIndex,
      description: projectMeta.description,
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
