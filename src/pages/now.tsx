import { BackToLink } from '@common/components/BackToLink';
import { Box } from '@common/components/Box';
import { Stack } from '@common/components/Stack';
import { PageHeader, Text } from '@common/components/Text';
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
      <Stack gap='xl'>
        <Box>
          <BackToLink href={PATHS.home}>Back to home</BackToLink>
          <PageHeader>{source?.scope?.title}</PageHeader>
        </Box>
        <MDXRemote
          {...source}
          scope={source?.scope}
          components={MDX_ELEMENTS}
        />
        <Text size='1' color='2' leading='tight'>
          last updated:{' '}
          <Text size='1' color='2' leading='tight' as='time'>
            {source?.scope?.publishDate}
          </Text>{' '}
        </Text>
      </Stack>
    </>
  );
};

export default Now;
