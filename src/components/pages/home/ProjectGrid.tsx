import { styled } from '@/stitches.config';
import { Box } from '@components/Box';
import { Flex } from '@components/Flex';
import { LinkBox, LinkOverlay } from '@components/LinkBox';
import { Stack } from '@components/Stack';
import { H1, Link, Paragraph, Text } from '@components/Text';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { PATHS } from '@utils/constants/paths.constants';
import {
  ProjectMeta,
  PROJECT_METADATA,
} from '@utils/constants/projects.constants';
import { parseTagsToString } from '@utils/helpers/string.helpers';
import NextLink from 'next/link';
import React from 'react';
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

const SCROLLBAR_SIZE = 10;

const StyledScrollArea = styled(ScrollAreaPrimitive.Root, {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

const StyledViewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  background: '$uiBg',
  transition: 'background 160ms ease-out',
  '&:hover': { background: '$slate4' },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
});

const StyledThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: '$surface2',
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
});
export function ProjectGrid(): JSX.Element {
  const projectEntries = Object.entries(PROJECT_METADATA);
  return (
    <StyledScrollArea>
      <StyledScrollbar orientation='horizontal'>
        <StyledThumb />
      </StyledScrollbar>
      <StyledViewport>
        <Stack gap='s' css={{ mb: '$l' }} direction='row'>
          {projectEntries.map(([, project], idx) => (
            <Card key={idx} project={project} />
          ))}
        </Stack>
      </StyledViewport>
    </StyledScrollArea>
  );
}
