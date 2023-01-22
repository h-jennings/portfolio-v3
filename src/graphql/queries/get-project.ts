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

const QUERY_KEY = 'GetProject';

export const useGetProjectQuery = <TData = GetProjectQuery, TError = unknown>(
  preview: boolean,
  variables: GetProjectQueryVariables,
  options?: UseQueryOptions<GetProjectQuery, TError, TData>,
) =>
  useQuery<GetProjectQuery, TError, TData>(
    [QUERY_KEY, variables],
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

  const queryKey = [QUERY_KEY, variables];

  let project = null;
  try {
    project = await queryClient.fetchQuery({
      queryKey,
      queryFn: projectFetcher(preview, variables),
    });
  } catch (error) {
    project = null;
  }

  return { queryClient, initialData: project };
};

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
