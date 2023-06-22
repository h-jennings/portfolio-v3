import { cmsRequest } from '@/graphql/client';
import { graphql } from '@/graphql/generated';
import { useQuery } from '@tanstack/react-query';

export const QUERY_KEY = 'GetProjects';

export const GetProjectsQueryDocument = graphql(`
  query GetProjectsQuery($count: Int = 25) {
    projects(orderBy: date_DESC, first: $count) {
      id
      featured
      ...ProjectFragment
    }
  }
`);

export const ProjectFragment = graphql(`
  fragment ProjectFragment on Project {
    name
    featured
    slug
    category
    description {
      raw
    }
    featureMediaWide {
      url
      mediaType
    }
    featureMediaNarrow {
      url
      mediaType
    }
  }
`);

// TODO: Remove after migration
export const useGetProjectsQuery = ({
  count,
  preview,
}: {
  count?: number;
  preview: boolean;
}) => {
  const queryKey = count != null ? [QUERY_KEY, { count }] : [QUERY_KEY];
  return useQuery(
    queryKey,
    cmsRequest({
      query: GetProjectsQueryDocument,
      preview,
      variables: { count: count ?? 25 },
    }),
    {
      staleTime: Infinity,
    },
  );
};
