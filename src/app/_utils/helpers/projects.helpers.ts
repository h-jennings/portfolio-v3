import { cms } from '@/graphql/cms';
import { TAGS } from '../constants/cache.constants';

export const getProjects = async (count?: number) => {
  return cms({
    next: {
      tags: [TAGS.projects],
    },
  }).GetProjects(
    count != null
      ? {
          count,
        }
      : undefined,
  );
};

export const getProject = async (project: string) => {
  return cms({
    next: {
      tags: [TAGS.project(project)],
    },
  }).GetProject({
    slug: project,
  });
};
