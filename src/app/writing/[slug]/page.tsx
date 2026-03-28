import { GiscusComments } from '@/app/_components/giscus-comments';
import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '@/app/_components/prose-layout';
import { Separator } from '@/app/_components/separator';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import { getAllWritings } from '@/app/_utils/content';
import { parseDateToString } from '@/app/_utils/helpers/date.helpers';
import { css } from 'ds/css';
import { hstack, stack } from 'ds/patterns';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const generateStaticParams = () => {
  return getAllWritings().map((writing) => ({ slug: writing.slug }));
};

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const writing = getAllWritings().find((w) => w.slug === params.slug);

  if (!writing) {
    return {};
  }

  const { title, description, date } = writing;

  const url = new URL(`${PATHS.base}${PATHS.writing}/${writing.slug}`);

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

export default async function Writing(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const writing = getAllWritings().find((w) => w.slug === params.slug);

  if (!writing) {
    return notFound();
  }

  const { title, description, date, readingTime } = writing;
  const { default: Content } = (await import(
    `@/data/writings/${params.slug}.mdx`
  )) as { default: () => React.ReactNode };

  return (
    <ProseLayout>
      <ProseLayoutHeader
        backTo={{
          hasLink: true,
          content: 'Back to writing',
          href: PATHS.writing,
        }}
        headline={title}
        description={description}
      >
        <div
          className={hstack({
            gap: 'xl',
          })}
        >
          <div className={stack({ gap: '3xs' })}>
            <span className={css({ fontSize: '1', color: 'text2' })}>
              Published
            </span>
            <span className={css({ fontSize: '1' })}>
              {parseDateToString(date)}
            </span>
          </div>
          <div className={stack({ gap: '3xs' })}>
            <span className={css({ fontSize: '1', color: 'text2' })}>
              Reading Time
            </span>
            <span className={css({ fontSize: '1' })}>{readingTime}</span>
          </div>
        </div>
      </ProseLayoutHeader>
      <ProseLayoutContent>
        <Content />
        <div>
          <Separator />
          <div>
            <GiscusComments />
          </div>
        </div>
      </ProseLayoutContent>
    </ProseLayout>
  );
}
