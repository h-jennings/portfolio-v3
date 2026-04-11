import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '@/app/_components/prose-layout';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import { getAllNotes } from '@/app/_utils/content';
import {
  parseDateToLongDateString,
  parseDateToString,
} from '@/app/_utils/helpers/date.helpers';
import { css } from 'ds/css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const generateStaticParams = () => {
  return getAllNotes().map((note) => ({ note: note.slug }));
};

export const generateMetadata = async (props: {
  params: Promise<{ note: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const note = getAllNotes().find((n) => n.slug === params.note);

  if (!note) {
    return {};
  }

  const { date } = note;

  const fancyDate = parseDateToLongDateString(date);
  const headline = `Notes: ${parseDateToString(date)}`;

  const url = new URL(`${PATHS.base}${PATHS.notes}/${note.slug}`);
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

export default async function Note(props: {
  params: Promise<{ note: string }>;
}) {
  const params = await props.params;
  const note = getAllNotes().find((n) => n.slug === params.note);

  if (!note) {
    return notFound();
  }

  const { date } = note;
  const fancyDate = parseDateToString(date);
  const { default: Content } = (await import(
    `@/data/notes/${params.note}.mdx`
  )) as { default: () => React.ReactNode };

  return (
    <ProseLayout>
      <ProseLayoutHeader
        backTo={{
          hasLink: true,
          content: 'Back to notes',
          href: PATHS.notes,
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
