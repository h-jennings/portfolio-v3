import { CMS_URL } from '@utils/common/constants/cms.constants';
import { getAuthHeader } from '@utils/common/helpers/get-auth-header.helpers';
import { isSSR } from '@utils/common/helpers/is-ssr.helpers';
import { GraphQLClient, RequestDocument, Variables } from 'graphql-request';

const URL = isSSR ? CMS_URL : '/api/graphql';

export const createHygraphClient = (preview = false, url?: string) => {
  return new GraphQLClient(url ?? URL, {
    headers: {
      Authorization: getAuthHeader(preview),
      preview: String(preview),
    },
  });
};

export const cmsFetcher = <TData, TVariables extends Variables>(
  preview: boolean,
  query: RequestDocument,
  variables?: TVariables,
): (() => Promise<TData>) => {
  return () => createHygraphClient(preview).request(query, variables);
};
