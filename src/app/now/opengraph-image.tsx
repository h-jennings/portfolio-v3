import { ogTemplate } from '../_utils/og-template';

export const runtime = 'edge';
export const alt = 'Now - A snapshot of my life via short updates.';

export default async function Image() {
  return await ogTemplate({
    title: 'Now',
    sub: 'A snapshot of my life via short updates.',
  });
}
