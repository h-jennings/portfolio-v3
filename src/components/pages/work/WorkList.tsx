import { styled } from '@/stitches.config';
import { Box } from '@components/Box';
import { LinkBox, LinkOverlay } from '@components/LinkBox';
import { Stack } from '@components/Stack';
import { Text } from '@components/Text';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { PATHS } from '@utils/constants/paths.constants';
import {
  ProjectMeta,
  PROJECT_METADATA,
} from '@utils/constants/projects.constants';
import NextLink from 'next/link';

const List = styled(Box, {
  '> :first-child': {
    borderTop: '1px solid $slate8',
  },
  '> li': {
    borderBottom: '1px solid $slate8',
  },
});

const ListItemContainer = styled('div', {
  py: '$2',
  d: 'grid',
  gap: '$2',
  gtc: '1fr',
  gridTemplateAreas: `'a'
                      'b'`,
  justifyContent: 'start',
  alignItems: 'start',
  '@bp2': {
    gtc: '240px 1fr',
    gridTemplateAreas: `'a b'`,
  },
  '@bp3': {
    gtc: '1fr 240px',
  },
});

const TextContentContainer = styled('div', {
  d: 'grid',
  gap: '$3',
  gtc: '1fr 1fr',
  py: '$2',
  gridArea: 'b',
  '@bp2': {
    py: 0,
    gap: '$2',
    gtc: '1fr',
  },
  '@bp3': {
    py: '$2',
    gtc: '354px 1fr',
    gap: '$2',
    gridArea: 'a',
  },
});
const ThumbnailContainer = styled('div', {
  maxWidth: '$full',
  '@bp2': {
    maxWidth: 300,
  },
});

interface ListItemProps {
  project: ProjectMeta;
}
function ListItem({
  project: { project, client, path },
}: ListItemProps): JSX.Element {
  return (
    <li>
      <LinkBox>
        <ListItemContainer>
          <TextContentContainer>
            <div>
              <Stack gap={{ '@initial': 'm', '@bp3': 'm' }}>
                <Text color='2' size='1'>
                  PROJECT
                </Text>
                <NextLink passHref href={`${PATHS.work}/[project]`} as={path}>
                  <LinkOverlay>
                    <Text
                      size={{ '@initial': '2', '@bp3': '3' }}
                      leading='body'
                    >
                      {project}
                    </Text>
                  </LinkOverlay>
                </NextLink>
              </Stack>
            </div>
            <div>
              <Stack gap={{ '@initial': 'm', '@bp3': 'm' }}>
                <Text color='2' size='1'>
                  CLIENT
                </Text>
                <Text leading='body' size={{ '@initial': '2', '@bp3': '3' }}>
                  {client}
                </Text>
              </Stack>
            </div>
          </TextContentContainer>
          <ThumbnailContainer>
            <AspectRatioPrimitive.Root ratio={16 / 9}>
              <Box css={{ height: '100%', backgroundColor: '$slate8' }}></Box>
            </AspectRatioPrimitive.Root>
          </ThumbnailContainer>
        </ListItemContainer>
      </LinkBox>
    </li>
  );
}
export function WorkList(): JSX.Element {
  const projectEntries = Object.entries(PROJECT_METADATA);
  return (
    <List as='ul'>
      {projectEntries.map(([, project], idx) => (
        <ListItem key={idx} project={project} />
      ))}
    </List>
  );
}
