import { LinkBox, LinkOverlay } from '@/components/primitives/LinkBox';
import { Stack } from '@/components/primitives/Stack';
import { pageHeader, text, Text } from '@/components/primitives/Text';
import { PATHS } from '@/constants/paths';
import { ProjectPageData, projectPageData } from '@/constants/projects';
import { prevNextProjectData } from '@/helpers/prev-next-project-data';
import { commaSeparated } from '@/helpers/string-helpers';
import { css } from '@/stitches.config';
import { ProjectIdentifiers } from '@/types/projects';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { NextPage } from 'next';
import NextLink from 'next/link';
import React from 'react';
import { CustomError } from '../_error';

const imageGrid = css({
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
    <div className={imageGrid()}>
      {images.map((image) => (
        <div key={image}>
          <AspectRatioPrimitive.Root ratio={16 / 9}>
            <div
              className={css({
                height: '$full',
                backgroundColor: '$slate8',
              })()}
            ></div>
          </AspectRatioPrimitive.Root>
        </div>
      ))}
    </div>
  );
}

const container = css({
  d: 'flex',
  '> div': {
    flex: 1,
    d: 'flex',
    jc: 'center',
    py: '$5',
  },
  position: 'relative',
  borderTop: '1px solid $slate8',
  borderBottom: '1px solid $slate8',
  '> :nth-child(2n)': {
    position: 'relative',
  },
  '> :nth-child(2n):before': {
    content: "''",
    position: 'absolute',
    left: 0,
    top: 0,
    height: '$full',
    width: '1px',
    backgroundColor: '$slate8',
  },
});
function NextPrevProjects({
  projectIndex,
}: {
  projectIndex: number;
}): JSX.Element {
  const [previous, next] = prevNextProjectData(projectIndex);

  return (
    <div className={container()}>
      {previous ? (
        <LinkBox>
          <NextLink
            passHref
            href={`${PATHS.work}/[project]`}
            as={previous.path}
          >
            <LinkOverlay>
              <Text
                size={{ '@initial': '2', '@bp3': '3' }}
                css={{ lineHeight: '$body' }}
              >
                {previous.project}
              </Text>
            </LinkOverlay>
          </NextLink>
        </LinkBox>
      ) : null}
      {next ? (
        <LinkBox>
          <NextLink passHref href={`${PATHS.work}/[project]`} as={next.path}>
            <LinkOverlay>
              <Text
                size={{ '@initial': '2', '@bp3': '3' }}
                css={{ lineHeight: '$body' }}
              >
                {next.project}
              </Text>
            </LinkOverlay>
          </NextLink>
        </LinkBox>
      ) : null}
    </div>
  );
}

const splitGrid = css({
  d: 'grid',
  columnGap: '$3',
  rowGap: '$5',
  gtc: '1fr',
  '@bp2': {
    gtc: 'repeat(2, 1fr)',
  },
  '@bp3': {
    gtc: '1fr 60%',
  },
});
const bodyText = css(text, {
  color: '$text2',
  lineHeight: '$body',
  fontSize: '$1',
  '@bp2': {
    fontSize: '$2',
  },
});
const infoGrid = css({
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
const detailsText = css(bodyText, {
  maxWidth: 390,
});
const infoText = css(bodyText, {
  maxWidth: 290,
});
const Work: NextPage<{
  projectData: ProjectPageData | undefined;
  projectIndex: number;
  statusCode: number;
}> = ({ projectData, projectIndex, statusCode }) => {
  if (statusCode === 404) {
    return <CustomError statusCode={statusCode} />;
  }

  return (
    <Stack gap='9'>
      <div className={splitGrid()}>
        <Stack gap='4'>
          <h1 className={pageHeader()}>{projectData?.project}</h1>
          <Stack gap='2'>
            <h2 className={text({ size: '1', css: { color: '$text3' } })}>
              DESCRIPTION
            </h2>
            <p className={detailsText()}>{projectData?.details}</p>
          </Stack>
          <div className={infoGrid()}>
            <Stack gap='2'>
              <h2 className={text({ size: '1', css: { color: '$text3' } })}>
                TECH
              </h2>
              <p className={infoText()}>
                {projectData?.tech ? commaSeparated(projectData.tech) : null}
              </p>
            </Stack>
            <Stack gap='2'>
              <h2 className={text({ size: '1', css: { color: '$text3' } })}>
                CONTRIBUTIONS
              </h2>
              <p className={infoText()}>
                {projectData?.contribution
                  ? commaSeparated(projectData.contribution)
                  : null}
              </p>
            </Stack>
          </div>
        </Stack>
        <div>
          {projectData?.images ? (
            <ImageGrid images={projectData.images} />
          ) : null}
        </div>
      </div>
      <NextPrevProjects projectIndex={projectIndex} />
    </Stack>
  );
};

Work.getInitialProps = (context) => {
  const {
    query: { project },
  } = context;

  const projectData: ProjectPageData | undefined =
    projectPageData[project as ProjectIdentifiers];

  const projectIndex = Object.keys(projectPageData)
    .map((key) => key)
    .indexOf(project as string);

  return {
    projectData,
    projectIndex,
    statusCode: projectData ? 200 : 404,
  };
};

export default Work;
