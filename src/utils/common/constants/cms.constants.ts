import { getAuthHeader } from '../helpers/get-auth-header.helpers';

export const CMS_URL = `https://api-us-east-1.hygraph.com/v2/${process.env.CMS_SPACE}/${process.env.CMS_ENV}`;
export const FETCH_PARAMS = {
  headers: {
    Authorization: getAuthHeader(false),
  },
};
