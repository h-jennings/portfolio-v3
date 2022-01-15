import { Box } from '@common/components/Box';
import { LinkBox, LinkOverlay } from '@common/components/LinkBox';
import {
  ScrollContainerArea,
  ScrollContainerScrollbar,
  ScrollContainerThumb,
  ScrollContainerViewport,
} from '@common/components/ScrollContainer';
import { Stack } from '@common/components/Stack';
import { H3, Paragraph } from '@common/components/Text';
import { PATHS } from '@common/utils/constants/paths.constants';
import { parseTagsToString } from '@common/utils/helpers/string.helpers';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import {
  ProjectMeta,
  PROJECT_METADATA,
} from '@work/utils/constants/projects.constants';
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
const Card = ({ project: { tags, project, path } }: CardProps): JSX.Element => {
  const tagsString = parseTagsToString(tags);

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
          <Box>
            <AspectRatioPrimitive.Root ratio={4 / 5}>
              <Box
                css={{
                  height: '100%',
                  backgroundColor: '$slate7',
                  borderRadius: 15,
                }}
              />
            </AspectRatioPrimitive.Root>
          </Box>
          <Box css={{ px: '$3xs' }}>
            <NextLink passHref href={`${PATHS.work}/[project]`} as={path}>
              <LinkOverlay style={{ display: 'inline-block' }}>
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
