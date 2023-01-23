import { createHygraphClient } from '@/graphql/client';
import { CMS_URL } from '@utils/common/constants/cms.constants';
import { Variables } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { preview } = req.headers;
  const { query, variables } = req.body as {
    query: string;
    variables?: Variables;
  };
  try {
    const client = createHygraphClient(preview === 'true', CMS_URL);
    const data = await client.rawRequest(query, variables);
    res.status(200).send(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error:', error);
    res.status(200).send('Server Error');
  }
};

export default handler;
