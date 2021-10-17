import { ProjectMeta, projectMetaData } from '@/constants/projects';

export function prevNextProjectData(
  idx: number,
): [ProjectMeta | null, ProjectMeta | null] {
  const metaDataArray = Object.entries(projectMetaData).map(([, data]) => data);
  const previousProject: ProjectMeta | null = metaDataArray[idx - 1] ?? null;
  const nextProject: ProjectMeta | null = metaDataArray[idx + 1] ?? null;
  return [previousProject, nextProject];
}
