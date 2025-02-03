import { cms } from '@/graphql/cms';
import { TAGS } from '../constants/cache.constants';

export const getProjects = async (count?: number) => {
  const cmsClient = await cms({
    next: {
      tags: [TAGS.projects],
    },
  });

  return cmsClient.GetProjects(
    count != null
      ? {
          count,
        }
      : undefined,
  );
};

export const getProject = async (project: string) => {
  const cmsClient = await cms({
    next: {
      tags: [TAGS.project(project)],
    },
  });

  return cmsClient.GetProject({
    slug: project,
  });
};
