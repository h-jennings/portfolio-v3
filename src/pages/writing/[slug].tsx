import { stack } from '@/styles/primitives/stack.css';
import { text } from '@/styles/primitives/text.css';
import { ImageContainer } from '@components/common/ImageContainer';
import {
  ProseLayout,
  ProseLayoutContent,
  ProseLayoutHeader,
} from '@components/common/ProseLayout';
import { Separator } from '@components/common/Separator/Separator';
import { Theme } from '@components/common/ThemeToggle/ThemeToggle';
import Giscus from '@giscus/react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { MDX_ELEMENTS } from '@utils/common/constants/mdx.constants';
import { PATHS } from '@utils/common/constants/paths.constants';
import { parseDateToString } from '@utils/common/helpers/date.helpers';
import { allWritings, Writing } from 'contentlayer/generated';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { NextSeo, NextSeoProps } from 'next-seo';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const Writing = ({
  writing,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title, description, date, body, slug, readingTime } = writing;
  const { theme } = useTheme();

  const url = `${PATHS.base}${PATHS.writing}/${slug}`;
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
            content: 'Back to writing',
            href: PATHS.writing,
          }}
          headline={title}
          description={description}
        >
          <div
            className={stack({
              justify: 'left',
              gap: 'xl',
              orientation: 'horizontal',
            })}
          >
            <div className={stack({ gap: '3xs' })}>
              <span className={text({ size: '1', color: '2' })}>Published</span>
              <span className={text({ size: '1' })}>
                {parseDateToString(date)}
              </span>
            </div>
            <div className={stack({ gap: '3xs' })}>
              <span className={text({ size: '1', color: '2' })}>
                Reading Time
              </span>
              <span className={text({ size: '1' })}>{readingTime}</span>
            </div>
          </div>
        </ProseLayoutHeader>
        <ProseLayoutContent>
          <MDXContent components={{ ...MDX_ELEMENTS, ...MDX_COMPONENTS }} />
          <div>
            <Separator />
            <div>
              <Giscus
                repo='h-jennings/portfolio-v3'
                mapping='pathname'
                repoId='MDEwOlJlcG9zaXRvcnk0MDgyNjE5NzM='
                category='Comment'
                categoryId='DIC_kwDOGFWVVc4CUphe'
                strict='0'
                reactionsEnabled='1'
                emitMetadata='0'
                inputPosition='top'
                theme={THEME_LOOKUP[theme as Theme]}
                loading='lazy'
                lang='en'
              />
            </div>
          </div>
        </ProseLayoutContent>
      </ProseLayout>
    </>
  );
};

const MDX_COMPONENTS = {
  Image,
  ImageContainer,
  AspectRatio,
} as const;

export const getStaticPaths: GetStaticPaths<{ slug: string }> = () => {
  const paths = allWritings.map((writing) => {
    return {
      params: {
        slug: writing.slug,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{
  writing: Writing;
}> = ({ params }) => {
  const { slug } = params!;
  const writing = allWritings.find((writing) => writing.slug === slug);

  if (!writing) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      writing,
    },
  };
};

const THEME_LOOKUP = {
  light: 'light',
  dark: 'dark',
  system: 'preferred_color_scheme',
} as const;

export default Writing;
