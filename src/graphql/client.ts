import {
  TypedDocumentNode,
  ResultOf,
  VariablesOf,
} from '@graphql-typed-document-node/core';
import { CMS_URL } from '@utils/common/constants/cms.constants';
import { getAuthHeader } from '@utils/common/helpers/get-auth-header.helpers';
import { isSSR } from '@utils/common/helpers/is-ssr.helpers';
import request, {
  GraphQLClient,
  RequestDocument,
  Variables,
} from 'graphql-request';

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
) => {
  return () => createHygraphClient(preview).request<TData>(query, variables);
};

export const cmsRequest = <TQuery extends TypedDocumentNode<any, any>>({
  preview = false,
  query,
  variables,
}: {
  preview?: boolean;
  query: TQuery;
  variables?: VariablesOf<TQuery>;
}) => {
  return async () => {
    return request<ResultOf<TQuery>>(URL, query, variables, {
      authorization: getAuthHeader(preview),
    });
  };
};
