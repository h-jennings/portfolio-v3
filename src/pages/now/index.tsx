import { link } from '@/styles/elements/link.css';
import * as s from '@/styles/pages/now.css';
import { text } from '@/styles/primitives/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '@components/common/ProseLayout';
import { MDX_ELEMENTS } from '@utils/common/constants/mdx.constants';
import { PATHS } from '@utils/common/constants/paths.constants';
import {
  parseDateToString,
  sortArrayByDateDesc,
} from '@utils/common/helpers/date.helpers';
import clsx from 'clsx';
import { allUpdates, Update } from 'contentlayer/generated';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { NextSeo, NextSeoProps } from 'next-seo';
import Link from 'next/link';

type NowProps = InferGetStaticPropsType<typeof getStaticProps>;

const Now = ({ updates }: NowProps) => {
  const title = 'Now';
  const description = 'A snapshot of my life via short updates.';
  const url = `${PATHS.base}${PATHS.now}`;

  const SEO: NextSeoProps = {
    title,
    canonical: url,
    description,
    openGraph: {
      title,
      url,
      description,
      images: [
        {
          url: `${PATHS.og}?title=${title}&subtitle=${description}`,
        },
      ],
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <ProseLayout>
        <ProseLayoutHeader
          backTo={{
            hasLink: true,
            content: 'Back to home',
            href: PATHS.home,
          }}
          headline={title}
          description={description}
        ></ProseLayoutHeader>
        <ProseLayoutContent>
          <div className={s.updatesWrapper}>
            {updates.map((update) => {
              return <Update key={update._id} update={update} />;
            })}
          </div>
        </ProseLayoutContent>
      </ProseLayout>
    </>
  );
};

interface UpdateProps {
  update: Update;
}
const Update = ({ update }: UpdateProps) => {
  const { body, date } = update;
  const MDXContent = useMDXComponent(body.code);
  const fancyDate = parseDateToString(date);

  return (
    <div className={s.update}>
      <MDXContent components={MDX_ELEMENTS} />
      <Link
        href={`${PATHS.now}/${update.slug}`}
        className={link({ color: '2' })}
      >
        <time
          dateTime={date}
          className={clsx(
            sprinkles({ display: 'inline-flex', paddingBottom: 'xl' }),
            text({ size: '1' }),
          )}
          style={{ color: 'inherit' }}
        >
          {fancyDate}
        </time>
      </Link>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  updates: Update[];
}> = () => {
  const updates = sortArrayByDateDesc(allUpdates);

  return {
    props: {
      updates,
    },
  };
};

export default Now;
