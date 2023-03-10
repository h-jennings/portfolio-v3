import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { cmsFetcher } from '../client';
import {
  GetProjects,
  GetProjectsQuery,
  GetProjectsQueryVariables,
} from '../generated/types.generated';

export const QUERY_KEY = 'GetProjects';

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

export const projectsFetcher = (
  preview: boolean,
  variables?: GetProjectsQueryVariables,
) => {
  return cmsFetcher<GetProjectsQuery, GetProjectsQueryVariables>(
    preview,
    GetProjects,
    variables,
  );
};
