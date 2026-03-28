import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '@/app/_components/prose-layout';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import { getAllUpdates } from '@/app/_utils/content';
import {
  parseDateToLongDateString,
  parseDateToString,
} from '@/app/_utils/helpers/date.helpers';
import { css } from 'ds/css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { JSX } from 'react';

export const generateStaticParams = () => {
  return getAllUpdates().map((update) => ({ update: update.slug }));
};

export const generateMetadata = async (props: {
  params: Promise<{ update: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const update = getAllUpdates().find((u) => u.slug === params.update);

  if (!update) {
    return {};
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

export default async function Update(props: {
  params: Promise<{ update: string }>;
}) {
  const params = await props.params;
  const update = getAllUpdates().find((u) => u.slug === params.update);

  if (!update) {
    return notFound();
  }

  const { date } = update;
  const fancyDate = parseDateToString(date);
  const { default: Content } = (await import(
    `@/data/updates/${params.update}.mdx`
  )) as { default: () => JSX.Element };

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
        <Content />
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
