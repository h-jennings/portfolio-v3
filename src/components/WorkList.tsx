import { PATHS } from '@/constants/paths';
import { Project, projectMetaData } from '@/data/projects';
import { styled } from '@/stitches.config';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import Link from 'next/link';
import { Box } from './primitives/Box';
import { LinkBox, LinkOverlay } from './primitives/LinkBox';
import { Stack } from './primitives/Stack';
import { Text } from './primitives/Text';

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
  gtc: '354px 1fr 240px',
  gridTemplateAreas: 'a b c',
  justifyContent: 'start',
  alignItems: 'start',
});

const ProjectContainer = styled('div', {});
const ClientContainer = styled('div', {});
const ThumbnailContainer = styled('div', {
  maxWidth: '240px',
  width: '$full',
});

const EyebrowText = styled(Text, {
  color: '$text2',
});

interface ListItemProps {
  project: Project;
}
function ListItem({
  project: { project, client, path },
}: ListItemProps): JSX.Element {
  return (
    <li>
      <LinkBox>
        <ListItemContainer>
          <ProjectContainer>
            <Stack gap='2'>
              <EyebrowText size='1'>PROJECT</EyebrowText>
              <Link passHref href={`${PATHS.work}/[project]`} as={path}>
                <LinkOverlay>
                  <Text size='3'>{project}</Text>
                </LinkOverlay>
              </Link>
            </Stack>
          </ProjectContainer>
          <ClientContainer>
            <Stack gap='2'>
              <EyebrowText size='1'>CLIENT</EyebrowText>
              <Text size='3'>{client}</Text>
            </Stack>
          </ClientContainer>
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
  const projectEntries = Object.entries(projectMetaData);
  return (
    <List as='ul'>
      {projectEntries.map(([, project], idx) => (
        <ListItem key={idx} project={project} />
      ))}
    </List>
  );
}
