/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { styled } from '@/stitches.config';
import { BackToLink } from '@components/common/BackToLink';
import { Box } from '@components/common/Box';
import { Grid } from '@components/common/Grid';
import { LinkBox, LinkOverlay } from '@components/common/LinkBox';
import { Media } from '@components/common/Media';
import { ProjectCard } from '@components/common/ProjectCard';
import { Seo } from '@components/common/Seo';
import { Stack } from '@components/common/Stack';
import { H2, PageHeader, Paragraph } from '@components/common/Text';
import { PATHS } from '@utils/common/constants/paths.constants';
import { PROJECT_METADATA } from '@utils/work/constants/projects.constants';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';

const Work = () => {
  const projectEntries = Object.entries(PROJECT_METADATA);

  const featuredProject = projectEntries
    .filter(([, project]) => Boolean(project.featured))
    .map(([, project]) => project)[0];

  return (
    <>
      <Seo
        title='Work'
        description='A curated collection of my work throughout the years.'
        url={`${PATHS.base}${PATHS.work}`}
      />
      <Stack gap='xl'>
        <Box>
          <BackToLink href={PATHS.home}>Back to home</BackToLink>
          <PageHeader>Work</PageHeader>
        </Box>
        {featuredProject ? (
          <Stack gap='m'>
            <H2 size='2' leading='tight'>
              Featured
            </H2>
            <LinkBox>
              <Box
                css={{
                  px: '$s',
                  pt: '$s',
                  pb: '$m',
                  borderRadius: 15,
                  backgroundColor: '$slate3',
                }}
              >
                <Stack gap='m'>
                  <FeaturedMediaContainer>
                    <Media
                      type={featuredProject.featureImageWide.type}
                      url={featuredProject.featureImageWide.url}
                      width={460}
                      height={275}
                    />
                  </FeaturedMediaContainer>
                  <Box>
                    <NextLink
                      href={`${PATHS.work}/[project]`}
                      as={featuredProject.path}
                      passHref
                    >
                      <LinkOverlay>
                        <Paragraph size='1' css={{ d: 'inline-block' }}>
                          {featuredProject.project}
                        </Paragraph>
                      </LinkOverlay>
                    </NextLink>
                    <Paragraph size='1' color='2' css={{ pt: '$3xs' }}>
                      {featuredProject.description}
                    </Paragraph>
                  </Box>
                </Stack>
              </Box>
            </LinkBox>
          </Stack>
        ) : null}
        <Stack gap='m'>
          <H2 size='2' leading='tight'>
            All Work
          </H2>
          <Grid
            gap='s'
            gapY='m'
            css={{
              gtc: 'repeat(auto-fill, minmax(200px, 1fr))',
            }}
            as='ul'
          >
            {projectEntries.map(([key, project]) => {
              return (
                <li key={key}>
                  <ProjectCard project={project} />
                </li>
              );
            })}
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};

const FeaturedMediaContainer = styled('div', {
  borderRadius: '$card',
  isolation: 'isolate',
  overflow: 'hidden',
  height: '$full',
  backgroundColor: '$slate8',
});

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};

export default Work;
