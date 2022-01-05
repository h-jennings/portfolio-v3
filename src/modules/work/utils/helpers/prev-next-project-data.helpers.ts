import {
  ProjectMeta,
  PROJECT_METADATA,
} from '@work/utils/constants/projects.constants';

export function prevNextProjectData(
  idx: number,
): [ProjectMeta | null, ProjectMeta | null] {
  const metaDataArray = Object.entries(PROJECT_METADATA).map(
    ([, data]) => data,
  );
  const previousProject: ProjectMeta | null = metaDataArray[idx - 1] ?? null;
  const nextProject: ProjectMeta | null = metaDataArray[idx + 1] ?? null;
  return [previousProject, nextProject];
}
