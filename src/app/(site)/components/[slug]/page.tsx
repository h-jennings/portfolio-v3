import { BackToLink } from '@/app/_components/back-to-link';
import {
  ProseLayout,
  ProseLayoutContent,
} from '@/app/_components/prose-layout';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import { getAllComponents } from '@/app/_utils/content';
import { css } from 'ds/css';
import { stack } from 'ds/patterns';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const generateStaticParams = () => {
  return getAllComponents().map((c) => ({ slug: c.slug }));
};

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const component = getAllComponents().find((c) => c.slug === params.slug);

  if (component == null) {
    return {};
  }

  const { title, description, date } = component;
  const url = new URL(`${PATHS.base}${PATHS.components}/${component.slug}`);

  return {
    title,
    description,
    openGraph: {
      url,
      type: 'article',
      locale: 'en_US',
      title,
      description,
      publishedTime: date,
    },
  };
};

export default async function ComponentPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const component = getAllComponents().find((c) => c.slug === params.slug);

  if (component == null) {
    return notFound();
  }

  const { default: Content } = (await import(
    `@/data/components/${params.slug}.mdx`
  )) as { default: () => React.ReactNode };
  const { title, description } = component;

  return (
    <ProseLayout>
      <ProseLayoutContent>
        <BackToLink href={PATHS.components}>Back to components</BackToLink>
        <div className={stack({ gap: 'xl' })}>
          <div className={stack({ gap: 'm' })}>
            {title != null && (
              <h1
                className={css({ textStyle: 'heading' })}
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                {title}
              </h1>
            )}
            {description != null && (
              <p
                className={css({
                  textStyle: 'base',
                  fontSize: '1',
                  lineHeight: 'body',
                  textWrap: 'balance',
                  color: 'text2',
                })}
              >
                {description}
              </p>
            )}
          </div>
          <div>
            <Content />
          </div>
        </div>
      </ProseLayoutContent>
    </ProseLayout>
  );
}
