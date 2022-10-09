export const getAuthHeader = (preview: boolean) => {
  const token = !preview
    ? process.env.CMS_PROD_TOKEN!
    : process.env.CMS_PREVIEW_TOKEN!;

  return `Bearer ${token}`;
};
