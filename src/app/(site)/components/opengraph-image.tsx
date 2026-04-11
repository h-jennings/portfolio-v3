import { ogTemplate } from '@/app/_utils/og-template';

export const alt = 'Components - Interactive snippets and techniques.';

export default function Image() {
  return ogTemplate({
    title: 'Components',
    sub: 'Interactive snippets and techniques.',
  });
}
