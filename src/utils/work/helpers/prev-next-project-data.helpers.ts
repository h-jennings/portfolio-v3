import {
  ProjectData,
  PROJECT_DATA,
} from '@utils/work/constants/projects.constants';

export function prevNextProjectData(
  idx: number,
): [ProjectData | null, ProjectData | null] {
  const metaDataArray = Object.entries(PROJECT_DATA).map(([, data]) => data);
  const previousProject: ProjectData | null = metaDataArray[idx - 1] ?? null;
  const nextProject: ProjectData | null = metaDataArray[idx + 1] ?? null;
  return [previousProject, nextProject];
}
