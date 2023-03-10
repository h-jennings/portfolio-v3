import { cmsRequest } from '@/graphql/client';
import { DocumentType, graphql } from '@/graphql/generated';
import * as fs from 'fs';
import * as path from 'path';

const GetProjectSlugsQueryDocument = graphql(`
  query GetProjectSlugsQuery {
    projects(first: 25) {
      slug
    }
  }
`);

type GetProjectSlugsQuery = DocumentType<typeof GetProjectSlugsQueryDocument>;

export const projectSlugs = {
  fetch: cmsRequest({ query: GetProjectSlugsQueryDocument }),
  cache: {
    get: async (): Promise<GetProjectSlugsQuery | null> => {
      try {
        const dir = path.resolve('./', 'src');
        const data = await fs.promises.readFile(path.join(dir, 'projects.db'));
        const projects = JSON.parse(
          data as unknown as string,
        ) as GetProjectSlugsQuery;

        return projects;
      } catch {
        return null;
      }
    },
    set: async (data: GetProjectSlugsQuery) => {
      const dir = path.resolve('./', 'src');
      return await fs.promises.writeFile(
        path.join(dir, 'projects.db'),
        JSON.stringify(data),
      );
    },
  },
};
