import { WorkList } from '@components/pages/work/WorkList';
import { Stack } from '@components/Stack';
import { H2, PageHeader } from '@components/Text';
import { PATHS } from '@utils/constants/paths.constants';
import { NextPage } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

const title = 'Work | Hunter Jennings';
const description = 'Work that Hunter has been involved in over the years.';
const url = `${PATHS.base}${PATHS.work}`;
const SEO: NextSeoProps = {
  title,
  description,
  canonical: url,
  openGraph: {
    title,
    description,
    url,
  },
};

const Work: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO} />
      <Stack gap={{ '@initial': '4', '@bp2': '6' }}>
        <Stack gap={{ '@initial': '2', '@bp2': '3' }}>
          <PageHeader>Selected Work</PageHeader>
          <H2 size={{ '@initial': '1', '@bp2': '2' }}>3&mdash;PROJECTS</H2>
        </Stack>
        <WorkList />
      </Stack>
    </>
  );
};

export default Work;
