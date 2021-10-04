import { PATHS } from '@/constants/paths';
import { Project, projectMetaData } from '@/data/projects';
import { parseTagsToString } from '@/helpers/string-helpers';
import { styled } from '@/stitches.config';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import Link from 'next/link';
import React from 'react';
import useMeasure from 'react-use-measure';
import { Box } from './primitives/Box';
import { Flex } from './primitives/Flex';
import { LinkBox, LinkOverlay } from './primitives/LinkBox';
import { Stack } from './primitives/Stack';
import { StyledLink } from './primitives/StyledLink';
import { Text } from './primitives/Text';

const greyTextStyles = {
  color: '$text2',
  fontSize: '$1',
  '@bp2': {
    fontSize: '$2',
  },
};

const GreyText = styled(Text, {
  ...greyTextStyles,
});
const GreyLink = styled(StyledLink, {
  ...greyTextStyles,
});

const CenteredText = styled(GreyText, {
  position: 'absolute',
  top: '0',
  left: '50%',
});

interface TitleBarProps {
  projectCount: number;
}
function TitleBar({ projectCount }: TitleBarProps): JSX.Element {
  const [ref, bounds] = useMeasure();
  return (
    <Flex css={{ jc: 'space-between', position: 'relative' }}>
      <GreyText>SELECTED WORK</GreyText>
      <CenteredText ref={ref} css={{ marginLeft: `-${bounds.width / 2}px` }}>
        {projectCount ?? 'X'}&mdash;PROJECTS
      </CenteredText>
      <Link passHref href={PATHS.work}>
        <GreyLink>VIEW ALL</GreyLink>
      </Link>
    </Flex>
  );
}
interface CardProps {
  project: Project;
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
          <Text as='h2' css={{ fontSize: '$1', color: '$text3' }}>
            {tagsString}
          </Text>
          <Link passHref href={`${PATHS.work}/[project]`} as={path}>
            <LinkOverlay>
              <Text as='h1' css={{ lineHeight: '$body' }}>
                {`${project} — ${client}`}
              </Text>
            </LinkOverlay>
          </Link>
        </Stack>
        <Box css={{ maxWidth: '370px' }}>
          <Text
            as='p'
            css={{ color: '$text2', lineHeight: '$body', fontSize: '$1' }}>
            {description}
          </Text>
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
