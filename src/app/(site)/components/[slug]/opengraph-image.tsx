import { getAllComponents } from '@/app/_utils/content';
import { parseDateToLongDateString } from '@/app/_utils/helpers/date.helpers';
import { ogTemplate } from '@/app/_utils/og-template';

export const alt = 'Component';

export default async function Image(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const component = getAllComponents().find((c) => c.slug === params.slug);
  const title = component?.title ?? 'Component';
  const sub =
    component != null ? parseDateToLongDateString(component.date) : '';

  return ogTemplate({ title, sub });
}
