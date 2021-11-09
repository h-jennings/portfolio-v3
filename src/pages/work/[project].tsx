import { Stack } from '@/components/primitives/Stack';
import { pageHeader, text } from '@/components/primitives/Text';
import { ProjectLinks } from '@/components/ProjectLinks';
import { ProjectPageData, projectPageData } from '@/constants/projects';
import { commaSeparated } from '@/helpers/string-helpers';
import { css } from '@/stitches.config';
import { ProjectIdentifiers } from '@/types/projects';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { NextPage } from 'next';
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

const splitGrid = css({
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
  if (statusCode !== 200) {
    return <CustomError statusCode={statusCode} />;
  }

  return (
    <Stack gap={{ '@initial': '7', '@bp3': '9' }}>
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
      <ProjectLinks projectIndex={projectIndex} />
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
