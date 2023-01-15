import { GetWritingsQuery } from '@/graphql/generated/types.generated';
import {
  projectsFetcher,
  QUERY_KEY as PROJECTS_QUERY_KEY,
} from '@/graphql/queries/get-projects';
import {
  QUERY_KEY as WRITINGS_QUERY_KEY,
  useGetWritingsQuery,
  writingsFetcher,
} from '@/graphql/queries/get-writings';
import { ds } from '@/styles/ds.css';
import { link } from '@/styles/elements/link.css';
import * as s from '@/styles/pages/index.css';
import { flex } from '@/styles/primitives/flex.css';
import { stack } from '@/styles/primitives/stack.css';
import { bodyText, text } from '@/styles/primitives/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { ArrowRightIcon } from '@components/common/icons/ArrowRightIcon';
import { ProjectGrid } from '@components/home/ProjectGrid/ProjectGrid';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { PATHS } from '@utils/common/constants/paths.constants';
import {
  parseDateToLongDateString,
  sortWritingsDataByDateDesc,
} from '@utils/common/helpers/date.helpers';
import clsx from 'clsx';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import * as React from 'react';

const Index = ({
  count,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: writingsData } = useGetWritingsQuery(preview);
  const { writings } = writingsData ?? {};
  const featuredWritings = React.useMemo(
    () => sortWritingsDataByDateDesc(writings?.filter((w) => w.featured)),
    [writings],
  );

  return (
    <>
      <NextSeo
        title='Home'
        openGraph={{
          title: 'Home',
        }}
      />
      <VisuallyHidden.Root>
        <h1>Home</h1>
      </VisuallyHidden.Root>
      <div className={stack({ gap: '3xl' })}>
        <IntroductionSection />
        <WorkSection preview={preview} count={count} />
        <WritingsSection writings={featuredWritings} />
        <ConnectSection />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  count: number;
  preview: boolean;
}> = async ({ preview = false }) => {
  const PROJECT_COUNT = 3;
  const qc = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  // Prefetching projects
  await qc.prefetchQuery({
    queryKey: [PROJECTS_QUERY_KEY, { count: PROJECT_COUNT }],
    queryFn: projectsFetcher(preview, { count: PROJECT_COUNT }),
  });

  // Prefetching writings
  await qc.prefetchQuery({
    queryKey: [WRITINGS_QUERY_KEY],
    queryFn: writingsFetcher(preview),
  });

  return {
    props: {
      dehydratedState: dehydrate(qc),
      count: PROJECT_COUNT,
      preview,
    },
  };
};

const IntroductionSection = () => {
  return (
    <section className={stack({ gap: 'xl' })}>
      <div className={stack({ gap: 'm' })}>
        <h2
          className={text({
            size: 2,
            family: 'serif',
            leading: 'tight',
          })}
          aria-label='Who is Hunter Jennings'
        >
          Hunter Jennings
        </h2>
        <p className={bodyText} style={{ maxWidth: 600 }}>
          Frontend ui engineer interested in design systems, component
          architectures, and React.
        </p>
      </div>
      <div className={stack({ gap: 'xs' })}>
        <h2
          className={text({ color: 2, size: 1 })}
          aria-label="What I'm up to now"
        >
          Now
        </h2>
        <p className={bodyText}>
          Currently working as a Frontend Developer for the award-winning
          digital creative agency&mdash;
          <Link
            className={link({ underline: 'whileHover', color: 3 })}
            href={PATHS.seagulls}
          >
            Elegant Seagulls
          </Link>
          .
        </p>
        <p className={bodyText}>
          Other stuff I&apos;m working on{' '}
          <Link
            className={link({ underline: true, color: 2 })}
            data-cy='now-link'
            href={PATHS.now}
          >
            now
          </Link>
        </p>
      </div>
    </section>
  );
};

const WorkSection = ({
  count,
  preview,
}: {
  count: number;
  preview: boolean;
}) => {
  return (
    <section className={stack({ gap: 's' })}>
      <div className={flex({ justify: 'between', align: 'center' })}>
        <h2 className={text({ leading: 'tight' })}>Selected work</h2>
        <ArrowLink href={PATHS.work}>view all</ArrowLink>
      </div>
      <ProjectGrid preview={preview} count={count} />
    </section>
  );
};

interface WritingsSectionProps {
  writings: GetWritingsQuery['writings'] | undefined;
}

const WritingsSection = ({ writings }: WritingsSectionProps) => {
  const hasWritings = writings && writings.length > 0;

  if (!hasWritings) return null;

  return (
    <section className={stack({ gap: 'm' })}>
      <div className={flex({ justify: 'between', align: 'center' })}>
        <h2 className={text({ leading: 'tight' })}>Writing</h2>
        <ArrowLink href={PATHS.writing}>view all</ArrowLink>
      </div>
      <ul className={stack({ gap: 'm' })}>
        {writings.map(({ id, slug, title, datePublished }) => {
          return (
            <li
              className={clsx(stack({ gap: '3xs' }), s.writings.listItem)}
              key={id}
            >
              <div>
                <Link
                  href={`${PATHS.writing}/[slug]`}
                  as={`${PATHS.writing}/${slug}`}
                  className={link({ size: 1 })}
                >
                  {title}
                </Link>
              </div>
              <time className={text({ size: 1, family: 'serif' })}>
                {parseDateToLongDateString(datePublished as string)}
              </time>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const ArrowLink = ({
  href,
  children,
}: React.PropsWithChildren<{ href: string }>) => {
  return (
    <div className={s.arrowLink.root}>
      <Link
        href={href}
        className={link({
          color: 2,
          size: 1,
          leading: 'tight',
        })}
        style={{ display: 'block' }}
      >
        {children}
      </Link>
      <ArrowRightIcon aria-hidden color={ds.theme.colors.slate11} />
    </div>
  );
};

const ConnectSection = () => {
  return (
    <section className={stack({ gap: 'm' })}>
      <h2 className={text({ leading: 'tight' })}>Connect</h2>
      <div className={stack({ gap: 'xl' })}>
        <p className={bodyText}>
          I&apos;m not currently looking for new opportunities, but feel free to
          reach out if you&apos;d like. I&apos;m always happy to hear from folks
          and talk shop.
        </p>
        <ul className={stack({ gap: 's' })}>
          <ConnectLinkListItem label='Twitter'>
            <ConnectListLink href={PATHS.twitter}>
              @jennings_hunter
            </ConnectListLink>
          </ConnectLinkListItem>
          <ConnectLinkListItem label='Email'>
            <ConnectListLink href={PATHS.email}>
              jenningsdhunter@gmail.com
            </ConnectListLink>
          </ConnectLinkListItem>
          <ConnectLinkListItem label='Github'>
            <ConnectListLink href={PATHS.github}>h-jennings</ConnectListLink>
          </ConnectLinkListItem>
          <ConnectLinkListItem label='Resume'>
            <ConnectListLink href={PATHS.cv}>
              read.cv/hunterjennings
            </ConnectListLink>
          </ConnectLinkListItem>
        </ul>
      </div>
    </section>
  );
};

interface ConnectLinkListItemProps {
  label: string;
}

const ConnectLinkListItem = ({
  label,
  children,
}: React.PropsWithChildren<ConnectLinkListItemProps>) => {
  return (
    <li className={s.connectLinkListItem.root}>
      <h3 className={text({ size: 1, leading: 'tight' })}>{label}</h3>
      <div style={{ gridColumn: '2 / span 2' }}>
        <div>{children}</div>
      </div>
    </li>
  );
};

const ConnectListLink = ({
  children,
  href,
}: React.PropsWithChildren<{ href: string }>) => {
  return (
    <Link
      className={clsx(
        sprinkles({ display: 'inline-block' }),
        link({
          size: 1,
          color: 2,
          leading: 'tight',
        }),
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default Index;
