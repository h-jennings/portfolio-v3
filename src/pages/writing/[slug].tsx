import { BackToLink } from '@common/components/BackToLink';
import { Box } from '@common/components/Box';
import { Stack } from '@common/components/Stack';
import { PageHeader, Paragraph, Text } from '@common/components/Text';
import { MDX_ELEMENTS } from '@common/utils/constants/mdx-elements.contants';
import { writingsFilePaths } from '@common/utils/constants/mdx.constants';
import { PATHS } from '@common/utils/constants/paths.constants';
import { getWritingDataFromSlug } from '@common/utils/helpers/mdx-data.helpers';
import { getMetaImage } from '@common/utils/helpers/meta-image.helpers';
import { MdxMetaData } from '@common/utils/types/mdx-data';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo, NextSeoProps } from 'next-seo';
import Image from 'next/image';

const Writing = ({
  source,
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { scope } = source;
  const title = `${scope?.title} | Hunter Jennings`;
  const url = `${PATHS.base}${PATHS.writing}/${slug}`;
  const image = source?.scope?.image;
  const isDraft = scope?.status === 'draft';
  const SEO: NextSeoProps = {
    title,
    canonical: url,
    description: scope?.description,
    openGraph: {
      title,
      url,
      description: scope?.description,
      ...getMetaImage(image),
    },
  };

  return (
    <>
      <NextSeo noindex={isDraft} nofollow={isDraft} {...SEO} />
      <Stack as='article' gap='xl'>
        <Box
          css={{
            borderBottom: '1px dashed $slate8',
            pb: '$xl',
          }}
        >
          <BackToLink href={PATHS.writing}>Back to writing</BackToLink>
          <Stack gap='m'>
            <PageHeader>{scope?.title}</PageHeader>
            <Paragraph size='1' leading='body'>
              {scope?.description}
            </Paragraph>
            <Stack gap='xl' direction='row'>
              <Stack gap='3xs'>
                <Text size='1' color='2'>
                  Published
                </Text>
                <Text size='1'>{scope?.publishDate}</Text>
              </Stack>
              <Stack gap='3xs'>
                <Text size='1' color='2'>
                  Reading Time
                </Text>
                <Text size='1'>{scope?.readingTimeResults?.text}</Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <div>
          <MDXRemote
            {...source}
            scope={scope}
            components={{ Image, Box, ...MDX_ELEMENTS }}
          />
        </div>
      </Stack>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = () => {
  const paths = writingsFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  source: MDXRemoteSerializeResult<MdxMetaData>;
  slug: string | string[] | undefined;
}> = async ({ params }) => {
  const { slug } = params!;
  const { content, metaData } = getWritingDataFromSlug(slug as string);
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
      slug: slug as string,
    },
  };
};

export default Writing;
