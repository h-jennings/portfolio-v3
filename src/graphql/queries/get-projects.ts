import {
  QueryClient,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { cmsFetcher } from '../client';
import {
  GetProjects,
  GetProjectsQuery,
  GetProjectsQueryVariables,
} from '../generated/types.generated';

export const QUERY_KEY = 'GetProjects';

const projectsFetcher = (
  preview: boolean,
  variables?: GetProjectsQueryVariables,
) => {
  return cmsFetcher<GetProjectsQuery, GetProjectsQueryVariables>(
    preview,
    GetProjects,
    variables,
  );
};

export const useGetProjectsQuery = <TData = GetProjectsQuery, TError = unknown>(
  preview: boolean,
  variables?: GetProjectsQueryVariables,
  options?: UseQueryOptions<GetProjectsQuery, TError, TData>,
) =>
  useQuery<GetProjectsQuery, TError, TData>(
    variables === undefined
      ? [QUERY_KEY, preview]
      : [QUERY_KEY, variables, preview],
    projectsFetcher(preview, variables),
    options,
  );

export const prefetchProjects = async (
  preview: boolean,
  variables?: GetProjectsQueryVariables,
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 20 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey:
      variables === undefined
        ? [QUERY_KEY, preview]
        : [QUERY_KEY, variables, preview],
    queryFn: projectsFetcher(preview, variables),
  });

  return queryClient;
};
