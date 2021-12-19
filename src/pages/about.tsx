import { Box } from '@components/Box';
import { SplitGrid } from '@components/layout/SplitGrid';
import { Stack } from '@components/Stack';
import { BodyText, PageHeader } from '@components/Text';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { PATHS } from '@utils/constants/paths.constants';
import { NextPage } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

const url = `${PATHS.base}${PATHS.about}`;
const title = 'About | Hunter Jennings';
const SEO: NextSeoProps = {
  title,
  canonical: url,
  openGraph: {
    title,
    url,
  },
};

const About: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO} />
      <SplitGrid>
        <Stack gap='4'>
          <PageHeader>About</PageHeader>
          <Stack style={{ maxWidth: 390 }} gap='2'>
            <BodyText>
              I&apos;ve been wrangling pixels and shapes since &apos;17. I
              create beautiful user interfaces with cutting-edge web
              technologies. My primary areas of focus are component
              architecture, design systems, and application state management.
              Over the years, I&apos;ve worked cross-functionally with high
              caliber design teams on complex problems.
            </BodyText>
            <BodyText>
              I&apos;m a life long learner who can&apos;t wait to start the next
              project.
            </BodyText>
          </Stack>
        </Stack>
        <Box>
          <Box style={{ maxWidth: 511 }}>
            <AspectRatioPrimitive.Root ratio={1}>
              <Box
                css={{
                  height: '$full',
                  backgroundColor: '$slate8',
                }}
              ></Box>
            </AspectRatioPrimitive.Root>
          </Box>
        </Box>
      </SplitGrid>
    </>
  );
};

export default About;
