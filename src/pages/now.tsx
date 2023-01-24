import { stack } from '@/styles/primitives/stack.css';
import { text } from '@/styles/primitives/text.css';
import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '@components/common/ProseLayout';
import { MDX_ELEMENTS } from '@utils/common/constants/mdx.constants';
import { PATHS } from '@utils/common/constants/paths.constants';
import { parseDateToString } from '@utils/common/helpers/date.helpers';
import { allNows, Now } from 'contentlayer/generated';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { NextSeo, NextSeoProps } from 'next-seo';

const Now = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title, description, date, body, slug } = data;

  const url = `${PATHS.base}/${slug}}`;

  const SEO: NextSeoProps = {
    title,
    canonical: url,
    description,
    openGraph: {
      title,
      url,
      article: {
        publishedTime: date,
      },
      description,
      images: [
        {
          url: `${PATHS.og}?title=${title}&subtitle=${description}`,
        },
      ],
    },
  };

  const MDXContent = useMDXComponent(body.code);

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
        >
          <div className={stack({ gap: '3xs' })}>
            <span className={text({ size: 1, color: 2 })}>Last Updated</span>
            <span className={text({ size: 1 })}>{parseDateToString(date)}</span>
          </div>
        </ProseLayoutHeader>
        <ProseLayoutContent>
          <MDXContent components={MDX_ELEMENTS} />
        </ProseLayoutContent>
      </ProseLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  data: Now;
}> = () => {
  const data = allNows[0];

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};

export default Now;
