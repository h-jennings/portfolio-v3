import { ogTemplate } from '@/app/_utils/og-template';
import { allWritings } from 'contentlayer/generated';

export const runtime = 'edge';
export const alt =
  'Writing - Thoughts on software, books, life, and any opinions I have at a moment in time.';

export default async function Image({ params }: { params: { slug: string } }) {
  const writing = allWritings.find((writing) => writing.slug === params.slug);

  const { title, description } = writing!;
  return await ogTemplate({
    title: title,
    sub: description,
  });
}
