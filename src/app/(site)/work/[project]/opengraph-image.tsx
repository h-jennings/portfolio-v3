import { getProjectBySlug } from '@/app/_utils/content';
import { ogTemplate } from '@/app/_utils/og-template';

export const alt = 'Project details';

export default async function Image(props: {
  params: Promise<{ project: string }>;
}) {
  const params = await props.params;
  const project = getProjectBySlug(params.project);

  const { name, description } = project ?? { name: '', description: '' };
  return ogTemplate({
    title: name,
    sub: description,
  });
}
