export const transformImageUrl = (url: string) => {
  const CDN_URL = /https:\/\/media.graphassets.com\//;
  if (CDN_URL.test(url)) {
    const x = url.split(CDN_URL);
    const assetId = x[1] ?? '';
    return `https://media.graphassets.com/output=format:webp/quality=value:90/${assetId}`;
  }
  return url;
};
