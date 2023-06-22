import { cms } from '@/graphql/cms';

export const getProjects = async (count?: number) => {
  if (count != null) {
    return cms({
      next: {
        tags: ['GetProjectsQuery', count.toString()],
      },
    }).GetProjectsQuery({
      count,
    });
  }

  return cms({
    next: {
      tags: ['GetProjectsQuery'],
    },
  }).GetProjectsQuery();
};

export const getProject = async (project: string) => {
  return cms({
    next: {
      tags: ['GetProjectQuery', project],
    },
  }).GetProjectQuery({
    slug: project,
  });
};
