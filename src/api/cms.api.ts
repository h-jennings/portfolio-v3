import { createHygraphClient } from '@/graphql/client';
import {
  GetProjectSlugsDocument,
  GetProjectSlugsQuery,
} from '@/graphql/generated/types.generated';
import * as fs from 'fs';
import * as path from 'path';

export const projects = {
  fetch: async () => {
    return await createHygraphClient(false).request<GetProjectSlugsQuery>(
      GetProjectSlugsDocument,
    );
  },
  cache: {
    get: async (): Promise<GetProjectSlugsQuery | null> => {
      const data = await fs.promises.readFile(
        path.join(process.cwd(), 'projects.db'),
      );
      const projects = JSON.parse(
        data as unknown as string,
      ) as GetProjectSlugsQuery;

      return projects;
    },
    set: async (data: GetProjectSlugsQuery) => {
      return await fs.promises.writeFile(
        path.join(process.cwd(), 'projects.db'),
        JSON.stringify(data),
      );
    },
  },
};
