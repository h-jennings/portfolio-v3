import { cms } from '@/graphql/cms';

export const getProjects = async () => {
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
