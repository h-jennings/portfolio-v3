import { getProjectBySlug } from '@/app/_utils/content';
import { ogTemplate } from '@/app/_utils/og-template';

export const alt = 'Project details';

export default async function Image({
  params,
}: {
  params: { project: string };
}) {
  const project = getProjectBySlug(params.project);

  const { name, description } = project ?? { name: '', description: '' };
  return await ogTemplate({
    title: name,
    sub: description,
  });
}
