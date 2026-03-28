import { PATHS } from '@/app/_utils/constants/paths.constants';
import { getAllUpdates, type Update } from '@/app/_utils/content';
import {
  parseDateToString,
  sortArrayByDateDesc,
} from '@/app/_utils/helpers/date.helpers';
import { css } from 'ds/css';
import { flex } from 'ds/patterns';
import { link } from 'ds/recipes';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '../_components/prose-layout';

const title = 'Now';
const description = 'A snapshot of my life via short updates.';
const url = new URL(`${PATHS.base}${PATHS.now}`);

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

export default function Now() {
  const updates = sortArrayByDateDesc(getAllUpdates());

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
          {updates.map((update) => {
            return <UpdateItem key={update.slug} update={update} />;
          })}
        </div>
      </ProseLayoutContent>
    </ProseLayout>
  );
}

interface UpdateItemProps {
  update: Update;
}

async function UpdateItem({ update }: UpdateItemProps) {
  const { slug, date } = update;
  const fancyDate = parseDateToString(date);
  const { default: Content } = (await import(`@/data/updates/${slug}.mdx`)) as {
    default: () => React.ReactNode;
  };

  return (
    <div
      className={css({
        pt: 'm',
        borderTop: '1px dashed',
        borderColor: 'slate6',
        _firstOfType: {
          pt: 'none',
          borderTop: 'none',
        },
      })}
    >
      <Content />
      <Link
        href={`${PATHS.now}/${slug}`}
        className={link({ color: 'secondary' })}
      >
        <time
          dateTime={date}
          className={css({
            display: 'inline-flex',
            pb: 'xl',
            fontSize: '1',
            color: 'inherit',
          })}
        >
          {fancyDate}
        </time>
      </Link>
    </div>
  );
}
