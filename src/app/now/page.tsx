import { PATHS } from '@/app/_utils/constants/paths.constants';
import {
  parseDateToString,
  sortArrayByDateDesc,
} from '@/app/_utils/helpers/date.helpers';
import { Update, allUpdates } from 'contentlayer/generated';
import { Metadata } from 'next';
import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '../_components/prose-layout';
import { flex } from 'ds/patterns';
import Link from 'next/link';
import { link } from 'ds/recipes';
import { css } from 'ds/css';
import { UpdatePageMDX } from './[update]/update-page-mdx';

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
  const updates = sortArrayByDateDesc(allUpdates);

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
            return <Update key={update._id} update={update} />;
          })}
        </div>
      </ProseLayoutContent>
    </ProseLayout>
  );
}

interface UpdateProps {
  update: Update;
}
const Update = ({ update }: UpdateProps) => {
  const { body, date } = update;
  const fancyDate = parseDateToString(date);

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
      <UpdatePageMDX code={body.code} />
      <Link
        href={`${PATHS.now}/${update.slug}`}
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
};
