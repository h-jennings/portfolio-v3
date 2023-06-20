import { ogTemplate } from '../_utils/og-template';

export const runtime = 'edge';
export const alt =
  'Writing - Thoughts on software, books, life, and any opinions I have at a moment in time.';

export default async function Image() {
  return await ogTemplate({
    title: 'Writing',
    sub: 'Thoughts on software, books, life, and any opinions I have at a moment in time.',
  });
}
