import { ogTemplate } from '@/app/_utils/og-template';

export const alt =
  'Work - A curated collection of my work throughout the years.';

export default function Image() {
  return ogTemplate({
    title: 'Work',
    sub: 'A curated collection of my work throughout the years.',
  });
}
