export const TAGS = {
  projects: 'GetProjectsQuery',
  project: (slug: string) => `GetProjectQuery:${slug}`,
} as const;
