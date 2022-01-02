import { BackToLink } from '@/components/BackToLink';
import { Box } from '@/components/Box';
import { Flex } from '@/components/Flex';
import { Stack } from '@/components/Stack';
import { PageHeader, Text } from '@/components/Text';
import { MDX_ELEMENTS } from '@/utils/constants/mdx-elements.contants';
import { writingsFilePaths } from '@/utils/constants/mdx.constants';
import { PATHS } from '@/utils/constants/paths.constants';
import { getWritingDataFromSlug } from '@/utils/helpers/mdx-data.helpers';
import { MdxMetaData } from '@/utils/types/mdx-data';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';

// TODO: Add SEO
const Writing = ({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { scope } = source;

  return (
    <>
      {/* <NextSeo {...SEO} /> */}
      <Stack gap='xl'>
        <Box>
          <BackToLink href={PATHS.writing}>Back to writing</BackToLink>
          <Stack gap='xs'>
            <PageHeader>{scope?.title}</PageHeader>
            <Flex
              direction={{ '@initial': 'column', '@bp2': 'row' }}
              gap='3xs'
              justify='start'
              align='baseline'
            >
              <Text color='2' size='1' leading='tight'>
                {scope?.publishDate} &middot; {scope?.readingTimeResults?.text}
              </Text>
            </Flex>
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
}> = async ({ params }) => {
  const { content, metaData } = getWritingDataFromSlug(params?.slug as string);
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

export default Writing;
