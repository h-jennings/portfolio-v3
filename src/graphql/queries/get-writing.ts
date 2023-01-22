import {
  QueryClient,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { cmsFetcher } from '../client';
import {
  GetWriting,
  GetWritingQuery,
  GetWritingQueryVariables,
} from '../generated/types.generated';

const QUERY_KEY = 'GetWriting';

export const useGetWritingQuery = <TData = GetWritingQuery, TError = unknown>(
  preview: boolean,
  variables?: GetWritingQueryVariables,
  options?: UseQueryOptions<GetWritingQuery, TError, TData>,
) =>
  useQuery<GetWritingQuery, TError, TData>(
    variables === undefined ? [QUERY_KEY] : [QUERY_KEY, variables],
    writingFetcher(preview, variables),
    options,
  );

export const prefetchWriting = async (
  preview: boolean,
  variables?: GetWritingQueryVariables,
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

  let writing = null;
  try {
    writing = await queryClient.fetchQuery({
      queryKey,
      queryFn: writingFetcher(preview, variables),
    });
  } catch (error) {
    writing = null;
  }

  return { queryClient, initialData: writing };
};

const writingFetcher = (
  preview: boolean,
  variables?: GetWritingQueryVariables,
) => {
  return cmsFetcher<GetWritingQuery, GetWritingQueryVariables>(
    preview,
    GetWriting,
    variables,
  );
};
