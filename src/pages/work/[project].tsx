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
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
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
              <ImageGrid gap='s'>
                {projectData.media.map(({ type, url }, idx) => {
                  const isEven = (idx + 1) % 2 === 0;
                  const width = isEven ? 220 : 460;
                  const height = 275;

                  const item = (idx % 3) as 0 | 1 | 2;

                  return (
                    <MediaContainer key={idx} item={item}>
                      <RenderMedia
                        type={type}
                        url={url}
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
interface MediaProps {
  url: string;
  width: number;
  height: number;
}

type ImageProps = {
  type: 'image';
} & MediaProps;

type VideoProps = {
  type: 'video';
} & MediaProps;

const RenderMedia = (props: ImageProps | VideoProps) => {
  const Component = (() => {
    switch (props.type) {
      case 'image':
        return <ImageMedia {...props} />;
      case 'video':
        return <VideoMedia {...props} />;
      default:
        return null;
    }
  })();

  return Component;
};

const ImageMedia = (props: ImageProps) => {
  const { url, width, height } = props;
  return (
    <Image
      src={url}
      alt=''
      layout='responsive'
      blurDataURL={url}
      placeholder='blur'
      objectFit='cover'
      width={width}
      height={height}
      quality={95}
    />
  );
};

const VideoMedia = (props: VideoProps) => {
  const { url, width, height } = props;
  return (
    <AspectRatio.Root ratio={width / height}>
      <video
        src={url}
        style={{
          objectFit: 'cover',
          height: '100%',
        }}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      />
    </AspectRatio.Root>
  );
};

const MediaContainer = styled('div', {
  borderRadius: '15px',
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

export default Project;
