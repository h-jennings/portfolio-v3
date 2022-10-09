import { CMS_URL } from '@/utils/common/constants/cms.constants';
import { isSSR } from '@/utils/common/helpers/is-ssr.helpers';
import { getAuthHeader } from '@utils/common/helpers/get-auth-header.helpers';
import { NextPage } from 'next';
import { initUrqlClient, SSRExchange, withUrqlClient } from 'next-urql';
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql';

export const initHygraphCmsClient = (
  ssrCache: SSRExchange,
  preview = false,
) => {
  return initUrqlClient(
    {
      url: CMS_URL,
      fetchOptions: {
        headers: {
          Authorization: getAuthHeader(preview),
        },
      },
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
      suspense: false,
    },
    false,
  );
};

export const withUrqlSSR = <TProps = unknown, TInitialProps = TProps>(
  Page: NextPage<TProps, TInitialProps>,
) => {
  return withUrqlClient(
    () => ({
      url: isSSR ? CMS_URL : '/api/graphql',
      fetchOptions: {
        headers: {
          Authorization: isSSR ? `Bearer ${process.env.CMS_PROD_TOKEN}` : '',
        },
      },
    }),
    { ssr: false, neverSuspend: true },
  )(Page);
};

export const spawnHygraphCMSClientInstance = (preview = false) => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initHygraphCmsClient(ssrCache, preview);
  return { ssrCache, client };
};
