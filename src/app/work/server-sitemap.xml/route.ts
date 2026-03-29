import { getAllProjects } from '@/app/_utils/content';
import { getServerSideSitemap } from 'next-sitemap';

export async function GET() {
  const projects = getAllProjects();
  return getServerSideSitemap(
    projects.map((project) => ({
      loc: `https://www.hunterjennings.dev/work/${project.slug}`,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    })),
  );
}
