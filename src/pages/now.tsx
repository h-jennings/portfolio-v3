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
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

const NOW_SLUG = 'now';

const Now = ({ preview }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useGetWritingQuery(preview, { slug: NOW_SLUG });
  const { writing } = data ?? {};
  const { seo } = writing ?? {};

  const url = `${PATHS.base}${writing?.slug}`;
  const description = seo?.description ?? undefined;
  const image = seo?.image?.url;
  const SEO: NextSeoProps = {
    title: seo?.title,
    canonical: url,
    description,
    openGraph: {
      title: seo?.title,
      url,
      article: {
        publishedTime: writing?.datePublished as string,
      },
      description,
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
            content: 'Back to home',
            href: PATHS.home,
          }}
          headline={writing?.title}
          description={seo?.description}
        >
          <div className={stack({ gap: '3xs' })}>
            <span className={text({ size: 1, color: 2 })}>Last Updated</span>
            <span className={text({ size: 1 })}>{writing?.datePublished}</span>
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

export const getStaticProps: GetStaticProps<{
  preview: boolean;
}> = async ({ preview = false }) => {
  const { queryClient, initialData } = await prefetchWriting(preview, {
    slug: NOW_SLUG,
  });

  if (!initialData?.writing) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      preview,
    },
  };
};

export default Now;
