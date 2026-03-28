import { getAllUpdates } from '@/app/_utils/content';
import { parseDateToLongDateString } from '@/app/_utils/helpers/date.helpers';
import { ogTemplate } from '@/app/_utils/og-template';

export const alt = 'Now - An update from my life';

export default async function Image({
  params,
}: {
  params: { update: string };
}) {
  const update = getAllUpdates().find((u) => u.slug === params.update);
  const fancyDate = parseDateToLongDateString(update?.date ?? '');

  return await ogTemplate({
    title: 'Now',
    sub: `A snapshot of my life—${fancyDate}.`,
  });
}
