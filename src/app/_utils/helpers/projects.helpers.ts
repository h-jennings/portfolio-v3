import { cms } from '@/graphql/cms';
import { TAGS } from '../constants/cache.constants';

export const getProjects = async (count?: number) => {
  const client = await cms({ next: { tags: [TAGS.projects] } });
  return client.GetProjects(count != null ? { count } : undefined);
};

export const getProject = async (project: string) => {
  const client = await cms({ next: { tags: [TAGS.project(project)] } });
  return client.GetProject({ slug: project });
};
