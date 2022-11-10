import {
  QueryClient,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { cmsFetcher } from '../client';
import {
  GetWritings,
  GetWritingsQuery,
  GetWritingsQueryVariables,
} from '../generated/types.generated';

const QUERY_KEY = 'GetWritings';

export const useGetWritingsQuery = <TData = GetWritingsQuery, TError = unknown>(
  preview: boolean,
  variables?: GetWritingsQueryVariables,
  options?: UseQueryOptions<GetWritingsQuery, TError, TData>,
) =>
  useQuery<GetWritingsQuery, TError, TData>(
    variables === undefined ? [QUERY_KEY] : [QUERY_KEY, variables],
    writingsFetcher(preview, variables),
    options,
  );

export const prefetchWritings = async (
  preview: boolean,
  variables?: GetWritingsQueryVariables,
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
    queryFn: writingsFetcher(preview, variables),
  });

  const initialData = queryClient.getQueryData<GetWritingsQuery>(queryKey);

  return { queryClient, initialData };
};

const writingsFetcher = (
  preview: boolean,
  variables?: GetWritingsQueryVariables,
) => {
  return cmsFetcher<GetWritingsQuery, GetWritingsQueryVariables>(
    preview,
    GetWritings,
    variables,
  );
};
