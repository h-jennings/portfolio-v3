import {
  QueryClient,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { cmsFetcher } from '../client';
import {
  GetProject,
  GetProjectQuery,
  GetProjectQueryVariables,
} from '../generated/types.generated';

export const QUERY_KEY = 'GetProject';

const projectFetcher = (
  preview: boolean,
  variables: GetProjectQueryVariables,
) => {
  return cmsFetcher<GetProjectQuery, GetProjectQueryVariables>(
    preview,
    GetProject,
    variables,
  );
};

export const useGetProjectQuery = <TData = GetProjectQuery, TError = unknown>(
  preview: boolean,
  variables: GetProjectQueryVariables,
  options?: UseQueryOptions<GetProjectQuery, TError, TData>,
) =>
  useQuery<GetProjectQuery, TError, TData>(
    [QUERY_KEY, variables, preview],
    projectFetcher(preview, variables),
    options,
  );

export const prefetchProject = async (
  preview: boolean,
  variables: GetProjectQueryVariables,
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY, variables, preview],
    queryFn: projectFetcher(preview, variables),
  });

  return queryClient;
};
