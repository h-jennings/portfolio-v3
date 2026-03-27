import { getAllWritings } from '@/app/_utils/content';
import { ogTemplate } from '@/app/_utils/og-template';

export const runtime = 'edge';
export const alt =
  'Writing - Thoughts on software, books, life, and any opinions I have at a moment in time.';

export default async function Image({ params }: { params: { slug: string } }) {
  const writing = getAllWritings().find((w) => w.slug === params.slug);

  const { title, description } = writing ?? { title: '', description: '' };
  return await ogTemplate({
    title: title,
    sub: description,
  });
}
