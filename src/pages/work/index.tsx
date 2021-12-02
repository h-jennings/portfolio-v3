import { WorkList } from '@/components/pages/work/WorkList';
import { Stack } from '@/components/primitives/Stack';
import { PageHeader, text } from '@/components/primitives/text';
import { PATHS } from '@/constants/paths';
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
          <h2 className={text({ size: { '@initial': '1', '@bp2': '2' } })}>
            3&mdash;PROJECTS
          </h2>
        </Stack>
        <WorkList />
      </Stack>
    </>
  );
};

export default Work;
