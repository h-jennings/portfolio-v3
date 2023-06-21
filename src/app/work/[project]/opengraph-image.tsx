import { ogTemplate } from '@/app/_utils/og-template';
import { getProject } from '../_helpers/projects';

export const runtime = 'edge';
export const alt = 'Work - some of my projects from the past few years.';

export default async function Image({
  params,
}: {
  params: { project: string };
}) {
  const data = await getProject(params.project);

  const { project } = data;

  return await ogTemplate({
    title: project?.seo.title,
    sub: project?.seo.description ?? undefined,
  });
}
