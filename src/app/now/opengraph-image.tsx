import { ogTemplate } from '../_utils/og-template';

export const alt = 'Now - A snapshot of my life via short updates.';

export default function Image() {
  return ogTemplate({
    title: 'Now',
    sub: 'A snapshot of my life via short updates.',
  });
}
