import { stack } from '@/styles/primitives/stack.css';
import { text } from '@/styles/primitives/text.css';
import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '@components/common/ProseLayout';
import { MDX_ELEMENTS } from '@utils/common/constants/mdx-elements.contants';
import { PATHS } from '@utils/common/constants/paths.constants';
import { getNowPageData } from '@utils/common/helpers/mdx-data.helpers';
import { getMetaImage } from '@utils/common/helpers/meta-image.helpers';
import { MdxMetaData } from '@utils/common/types/mdx-data';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo, NextSeoProps } from 'next-seo';

export const getStaticProps: GetStaticProps<{
  source: MDXRemoteSerializeResult<MdxMetaData>;
}> = async () => {
  const { content, metaData } = getNowPageData();
  //@ts-expect-error
  const mdxSource: MDXRemoteSerializeResult<MdxMetaData> = await serialize(
    content,
    {
      scope: metaData,
    },
  );

  return {
    props: {
      source: mdxSource,
    },
  };
};
const Now = ({ source }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = `Now`;
  const url = `${PATHS.base}${PATHS.now}`;
  const description = source.scope?.description;
  const image = source.scope?.image;
  const SEO: NextSeoProps = {
    title,
    canonical: url,
    description,
    openGraph: {
      title,
      url,
      article: {
        publishedTime: source.scope?.publishDate,
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
          headline={source.scope?.title}
          description={source.scope?.description}
        >
          <div className={stack({ gap: '3xs' })}>
            <span className={text({ size: 1, color: 2 })}>Last Updated</span>
            <span className={text({ size: 1 })}>
              {source.scope?.publishDate}
            </span>
          </div>
        </ProseLayoutHeader>
        <ProseLayoutContent>
          <MDXRemote
            {...source}
            scope={source.scope}
            components={MDX_ELEMENTS}
          />
        </ProseLayoutContent>
      </ProseLayout>
    </>
  );
};

export default Now;
