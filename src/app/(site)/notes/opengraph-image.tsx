import { ogTemplate } from '@/app/_utils/og-template';

export const alt = 'Notes - A snapshot of my life via short updates.';

export default function Image() {
  return ogTemplate({
    title: 'Notes',
    sub: 'A snapshot of my life via short updates.',
  });
}
