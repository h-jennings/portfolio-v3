import { getAllNotes } from '@/app/_utils/content';
import { parseDateToLongDateString } from '@/app/_utils/helpers/date.helpers';
import { ogTemplate } from '@/app/_utils/og-template';

export const alt = 'Note';

export default async function Image(props: {
  params: Promise<{ note: string }>;
}) {
  const params = await props.params;
  const note = getAllNotes().find((n) => n.slug === params.note);
  const title = 'Note';
  const sub = note != null ? parseDateToLongDateString(note.date) : '';

  return ogTemplate({ title, sub });
}
