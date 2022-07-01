import { Box } from '@components/common/Box';
import { ProjectCard } from '@components/common/ProjectCard';
import {
  ScrollContainerArea,
  ScrollContainerScrollbar,
  ScrollContainerThumb,
  ScrollContainerViewport,
} from '@components/common/ScrollContainer';
import { Stack } from '@components/common/Stack';
import { PROJECT_METADATA } from '@utils/work/constants/projects.constants';

export const ProjectGrid = (): JSX.Element => {
  const firstThreeProjectEntries = Object.entries(PROJECT_METADATA).slice(0, 3);
  return (
    <ScrollContainerArea>
      <ScrollContainerScrollbar orientation='horizontal'>
        <ScrollContainerThumb />
      </ScrollContainerScrollbar>
      <ScrollContainerViewport>
        <Stack gap='s' css={{ mb: '$l' }} direction='row'>
          {firstThreeProjectEntries.map(([, project], idx) => (
            <Box
              key={idx}
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
              <ProjectCard project={project} />
            </Box>
          ))}
        </Stack>
      </ScrollContainerViewport>
    </ScrollContainerArea>
  );
};
