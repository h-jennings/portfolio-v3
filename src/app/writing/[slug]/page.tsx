import { GiscusComments } from '@/app/_components/giscus-comments';
import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '@/app/_components/prose-layout';
import { Separator } from '@/app/_components/separator';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import { parseDateToString } from '@/app/_utils/helpers/date.helpers';
import { allWritings } from 'contentlayer/generated';
import { css } from 'ds/css';
import { hstack, stack } from 'ds/patterns';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SlugPageMDX } from './slug-page-mdx';

export const generateStaticParams = () => {
  return allWritings.map((writing) => ({ slug: writing.slug }));
};

interface WritingPageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: WritingPageProps): Promise<Metadata> => {
  const slugParam = (await params).slug;
  const writing = allWritings.find((writing) => writing.slug === slugParam);

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

export default async function Writing({ params }: WritingPageProps) {
  const slugParam = (await params).slug;
  const writing = allWritings.find((writing) => writing.slug === slugParam);

  if (!writing) {
    return notFound();
  }

  const { title, description, date, body, readingTime } = writing;

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
        <SlugPageMDX code={body.code} />
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
