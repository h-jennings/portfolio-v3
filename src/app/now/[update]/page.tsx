import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '@/app/_components/prose-layout';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import {
  parseDateToLongDateString,
  parseDateToString,
} from '@/app/_utils/helpers/date.helpers';
import { allUpdates } from 'contentlayer/generated';
import { css } from 'ds/css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UpdatePageMDX } from './update-page-mdx';

export const generateStaticParams = () => {
  return allUpdates.map((update) => ({ update: update.slug }));
};

interface UpdatePageProps {
  params: Promise<{ update: string }>;
}

export const generateMetadata = async ({
  params,
}: UpdatePageProps): Promise<Metadata> => {
  const updateParam = (await params).update;
  const update = allUpdates.find((update) => update.slug === updateParam);

  if (!update) {
    return {
      title: 'Not found',
      description: 'Update not found.',
    };
  }

  const { date } = update;

  const fancyDate = parseDateToLongDateString(date);
  const headline = `Now: ${parseDateToString(date)}`;

  const url = new URL(`${PATHS.base}${PATHS.now}/${update.slug}`);
  const title = headline;
  const description = `A snapshot of my life—${fancyDate}.`;

  return {
    title,
    description,
    openGraph: {
      url,
      type: 'article',
      authors: ['https://twitter.com/jennings_hunter'],
      locale: 'en_US',
      title,
      description,
      publishedTime: date,
    },
  };
};

export default async function Update({ params }: UpdatePageProps) {
  const updateParam = (await params).update;
  const update = allUpdates.find((update) => update.slug === updateParam);

  if (!update) {
    return notFound();
  }

  const { body, date } = update;
  const fancyDate = parseDateToString(date);
  return (
    <ProseLayout>
      <ProseLayoutHeader
        backTo={{
          hasLink: true,
          content: 'Back to now',
          href: PATHS.now,
        }}
      />

      <ProseLayoutContent>
        <UpdatePageMDX code={body.code} />
        <time
          dateTime={date}
          className={css({ textStyle: 'base', color: 'text2', fontSize: '1' })}
        >
          {fancyDate}
        </time>
      </ProseLayoutContent>
    </ProseLayout>
  );
}
