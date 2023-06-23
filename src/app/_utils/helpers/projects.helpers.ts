import { cms } from '@/graphql/cms';

export const getProjects = async (count?: number) => {
  if (count != null) {
    return cms({
      next: {
        tags: ['GetProjectsQuery', count.toString()],
      },
    }).GetProjects({
      count,
    });
  }

  return cms({
    next: {
      tags: ['GetProjectsQuery'],
    },
  }).GetProjects();
};

export const getProject = async (project: string) => {
  return cms({
    next: {
      tags: ['GetProjectQuery', project],
    },
  }).GetProject({
    slug: project,
  });
};
