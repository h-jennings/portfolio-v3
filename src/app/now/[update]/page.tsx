import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '@/app/_components/prose-layout';
import { MDX_ELEMENTS } from '@/app/_utils/constants/mdx.constants';
import { PATHS } from '@utils/common/constants/paths.constants';
import {
  parseDateToLongDateString,
  parseDateToString,
} from '@utils/common/helpers/date.helpers';
import { allUpdates } from 'contentlayer/generated';
import { css } from 'ds/css';
import { Metadata } from 'next';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';

export const generateStaticParams = () => {
  return allUpdates.map((update) => ({ update: update.slug }));
};

export const generateMetadata = ({
  params,
}: {
  params: { update: string };
}): Metadata => {
  const update = allUpdates.find((update) => update.slug === params.update);

  const { date } = update!;

  const fancyDate = parseDateToLongDateString(date);
  const headline = `Now: ${parseDateToString(date)}`;

  const url = new URL(`${PATHS.base}${PATHS.now}/${update!.slug}`);
  const title = headline;
  const description = `A snapshot of my life—${fancyDate}.`;

  return {
    title,
    description,
    metadataBase: url,
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

export default function Update({ params }: { params: { update: string } }) {
  const update = allUpdates.find((update) => update.slug === params.update);

  if (!update) {
    return notFound();
  }

  const { body, date } = update;
  const MDXContent = getMDXComponent(body.code);
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
        <MDXContent components={MDX_ELEMENTS} />
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
