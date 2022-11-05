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

const QUERY_KEY = 'GetProjects';

export const useGetProjectsQuery = <TData = GetProjectsQuery, TError = unknown>(
  preview: boolean,
  variables?: GetProjectsQueryVariables,
  options?: UseQueryOptions<GetProjectsQuery, TError, TData>,
) =>
  useQuery<GetProjectsQuery, TError, TData>(
    variables === undefined ? [QUERY_KEY] : [QUERY_KEY, variables],
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
        staleTime: Infinity,
      },
    },
  });

  const queryKey =
    variables === undefined ? [QUERY_KEY] : [QUERY_KEY, variables];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: projectsFetcher(preview, variables),
  });

  const initialData = queryClient.getQueryData<GetProjectsQuery>(queryKey);

  return { queryClient, initialData };
};

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
