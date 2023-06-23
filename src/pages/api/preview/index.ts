import {
  sendUnauthorized,
  serverSideRedirect,
} from '@/app/_utils/helpers/api-route.helpers';
import { type NextApiRequest, type NextApiResponse } from 'next';

const preview = (req: NextApiRequest, res: NextApiResponse) => {
  const { secret, slug } = req.query;

  if (
    secret !== process.env.NEXT_PREVIEW_SECRET ||
    slug == null ||
    Array.isArray(slug)
  ) {
    return sendUnauthorized(res, 'Invalid token or slug not provided');
  }

  //

  /**
   * Calling setPreviewData sets a preview cookies that turn on the preview mode.
   * Any requests to Next.js containing these cookies will be seen as preview mode
   */
  res.setPreviewData({
    maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
  });

  serverSideRedirect(res, slug, 307);

  res.end();
};

export default preview;
