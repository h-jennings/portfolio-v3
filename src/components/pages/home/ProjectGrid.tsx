import { PATHS } from '@/constants/paths';
import { ProjectMeta, projectMetaData } from '@/constants/projects';
import { parseTagsToString } from '@/helpers/string-helpers';
import { styled } from '@/stitches.config';
import { Box } from '@components/primitives/Box';
import { Flex } from '@components/primitives/Flex';
import { Link } from '@components/primitives/link';
import { LinkBox, LinkOverlay } from '@components/primitives/LinkBox';
import { Stack } from '@components/primitives/Stack';
import { BodyText, H1, H2, Text } from '@components/primitives/text';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
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
function Card({
  project: { description, tags, project, client, path },
}: CardProps): JSX.Element {
  const tagsString: string = React.useMemo(() => {
    return parseTagsToString(tags);
  }, [tags]);

  return (
    <LinkBox>
      <Box css={{ pb: '$2' }}>
        <AspectRatioPrimitive.Root ratio={16 / 9}>
          <Box css={{ height: '100%', backgroundColor: '$slate7' }}></Box>
        </AspectRatioPrimitive.Root>
      </Box>
      <Stack gap='2'>
        <Stack gap='1'>
          <H2 size='1' color='3'>
            {tagsString}
          </H2>
          <NextLink passHref href={`${PATHS.work}/[project]`} as={path}>
            <LinkOverlay>
              <H1 leading='body'>{`${project} — ${client}`}</H1>
            </LinkOverlay>
          </NextLink>
        </Stack>
        <Box style={{ maxWidth: '370px' }}>
          <BodyText css={{ fontSize: '$1' }}>{description}</BodyText>
        </Box>
      </Stack>
    </LinkBox>
  );
}

const Grid = styled('div', {
  d: 'grid',
  gtc: '1fr',
  columnGap: '$2',
  rowGap: '$5',
  '@bp2': {
    gtc: 'repeat(2, 1fr)',
  },
});

export function ProjectGrid(): JSX.Element {
  const projectEntries = Object.entries(projectMetaData);
  return (
    <Stack gap={{ '@initial': '3', '@bp2': '5' }}>
      <TitleBar projectCount={projectEntries.length} />
      <Grid>
        {projectEntries.map(([, project], idx) => (
          <Card key={idx} project={project} />
        ))}
      </Grid>
    </Stack>
  );
}
