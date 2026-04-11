import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '@/app/_components/prose-layout';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import { getAllNotes, type Note } from '@/app/_utils/content';
import {
  parseDateToString,
  sortArrayByDateDesc,
} from '@/app/_utils/helpers/date.helpers';
import { css } from 'ds/css';
import { flex } from 'ds/patterns';
import { link } from 'ds/recipes';
import { Metadata } from 'next';
import Link from 'next/link';

const title = 'Notes';
const description = 'A snapshot of my life via short updates.';
const url = new URL(`${PATHS.base}${PATHS.notes}`);

export const metadata: Metadata = {
  title,
  description,
  robots: 'follow, index',
  openGraph: {
    url,
    type: 'website',
    locale: 'en_US',
    title,
    description,
  },
};

export default function Notes() {
  const notes = sortArrayByDateDesc(getAllNotes());

  return (
    <ProseLayout>
      <ProseLayoutHeader
        headline={title}
        description={description}
        backTo={{
          hasLink: true,
          content: 'Back to home',
          href: PATHS.home,
        }}
      />
      <ProseLayoutContent>
        <div className={flex({ direction: 'column' })}>
          {notes.map((note) => {
            return <NoteItem key={note.slug} note={note} />;
          })}
        </div>
      </ProseLayoutContent>
    </ProseLayout>
  );
}

interface NoteItemProps {
  note: Note;
}

async function NoteItem({ note }: NoteItemProps) {
  const { slug, date } = note;
  const fancyDate = parseDateToString(date);
  const { default: Content } = (await import(`@/data/notes/${slug}.mdx`)) as {
    default: () => React.ReactNode;
  };

  return (
    <div
      className={css({
        pt: 'xl',
        pb: 'm',
        borderTop: '1px dashed',
        borderTopColor: 'slate6',
        _firstOfType: {
          pt: 'none',
          borderTop: 'none',
        },
      })}
    >
      <Link
        href={`${PATHS.notes}/${slug}`}
        className={link({ color: 'secondary' })}
      >
        <time
          dateTime={date}
          className={css({
            display: 'inline-flex',
            pb: 's',
            fontSize: '0',
            color: 'inherit',
            fontFamily: 'mono',
          })}
        >
          {fancyDate}
        </time>
      </Link>
      <Content />
    </div>
  );
}
