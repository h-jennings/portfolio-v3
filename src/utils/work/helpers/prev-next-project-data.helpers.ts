import { ProjectsMeta } from '@utils/common/types/cms.types';

export function prevNextProjectData(
  idx: number,
  projects: ProjectsMeta | undefined,
) {
  if (!projects) return [null, null];

  const previousProject = projects[idx - 1] ?? null;
  const nextProject = projects[idx + 1] ?? null;
  return [previousProject, nextProject];
}
