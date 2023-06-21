import { ogTemplate } from '../_utils/og-template';

export const runtime = 'edge';
export const alt =
  'Work - A curated collection of my work throughout the years.';

export default async function Image() {
  return await ogTemplate({
    title: 'Work',
    sub: 'A curated collection of my work throughout the years.',
  });
}
