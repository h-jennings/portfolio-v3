import { GraphQLClient } from 'graphql-request';
import { draftMode } from 'next/headers';
import 'server-only';
import { getSdk } from './generated/cms.generated';
import { CMS_URL } from '@/app/_utils/constants/cms.constants';

const getAuthHeader = () => {
  const { isEnabled } = draftMode();
  return `Bearer ${
    !isEnabled ? process.env.CMS_PROD_TOKEN! : process.env.CMS_PREVIEW_TOKEN!
  }`;
};

const client = ({ next }: { next?: NextFetchRequestConfig }) => {
  return new GraphQLClient(CMS_URL, {
    headers: {
      Authorization: getAuthHeader(),
    },
    fetch, // Need to pass fetch here because of Next.js cache
    next, // Allows us to control the cache on a per-request basis
  });
};

export const cms = ({ next }: { next?: NextFetchRequestConfig } = {}) =>
  getSdk(client({ next }));
