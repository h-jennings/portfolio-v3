import { cmsFetcher } from '@/graphql/client';
import {
  GetWritingSlugs,
  GetWritingSlugsQuery,
  GetWritingSlugsQueryVariables,
} from '@/graphql/generated/types.generated';
import {
  prefetchWriting,
  useGetWritingQuery,
} from '@/graphql/queries/get-writing';
import { stack } from '@/styles/primitives/stack.css';
import { text } from '@/styles/primitives/text.css';
import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '@components/common/ProseLayout';
import { RichText } from '@components/common/RichText/RichText';
import { RichTextContent } from '@graphcms/rich-text-types';
import { dehydrate } from '@tanstack/react-query';
import { PATHS } from '@utils/common/constants/paths.constants';
import { getMetaImage } from '@utils/common/helpers/meta-image.helpers';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';
import readingTime from 'reading-time';

const Writing = ({
  slug,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useGetWritingQuery(preview, { slug });

  const { writing } = data ?? {};
  const { seo } = writing ?? {};

  const title = seo?.title;
  const url = `${PATHS.base}${PATHS.writing}/${slug}`;
  const image = seo?.image?.url;
  const SEO: NextSeoProps = {
    title,
    canonical: url,
    description: seo?.description ?? undefined,
    openGraph: {
      title,
      url,
      description: seo?.description ?? undefined,
      ...getMetaImage(image),
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <ProseLayout>
        <ProseLayoutHeader
          backTo={{
            hasLink: true,
            content: 'Back to writing',
            href: PATHS.writing,
          }}
          headline={writing?.title}
          description={writing?.seo.description}
        >
          <div
            className={stack({
              justify: 'left',
              gap: 'xl',
              orientation: 'horizontal',
            })}
          >
            <div className={stack({ gap: '3xs' })}>
              <span className={text({ size: 1, color: 2 })}>Published</span>
              <span className={text({ size: 1 })}>
                {writing?.datePublished}
              </span>
            </div>
            {writing?.content.text ? (
              <div className={stack({ gap: '3xs' })}>
                <span className={text({ size: 1, color: 2 })}>
                  Reading Time
                </span>
                <span className={text({ size: 1 })}>
                  {readingTime(writing.content.text).text}
                </span>
              </div>
            ) : null}
          </div>
        </ProseLayoutHeader>
        <ProseLayoutContent>
          <RichText
            references={writing?.content.references}
            content={writing?.content.json as RichTextContent}
          />
        </ProseLayoutContent>
      </ProseLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const data = await cmsFetcher<
    GetWritingSlugsQuery,
    GetWritingSlugsQueryVariables
  >(false, GetWritingSlugs)();

  const paths = data.writings.map((p) => {
    const { slug } = p;
    return {
      params: { slug },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{
  slug: string;
  preview: boolean;
}> = async ({ params, preview = false }) => {
  const { slug } = params!;
  const { queryClient, initialData } = await prefetchWriting(preview, {
    slug: slug as string,
  });

  if (!initialData?.writing) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      slug: slug as string,
      preview,
    },
  };
};

export default Writing;
