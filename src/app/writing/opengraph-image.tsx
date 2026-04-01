import { ogTemplate } from '@/app/_utils/og-template';

export const alt =
  'Writing - Thoughts on software, books, life, and any opinions I have at a moment in time.';

export default function Image() {
  return ogTemplate({
    title: 'Writing',
    sub: 'Thoughts on software, books, life, and any opinions I have at a moment in time.',
  });
}
