import { Stack } from '@/components/primitives/Stack';
import { pageHeader, text } from '@/components/primitives/Text';
import { ProjectPageData, projectPageData } from '@/constants/projects';
import { commaSeparated } from '@/helpers/string-helpers';
import { css } from '@/stitches.config';
import { ProjectIdentifiers } from '@/types/projects';
import { NextPage } from 'next';
import React from 'react';
import { CustomError } from '../_error';

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
  statusCode: number;
}> = ({ projectData, statusCode }) => {
  if (statusCode === 404) {
    return <CustomError statusCode={statusCode} />;
  }

  return (
    <div>
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
    </div>
  );
};

Work.getInitialProps = (context) => {
  const {
    query: { project },
  } = context;

  const projectData: ProjectPageData | undefined =
    projectPageData[project as ProjectIdentifiers];

  return {
    projectData,
    statusCode: projectData ? 200 : 404,
  };
};

export default Work;
