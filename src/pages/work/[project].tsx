import { styled } from '@/stitches.config';
import { BackToLink } from '@components/common/BackToLink';
import { Box } from '@components/common/Box';
import { ButtonLink } from '@components/common/CustomLink';
import { Flex } from '@components/common/Flex';
import { Grid } from '@components/common/Grid';
import { ArrowTopRightIcon } from '@components/common/icons/ArrowTopRightIcon';
import { Media } from '@components/common/Media';
import {
  ScrollContainerArea,
  ScrollContainerScrollbar,
  ScrollContainerThumb,
  ScrollContainerViewport,
} from '@components/common/ScrollContainer';
import { Seo } from '@components/common/Seo';
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
import {
  ProjectData,
  PROJECT_DATA,
} from '@utils/work/constants/projects.constants';
import { ProjectIdentifiers } from '@utils/work/types/projects';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

const Project = ({
  projectData,
  projectIndex,
  description,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Seo
        title={projectData.project}
        url={`${PATHS.base}${projectData.path}`}
        description={description}
        image={projectData.seoImage}
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
                      <Media
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

export const getStaticPaths: GetStaticPaths = () => {
  const paths = Object.keys(PROJECT_DATA).map((pageId) => ({
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
  projectData: ProjectData;
  projectIndex: number;
  description: string;
}> = ({ params }) => {
  const project = params?.project;

  const projectData = PROJECT_DATA[project as ProjectIdentifiers];

  const projectIndex = Object.keys(PROJECT_DATA)
    .map((key) => key)
    .indexOf(project as string);

  return {
    props: {
      projectData,
      projectIndex,
      description: projectData.description,
    },
  };
};

export default Project;
