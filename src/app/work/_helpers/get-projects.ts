import { cms } from '@/graphql/cms';

export const getProjects = async () => {
  return cms({
    next: {
      tags: ['GetProjectsQuery'],
    },
  }).GetProjectsQuery();
};
