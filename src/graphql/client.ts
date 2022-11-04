import { CMS_URL } from '@utils/common/constants/cms.constants';
import { getAuthHeader } from '@utils/common/helpers/get-auth-header.helpers';
import { isSSR } from '@utils/common/helpers/is-ssr.helpers';
import { GraphQLClient, RequestDocument } from 'graphql-request';

const URL = isSSR ? CMS_URL : '/api/graphql';

export const createHygraphClient = (preview = false, url?: string) => {
  return new GraphQLClient(url ?? URL, {
    headers: {
      Authorization: getAuthHeader(preview),
    },
  });
};

export const cmsFetcher = <TData, TVariables>(
  preview: boolean,
  query: RequestDocument,
  variables?: TVariables,
): (() => Promise<TData>) => {
  return () => createHygraphClient(preview).request(query, variables);
};

export const makePreviewRequest = <
  TData,
  TVariables extends Record<string, any>,
>(
  query: RequestDocument,
  variables?: TVariables,
) => {
  const v = {
    ...variables,
    preview: true,
  };

  try {
    return createHygraphClient(true).request<TData>(query, v);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return null;
  }
};
