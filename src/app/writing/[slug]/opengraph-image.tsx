import { getAllWritings } from '@/app/_utils/content';
import { ogTemplate } from '@/app/_utils/og-template';

export const alt =
  'Writing - Thoughts on software, books, life, and any opinions I have at a moment in time.';

export default async function Image(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const writing = getAllWritings().find((w) => w.slug === params.slug);

  const { title, description } = writing ?? { title: '', description: '' };
  return ogTemplate({
    title: title,
    sub: description,
  });
}
