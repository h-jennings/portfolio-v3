import { link } from '@/components/primitives/link';
import { Stack } from '@/components/primitives/Stack';
import { ProjectGrid } from '@/components/ProjectGrid';
import { css, styled } from '@/stitches.config';
import { text } from '@components/primitives/Text';
import type { NextPage } from 'next';
import NextLink from 'next/link';

const Intro = styled(Stack, {
  maxWidth: '640px',
});

const pageHeader = css(text, {
  fontSize: 'clamp(1.5rem, 4vw - 0.2rem, 1.75rem);',
  lineHeight: '$body',
  '@bp2': {
    fontSize: '$3',
  },
});
const paragraph = css(text, {
  maxWidth: '520px',
  color: '$text2',
  lineHeight: '$body',
  fontSize: '$1',
  '@bp2': {
    fontSize: '$2',
  },
});
const readMoreLink = css(link, {
  fontSize: '$1',
  color: '$text3',
  '@bp2': {
    fontSize: '$2',
  },
});

const Index: NextPage = () => {
  return (
    <Stack gap={{ '@initial': '7', '@bp2': '9' }}>
      <Intro gap={{ '@initial': '2', '@bp2': '3' }}>
        <h1 className={pageHeader()}>
          Hunter Jennings is a frontend ui engineer interested in design systems
          and component architecture.
        </h1>
        <Stack gap='1'>
          <p className={paragraph()}>
            If you&apos;re a remote-friendly product company that wants to scale
            your ui with elegant, modern, web-based tools&mdash;I can&apos;t
            wait to meet you.
          </p>
          <div>
            <NextLink passHref href='/about'>
              <a className={readMoreLink()}>Read More</a>
            </NextLink>
          </div>
        </Stack>
      </Intro>
      <ProjectGrid />
    </Stack>
  );
};

export default Index;
