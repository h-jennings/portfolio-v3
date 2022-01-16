import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '@common/components/ProseLayout';
import { Stack } from '@common/components/Stack';
import { Text } from '@common/components/Text';
import { MDX_ELEMENTS } from '@common/utils/constants/mdx-elements.contants';
import { PATHS } from '@common/utils/constants/paths.constants';
import { getNowPageData } from '@common/utils/helpers/mdx-data.helpers';
import { getMetaImage } from '@common/utils/helpers/meta-image.helpers';
import { MdxMetaData } from '@common/utils/types/mdx-data';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo, NextSeoProps } from 'next-seo';
import * as React from 'react';

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
  const title = `Now | Hunter Jennings`;
  const url = `${PATHS.base}${PATHS.now}`;
  const description = source.scope?.description;
  const image = source?.scope?.image;
  const SEO: NextSeoProps = {
    title,
    canonical: url,
    description,
    openGraph: {
      title,
      url,
      article: {
        publishedTime: source?.scope?.publishDate,
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
          headline={source?.scope?.title}
          description={source.scope?.description}
        >
          <Stack gap='3xs'>
            <Text size='1' color='2'>
              Last Updated
            </Text>
            <Text size='1'>{source?.scope?.publishDate}</Text>
          </Stack>
        </ProseLayoutHeader>
        <ProseLayoutContent>
          <MDXRemote
            {...source}
            scope={source?.scope}
            components={MDX_ELEMENTS}
          />
        </ProseLayoutContent>
      </ProseLayout>
    </>
  );
};

export default Now;
