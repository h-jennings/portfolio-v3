import { Stack } from '@/components/primitives/Stack';
import { text } from '@/components/primitives/Text';
import { projectPageData } from '@/constants/projects';
import { css } from '@/stitches.config';
import { ProjectIdentifiers } from '@/types/projects';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const pageHeader = css(text, {
  lineHeight: '$body',
  fontSize: 'clamp(1.75rem, 4vw - 0.2rem, 4rem);',
  '@bp2': {
    fontSize: '$4',
  },
});
const bodyText = css(text, {
  color: '$text2',
  lineHeight: '$body',
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
          <p className={detailsText({ size: '2' })}>{data?.details}</p>
        </Stack>
        <Stack direction='row' gap='2' css={{ ai: 'flex-start' }}>
          <Stack gap='2'>
            <h2 className={text({ size: '1', css: { color: '$text3' } })}>
              TECH
            </h2>
            <p className={infoText({ size: '2' })}>
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
            <p className={infoText({ size: '2' })}>
              {data?.contribution.reduce((acc, curr, idx) => {
                if (idx === 0) {
                  return `${curr}`;
                }
                return `${acc}, ${curr}`;
              }, '')}
            </p>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default Work;
