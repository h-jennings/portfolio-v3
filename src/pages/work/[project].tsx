import { styled } from '@/stitches.config';
import { ProjectLinks } from '@components/pages/work/ProjectLinks';
import { Box } from '@components/primitives/Box';
import { Stack } from '@components/primitives/Stack';
import { BodyText, H2, PageHeader } from '@components/primitives/text';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { PATHS } from '@utils/constants/paths.constants';
import {
  ProjectMeta,
  ProjectPageData,
  PROJECT_METADATA,
  PROJECT_PAGE_DATA,
} from '@utils/constants/projects.constants';
import { commaSeparated } from '@utils/helpers/string.helpers';
import { ProjectIdentifiers } from '@utils/types/projects';
import { NextPage } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';
import React from 'react';

const ImageGridContainer = styled('div', {
  d: 'grid',
  gap: '$2',
  gtc: '1fr',
  '@bp1': {
    gtc: 'repeat(2, 1fr)',
    '> :nth-child(3n+1)': {
      gridColumn: '1 / -1',
    },
  },
});
function ImageGrid({ images }: { images: string[] }): JSX.Element {
  return (
    <ImageGridContainer>
      {images.map((image) => (
        <div key={image}>
          <AspectRatioPrimitive.Root ratio={16 / 9}>
            <Box
              css={{
                height: '$full',
                backgroundColor: '$slate8',
              }}
            ></Box>
          </AspectRatioPrimitive.Root>
        </div>
      ))}
    </ImageGridContainer>
  );
}

const SplitGrid = styled('div', {
  d: 'grid',
  columnGap: '$3',
  rowGap: '$7',
  gtc: '1fr',
  '@bp2': {
    gtc: 'repeat(2, 1fr)',
  },
  '@bp3': {
    gtc: '1fr 60%',
  },
});

const InfoGrid = styled('div', {
  d: 'grid',
  gtc: 'repeat(2, 1fr)',
  columnGap: '$2',
  rowGap: '$4',
  '@bp1': {
    gtc: 'repeat(2, minmax(auto, 290px))',
  },
  '@bp2': {
    gtc: '1fr',
  },
});
const Work: NextPage<{
  projectData: ProjectPageData | undefined;
  projectIndex: number;
  statusCode: number;
  description: string | undefined;
}> = ({ projectData, projectIndex, statusCode, description }) => {
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

  // if (statusCode !== 200) {
  //   const title = 'Page Not Found | Hunter Jennings';
  //   const SEO: NextSeoProps = {
  //     title,
  //     openGraph: {
  //       title,
  //     },
  //   };
  //   return (
  //     <>
  //       <NextSeo {...SEO} nofollow noindex />
  //       <Error statusCode={statusCode} />
  //     </>
  //   );
  // }

  return (
    <>
      <NextSeo {...SEO} />
      <Stack gap={{ '@initial': '7', '@bp3': '9' }}>
        <SplitGrid>
          <Stack gap='4'>
            <PageHeader>{projectData?.project}</PageHeader>
            <Stack gap='2'>
              <H2 size='1' color='3'>
                DESCRIPTION
              </H2>
              <BodyText
                style={{
                  maxWidth: 390,
                }}
              >
                {projectData?.details}
              </BodyText>
            </Stack>
            <InfoGrid>
              <Stack gap='2'>
                <H2 size='1' color='3'>
                  TECH
                </H2>
                <BodyText
                  style={{
                    maxWidth: 290,
                  }}
                >
                  {projectData?.tech ? commaSeparated(projectData.tech) : null}
                </BodyText>
              </Stack>
              <Stack gap='2'>
                <H2 size='1' color='3'>
                  CONTRIBUTIONS
                </H2>
                <BodyText
                  style={{
                    maxWidth: 290,
                  }}
                >
                  {projectData?.contribution
                    ? commaSeparated(projectData.contribution)
                    : null}
                </BodyText>
              </Stack>
            </InfoGrid>
          </Stack>
          <div>
            {projectData?.images ? (
              <ImageGrid images={projectData.images} />
            ) : null}
          </div>
        </SplitGrid>
        <ProjectLinks projectIndex={projectIndex} />
      </Stack>
    </>
  );
};

Work.getInitialProps = (context) => {
  const {
    query: { project },
  } = context;

  const projectData: ProjectPageData | undefined =
    PROJECT_PAGE_DATA[project as ProjectIdentifiers];
  const projectMeta: ProjectMeta | undefined =
    PROJECT_METADATA[project as ProjectIdentifiers];
  const projectIndex = Object.keys(PROJECT_PAGE_DATA)
    .map((key) => key)
    .indexOf(project as string);

  return {
    projectData,
    projectIndex,
    description: projectMeta?.description,
    statusCode: projectData ? 200 : 404,
  };
};

export default Work;
