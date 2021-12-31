import { BackToLink } from '@/components/BackToLink';
import { Box } from '@/components/Box';
import { Stack } from '@/components/Stack';
import { Link, ListItem, PageHeader } from '@/components/Text';
import { PATHS } from '@/utils/constants/paths.constants';
import { getAllWritingsData } from '@/utils/helpers/mdx-data.helpers';
import { MdxData } from '@/utils/types/mdx-data';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import NextLink from 'next/link';

export const getStaticProps: GetStaticProps<{
  writingsData: MdxData[];
}> = () => {
  return {
    props: {
      writingsData: getAllWritingsData(),
    },
  };
};
const Writings = ({
  writingsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Stack>
        <Box>
          <BackToLink href={PATHS.home}>Back to home</BackToLink>
          <PageHeader>Writing</PageHeader>
        </Box>
        <ul>
          {Array.isArray(writingsData) && writingsData.length > 0
            ? writingsData?.map(({ fileName, metaData }) => {
                const { title } = metaData;
                return (
                  <ListItem key={fileName}>
                    <NextLink
                      href={`${PATHS.writing}/[slug]`}
                      as={`${PATHS.writing}/${fileName.replace(/\.mdx?$/, '')}`}
                      passHref
                    >
                      <Link>{title}</Link>
                    </NextLink>
                  </ListItem>
                );
              })
            : null}
        </ul>
      </Stack>
    </>
  );
};

export default Writings;
