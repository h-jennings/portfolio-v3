import { CMS_URL } from '@/app/_utils/constants/cms.constants';
import { GraphQLClient } from 'graphql-request';
import { draftMode } from 'next/headers';
import 'server-only';
import { getSdk } from './generated/cms.generated';

const getAuthHeader = async () => {
  const { isEnabled } = await draftMode();
  return `Bearer ${
    !isEnabled
      ? (process.env.CMS_PROD_TOKEN ?? '')
      : (process.env.CMS_PREVIEW_TOKEN ?? '')
  }`;
};

const client = async ({ next }: { next?: NextFetchRequestConfig }) => {
  return new GraphQLClient(CMS_URL, {
    headers: {
      Authorization: await getAuthHeader(),
    },
    fetch, // Need to pass fetch here because of Next.js cache
    next, // Allows us to control the cache on a per-request basis
  });
};

export const cms = async ({ next }: { next?: NextFetchRequestConfig } = {}) =>
  getSdk(await client({ next }));
