import { useGetProjectsQuery } from '@/graphql/generated/types.generated';
import { Box } from '@components/common/Box';
import { ProjectCard } from '@components/common/ProjectCard';
import {
  ScrollContainerArea,
  ScrollContainerScrollbar,
  ScrollContainerThumb,
  ScrollContainerViewport,
} from '@components/common/ScrollContainer';
import { Stack } from '@components/common/Stack';

export const ProjectGrid = ({ count }: { count: number }): JSX.Element => {
  const [{ data }] = useGetProjectsQuery({ variables: { count } });
  const { projects } = data ?? {};

  return (
    <ScrollContainerArea>
      <ScrollContainerScrollbar orientation='horizontal'>
        <ScrollContainerThumb />
      </ScrollContainerScrollbar>
      <ScrollContainerViewport>
        <Stack gap='s' css={{ mb: '$l' }} direction='row'>
          {projects?.map((project) => (
            <Box
              key={project.id}
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
              <ProjectCard
                project={project}
                sizes='(max-width: 590px) 90vw, (max-width: 767px) 45vw, 220px'
              />
            </Box>
          ))}
        </Stack>
      </ScrollContainerViewport>
    </ScrollContainerArea>
  );
};
