import { BackToLink } from '@/components/BackToLink';
import { Box } from '@/components/Box';
import { Flex } from '@/components/Flex';
import { LinkBox, LinkOverlay } from '@/components/LinkBox';
import { Stack } from '@/components/Stack';
import { H2, H3, PageHeader, Paragraph } from '@/components/Text';
import { styled } from '@/stitches.config';
import { PATHS } from '@/utils/constants/paths.constants';
import {
  groupDatesByYear,
  sortMdxDataByDateDesc,
} from '@/utils/helpers/date.helpers';
import { getAllWritingsData } from '@/utils/helpers/mdx-data.helpers';
import { MdxData } from '@/utils/types/mdx-data';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import NextLink from 'next/link';
import * as React from 'react';

// TODO: Add SEO
const Writings = ({
  writingsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const featured = writingsData.filter((data) =>
    Boolean(data.metaData?.featured),
  );
  const hasWritings = writingsData.length > 0;
  const hasFeaturedWritings = featured.length > 0;
  const groupedWritings = groupDatesByYear(writingsData);

  return (
    <>
      <Stack gap='xl'>
        <Box>
          <BackToLink href={PATHS.home}>Back to home</BackToLink>
          <PageHeader>Writing</PageHeader>
        </Box>
        {hasFeaturedWritings ? (
          <Stack gap='m'>
            <H2 size='2' leading='tight'>
              Featured
            </H2>
            <Stack as='ul' gap='s'>
              {featured.map(({ fileName, metaData }) => {
                const slug = fileName.replace(/\.mdx?$/, '');

                return (
                  <li key={slug}>
                    <LinkBox>
                      <Box
                        css={{
                          p: '$s',
                          borderRadius: '5px',
                          backgroundColor: '$slate3',
                        }}
                      >
                        <NextLink
                          href={`${PATHS.writing}/[slug]`}
                          as={`${PATHS.writing}/${slug}`}
                          passHref
                        >
                          <LinkOverlay>
                            <Paragraph size='1' css={{ d: 'inline-block' }}>
                              {metaData.title}
                            </Paragraph>
                          </LinkOverlay>
                        </NextLink>
                        <Paragraph size='1' color='2' css={{ pt: '$3xs' }}>
                          {metaData.description}
                        </Paragraph>
                      </Box>
                    </LinkBox>
                  </li>
                );
              })}
            </Stack>
          </Stack>
        ) : null}
        {hasWritings ? (
          <Stack gap='m'>
            <H2 size='2' leading='tight'>
              All Writing
            </H2>
            <Stack gap='m' as='ul'>
              {groupedWritings.map(({ year, writings }) => {
                return (
                  <Box css={{ position: 'relative' }} as='li' key={year}>
                    <YearTitle
                      size='1'
                      color='2'
                      css={{
                        position: 'static',
                        transform: 'translateX(0%)',
                        mb: '$xs',
                        '@media (width >= 924px)': {
                          position: 'absolute',
                          transform: 'translateX(-100%)',
                        },
                      }}
                    >
                      {year}
                    </YearTitle>
                    <Stack gap='xs' as='ul'>
                      {writings.map(({ fileName, metaData }) => {
                        const slug = fileName.replace(/\.mdx?$/, '');

                        return (
                          <li key={slug}>
                            <LinkBox>
                              <Flex
                                direction='row'
                                align='baseline'
                                justify='between'
                                gap='s'
                              >
                                <NextLink
                                  href={`${PATHS.writing}/[slug]`}
                                  as={`${PATHS.writing}/${slug}`}
                                  passHref
                                >
                                  <LinkOverlay>
                                    <Paragraph size='1'>
                                      {metaData.title}
                                    </Paragraph>
                                  </LinkOverlay>
                                </NextLink>
                                <Paragraph size='1' color='2'>
                                  {metaData?.publishDate}
                                </Paragraph>
                              </Flex>
                            </LinkBox>
                          </li>
                        );
                      })}
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        ) : null}
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  writingsData: MdxData[];
}> = () => {
  const writingsData = sortMdxDataByDateDesc(getAllWritingsData()).filter(
    (data) => data?.metaData.status === 'published',
  );
  return {
    props: {
      writingsData,
    },
  };
};

const YearTitle = styled(H3, {
  top: 0,
  left: 'calc($l * -1)',
});

export default Writings;
