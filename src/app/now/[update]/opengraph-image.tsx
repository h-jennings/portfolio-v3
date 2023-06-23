import { ogTemplate } from '@/app/_utils/og-template';
import { parseDateToLongDateString } from '@/app/_utils/helpers/date.helpers';
import { allUpdates } from 'contentlayer/generated';

export const runtime = 'edge';
export const alt = 'Now - An update from my life';

export default async function Image({
  params,
}: {
  params: { update: string };
}) {
  const update = allUpdates.find((update) => update.slug === params.update);
  const fancyDate = parseDateToLongDateString(update!.date);

  return await ogTemplate({
    title: 'Now',
    sub: `A snapshot of my life—${fancyDate}.`,
  });
}
