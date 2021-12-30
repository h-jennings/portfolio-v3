import {
  ScrollContainerArea,
  ScrollContainerScrollbar,
  ScrollContainerThumb,
  ScrollContainerViewport,
} from '@/components/layout/ScrollContainer';
import { styled } from '@/stitches.config';
import { Box } from '@components/Box';
import { Flex } from '@components/Flex';
import { LinkBox, LinkOverlay } from '@components/LinkBox';
import { Stack } from '@components/Stack';
import { H1, Link, Paragraph, Text } from '@components/Text';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { PATHS } from '@utils/constants/paths.constants';
import {
  ProjectMeta,
  PROJECT_METADATA,
} from '@utils/constants/projects.constants';
import { parseTagsToString } from '@utils/helpers/string.helpers';
import NextLink from 'next/link';
import * as React from 'react';
import useMeasure from 'react-use-measure';

const CenteredText = styled(Text, {
  position: 'absolute',
  top: '0',
  left: '50%',
  d: 'none',
  '@bp1': {
    d: 'block',
  },
});

interface TitleBarProps {
  projectCount: number;
}
function TitleBar({ projectCount }: TitleBarProps): JSX.Element {
  const [ref, bounds] = useMeasure();
  return (
    <Flex css={{ jc: 'space-between', position: 'relative' }}>
      <Text color='2' size={{ '@initial': '1', '@bp2': '2' }}>
        SELECTED WORK
      </Text>
      <CenteredText
        color='2'
        size={{ '@initial': '1', '@bp2': '2' }}
        ref={ref}
        style={{ marginLeft: `-${bounds.width / 2}px` }}
      >
        {projectCount ?? 'X'}&mdash;PROJECTS
      </CenteredText>
      <NextLink passHref href={PATHS.work}>
        <Link color='2' size={{ '@initial': '1', '@bp2': '2' }}>
          VIEW ALL
        </Link>
      </NextLink>
    </Flex>
  );
}
interface CardProps {
  project: ProjectMeta;
}
function Card({ project: { tags, project, path } }: CardProps): JSX.Element {
  const tagsString: string = React.useMemo(() => {
    return parseTagsToString(tags);
  }, [tags]);

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
                <H1 leading='tight' size='1' css={{ pb: '$3xs' }}>
                  {project}
                </H1>
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
}

export function ProjectGrid(): JSX.Element {
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
}
