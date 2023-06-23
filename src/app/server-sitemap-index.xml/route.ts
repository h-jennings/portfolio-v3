import { getServerSideSitemapIndex } from 'next-sitemap';

export async function GET() {
  return getServerSideSitemapIndex([
    'https://www.hunterjennings.dev/work/server-sitemap.xml',
  ]);
}
