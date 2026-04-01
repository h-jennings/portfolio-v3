import { getAllUpdates } from '@/app/_utils/content';
import { parseDateToLongDateString } from '@/app/_utils/helpers/date.helpers';
import { ogTemplate } from '@/app/_utils/og-template';

export const alt = 'Now - An update from my life';

export default async function Image(props: {
  params: Promise<{ update: string }>;
}) {
  const params = await props.params;
  const update = getAllUpdates().find((u) => u.slug === params.update);
  const fancyDate = parseDateToLongDateString(update?.date ?? '');

  return ogTemplate({
    title: 'Now',
    sub: `A snapshot of my life—${fancyDate}.`,
  });
}
