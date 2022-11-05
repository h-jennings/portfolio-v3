import { cmsFetcher } from '@/graphql/client';
import {
  GetProjectQueryVariables,
  GetProjectSlugs,
  GetProjectSlugsQuery,
} from '@/graphql/generated/types.generated';
import * as fs from 'fs';
import * as path from 'path';

export const projectSlugs = {
  fetch: cmsFetcher<GetProjectSlugsQuery, GetProjectQueryVariables>(
    false,
    GetProjectSlugs,
  ),
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
