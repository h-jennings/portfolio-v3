import { PATHS } from '@/constants/paths';
import { HomepageProject, homepageProjects } from '@/data/homepage-projects';
import { parseTagsToString } from '@/helpers/string-helpers';
import { styled } from '@/stitches.config';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import Link from 'next/link';
import React from 'react';
import useMeasure from 'react-use-measure';
import { Box } from './primitives/Box';
import { Flex } from './primitives/Flex';
import { Stack } from './primitives/Stack';
import { StyledLink } from './primitives/StyledLink';
import { Text } from './primitives/Text';

const GreyText = styled(Text, {
  color: '$text2',
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
        <StyledLink css={{ color: '$text2' }}>VIEW ALL</StyledLink>
      </Link>
    </Flex>
  );
}
interface CardProps {
  project: HomepageProject;
}
function Card({ project: { body, tags, title } }: CardProps): JSX.Element {
  const tagsString: string = React.useMemo(() => {
    return parseTagsToString(tags);
  }, [tags]);

  return (
    <Box as='article'>
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
          <Text as='h1'>{title}</Text>
        </Stack>
        <Box css={{ maxWidth: '370px' }}>
          <Text
            as='p'
            css={{ color: '$text2', lineHeight: '$body', fontSize: '$1' }}>
            {body}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}

const Grid = styled('div', {
  d: 'grid',
  gtc: 'repeat(2, 1fr)',
  columnGap: '$2',
  rowGap: '$5',
});

export function ProjectGrid(): JSX.Element {
  return (
    <Stack gap='5'>
      <TitleBar projectCount={3} />
      <Grid>
        {homepageProjects.map((project, idx) => (
          <Card key={idx} project={project} />
        ))}
      </Grid>
    </Stack>
  );
}
