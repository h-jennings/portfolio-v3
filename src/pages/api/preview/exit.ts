import { serverSideRedirect } from '@/app/_utils/helpers/api-route.helpers';
import { NextApiRequest, NextApiResponse } from 'next';

const exit = (req: NextApiRequest, res: NextApiResponse) => {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData();

  // Redirect the user back to the index page.
  serverSideRedirect(res, req.headers.referer ?? '/', 307);

  res.end();
};

export default exit;
