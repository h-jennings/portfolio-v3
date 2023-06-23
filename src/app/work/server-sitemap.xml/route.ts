import { getProjects } from '@/app/_utils/helpers/projects.helpers';
import { getServerSideSitemap } from 'next-sitemap';

export async function GET() {
  // Method to source urls from cms
  const { projects } = await getProjects();
  return getServerSideSitemap(
    projects.map((project) => ({
      loc: `https://www.hunterjennings.dev/work/${project.slug}`,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    })),
  );
}
