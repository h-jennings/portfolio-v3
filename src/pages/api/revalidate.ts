/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { verifyWebhookSignature } from '@graphcms/utils';
import { NextApiRequest, NextApiResponse } from 'next';

const revalidate = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  const signature = req.headers['gcms-signature'] as string;
  const secret = process.env.CMS_WEBHOOK_SECRET;

  if (!signature) {
    return res.status(401).json({ message: 'Signature does not exist' });
  }

  if (!secret) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  const isValid = verifyWebhookSignature({ body, signature, secret });
  if (!isValid) {
    return res.status(403).json({ message: 'Signature is invalid' });
  }

  if ('data' in body && 'slug' in body.data && '__typename' in body.data) {
    const type = body.data.__typename;
    const slug = body.data.slug;
    switch (type) {
      case 'Project': {
        try {
          console.log('[Next.js] Revalidating /');
          await res.revalidate('/');

          console.log('[Next.js] Revalidating /work');
          await res.revalidate('/work');

          console.log(`[Next.js] Revalidating /work/${slug}`);
          await res.revalidate(`/work/${slug}`);
          return res.status(200).send('Success!');
        } catch {
          return res.status(500).send('Error revalidating');
        }
      }
      case 'Writing': {
        try {
          console.log('[Next.js] Revalidating /');
          await res.revalidate('/');

          if (slug === 'now') {
            console.log(`[Next.js] Revalidating /now`);
            await res.revalidate(`/now`);
            return res.status(200).send('Success!');
          } else {
            console.log('[Next.js] Revalidating /writing');
            await res.revalidate('/writing');

            console.log(`[Next.js] Revalidating /writing/${slug}`);
            await res.revalidate(`/writing/${slug}`);
            return res.status(200).send('Success!');
          }
        } catch {
          return res.status(500).send('Error revalidating');
        }
      }
      default: {
        return res
          .status(403)
          .json({ message: 'Only Project and Writing changes are valid' });
      }
    }
  } else {
    return res.status(403).json({ message: 'Incorrect data signature' });
  }
};

export default revalidate;
