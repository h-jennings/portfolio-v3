import { Stack } from '@/components/primitives/Stack';
import { pageHeader, text } from '@/components/primitives/Text';
import { projectPageData } from '@/constants/projects';
import { css } from '@/stitches.config';
import { ProjectIdentifiers } from '@/types/projects';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

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

const Work: NextPage<{ project: string }> = () => {
  const router = useRouter();
  const { project } = router.query;
  const data = projectPageData[project as ProjectIdentifiers];
  return (
    <div>
      <Stack gap='4'>
        <h1 className={pageHeader()}>{data?.project}</h1>
        <Stack gap='2'>
          <h2 className={text({ size: '1', css: { color: '$text3' } })}>
            DESCRIPTION
          </h2>
          <p className={detailsText()}>{data?.details}</p>
        </Stack>
        <div className={infoGrid()}>
          <Stack gap='2'>
            <h2 className={text({ size: '1', css: { color: '$text3' } })}>
              TECH
            </h2>
            <p className={infoText()}>
              {data?.tech.reduce((acc, curr, idx) => {
                if (idx === 0) {
                  return `${curr}`;
                }
                return `${acc}, ${curr}`;
              }, '')}
            </p>
          </Stack>
          <Stack gap='2'>
            <h2 className={text({ size: '1', css: { color: '$text3' } })}>
              CONTRIBUTIONS
            </h2>
            <p className={infoText()}>
              {data?.contribution.reduce((acc, curr, idx) => {
                if (idx === 0) {
                  return `${curr}`;
                }
                return `${acc}, ${curr}`;
              }, '')}
            </p>
          </Stack>
        </div>
      </Stack>
    </div>
  );
};

export default Work;
