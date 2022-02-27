import { styled } from '@/stitches.config';
import { Box } from '@components/common/Box';
import { LinkBox, LinkOverlay } from '@components/common/LinkBox';
import {
  ScrollContainerArea,
  ScrollContainerScrollbar,
  ScrollContainerThumb,
  ScrollContainerViewport,
} from '@components/common/ScrollContainer';
import { Stack } from '@components/common/Stack';
import { H3, Paragraph } from '@components/common/Text';
import { PATHS } from '@utils/common/constants/paths.constants';
import { parseTagsToString } from '@utils/common/helpers/string.helpers';
import {
  ProjectMeta,
  PROJECT_METADATA,
} from '@utils/work/constants/projects.constants';
import Image from 'next/image';
import NextLink from 'next/link';
import * as React from 'react';

export const ProjectGrid = (): JSX.Element => {
  const projectEntries = Object.entries(PROJECT_METADATA);
  return (
    <ScrollContainerArea>
      <ScrollContainerScrollbar orientation='horizontal'>
        <ScrollContainerThumb />
      </ScrollContainerScrollbar>
      <ScrollContainerViewport>
        <Stack gap='s' css={{ mb: '$l' }} direction='row'>
          {projectEntries.map(([, project], idx) => (
            <Card key={idx} project={project} />
          ))}
        </Stack>
      </ScrollContainerViewport>
    </ScrollContainerArea>
  );
};

interface CardProps {
  project: ProjectMeta;
}
const Card = ({
  project: { tags, project, path, images },
}: CardProps): JSX.Element => {
  const tagsString = parseTagsToString(tags);
  const [, image] = images;

  return (
    <Box
      css={{
        minWidth: '90%',
        '@bp1': {
          minWidth: '45%',
        },
        '@bp2': {
          minWidth: 220,
        },
      }}
    >
      <LinkBox>
        <Stack gap='s'>
          <ProjectImageContainer>
            <Image
              src={image}
              priority
              alt=''
              layout='responsive'
              blurDataURL={image}
              placeholder='blur'
              width={220}
              height={275}
              quality={95}
            />
          </ProjectImageContainer>
          <Box css={{ px: '$3xs' }}>
            <NextLink passHref href={`${PATHS.work}/[project]`} as={path}>
              <LinkOverlay
                data-testid={path}
                style={{ display: 'inline-block' }}
              >
                <H3 leading='tight' size='1' css={{ pb: '$3xs' }}>
                  {project}
                </H3>
              </LinkOverlay>
            </NextLink>
            <Paragraph color='2' size='1'>
              {tagsString}
            </Paragraph>
          </Box>
        </Stack>
      </LinkBox>
    </Box>
  );
};

const ProjectImageContainer = styled('div', {
  overflow: 'hidden',
  borderRadius: '15px',
  backgroundColor: '$slate8',
});
