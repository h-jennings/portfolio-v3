import { text } from '@/styles/primitives/text.css';
import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '@components/common/ProseLayout';
import { MDX_ELEMENTS } from '@utils/common/constants/mdx.constants';
import { PATHS } from '@utils/common/constants/paths.constants';
import {
  parseDateToLongDateString,
  parseDateToString,
} from '@utils/common/helpers/date.helpers';
import { allUpdates, Update } from 'contentlayer/generated';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { NextSeo, NextSeoProps } from 'next-seo';

type UpdateProps = InferGetStaticPropsType<typeof getStaticProps>;

const Update = ({ update }: UpdateProps) => {
  const { body, date } = update;
  const fancyDate = parseDateToLongDateString(date);
  const headline = `Now: ${parseDateToString(date)}`;
  const MDXContent = useMDXComponent(body.code);
  const url = `${PATHS.base}${PATHS.now}/${update.slug}`;
  const title = headline;
  const description = `A snapshot of my life—${fancyDate}.`;

  const SEO: NextSeoProps = {
    title,
    description,
    canonical: url,
    openGraph: {
      title,
      url,
      description,
      article: {
        publishedTime: date,
      },
      images: [
        {
          url: `${PATHS.og}?title=Now&subtitle=${description}`,
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
            content: 'Back to now',
            href: PATHS.now,
          }}
        />

        <ProseLayoutContent>
          <MDXContent components={MDX_ELEMENTS} />
          <time dateTime={date} className={text({ color: '2', size: '1' })}>
            {fancyDate}
          </time>
        </ProseLayoutContent>
      </ProseLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allUpdates.map((update) => {
    const { slug } = update;
    return {
      params: { update: slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ update: Update }> = ({
  params,
}) => {
  const slug = params?.update;

  if (!slug || Array.isArray(slug)) {
    return {
      notFound: true,
    };
  }

  const update = allUpdates.find((update) => update.slug === slug);

  if (!update) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      update,
    },
  };
};

export default Update;
