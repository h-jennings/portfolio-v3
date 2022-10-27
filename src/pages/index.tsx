import {
  GetProjectsDocument,
  GetProjectsQuery,
  GetProjectsQueryVariables,
} from '@/graphql/generated/types.generated';
import { spawnHygraphCMSClientInstance, withUrqlSSR } from '@/graphql/urql';
import { flex } from '@/styles/elements/flex.css';
import { link } from '@/styles/elements/link.css';
import { stack } from '@/styles/elements/stack.css';
import { bodyText, text } from '@/styles/elements/text.css';
import * as s from '@/styles/pages/index.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { CustomLink } from '@components/common/CustomLink';
import { ArrowRightIcon } from '@components/common/icons/ArrowRightIcon';
import { ProjectGrid } from '@components/home/ProjectGrid/ProjectGrid';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { PATHS } from '@utils/common/constants/paths.constants';
import {
  parseDateToLongDateString,
  sortMdxDataByDateDesc,
} from '@utils/common/helpers/date.helpers';
import { MdxData } from '@utils/common/types/mdx-data';
import clsx from 'clsx';
import type { GetStaticProps, InferGetStaticPropsType, PageConfig } from 'next';
import { NextSeo } from 'next-seo';
import * as React from 'react';
import { getWritings } from './api/writings';

const Index = ({
  featuredWritings,
  count,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
        <WorkSection count={count} />
        <WritingsSection writings={featuredWritings} />
        <ConnectSection />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  featuredWritings: MdxData[] | [];
  count: number;
}> = async ({ preview }) => {
  const { client, ssrCache } = spawnHygraphCMSClientInstance(preview);
  const PROJECT_COUNT = 3;

  await client
    ?.query<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, {
      count: PROJECT_COUNT,
    })
    .toPromise();
  const writings = getWritings();

  const writingsData = sortMdxDataByDateDesc(writings);

  const featuredWritings: MdxData[] | [] = writingsData
    .filter((writing) => writing.metaData.status !== 'draft')
    .filter((writing) => writing.metaData.featured);

  return {
    props: {
      urqlState: ssrCache.extractData(),
      count: PROJECT_COUNT,
      featuredWritings,
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
          <CustomLink
            className={link({ underline: 'whileHover', color: 3 })}
            href={PATHS.seagulls}
          >
            Elegant Seagulls
          </CustomLink>
          .
        </p>
        <p className={bodyText}>
          Other stuff I&apos;m working on{' '}
          <CustomLink
            className={link({ underline: true, color: 2 })}
            data-cy='now-link'
            href={PATHS.now}
          >
            now
          </CustomLink>
        </p>
      </div>
    </section>
  );
};

const WorkSection = ({ count }: { count: number }) => {
  return (
    <section className={stack({ gap: 's' })}>
      <div className={flex({ justify: 'between', align: 'center' })}>
        <h2 className={text({ leading: 'tight' })}>Selected work</h2>
        <ArrowLink href={PATHS.work}>view all</ArrowLink>
      </div>
      <ProjectGrid count={count} />
    </section>
  );
};

interface WritingsSectionProps {
  writings: MdxData[] | [];
}

const WritingsSection = ({ writings }: WritingsSectionProps) => {
  const hasWritings = writings.length > 0;

  if (!hasWritings) return null;

  return (
    <section className={stack({ gap: 'm' })}>
      <div className={flex({ justify: 'between', align: 'center' })}>
        <h2 className={text({ leading: 'tight' })}>Writing</h2>
        <ArrowLink href={PATHS.writing}>view all</ArrowLink>
      </div>
      <ul className={stack({ gap: 'm' })}>
        {writings.map(({ fileName, metaData }) => {
          return (
            <li
              className={clsx(stack({ gap: '3xs' }), s.writings.listItem)}
              key={fileName}
            >
              <div>
                <CustomLink
                  href={`${PATHS.writing}/[slug]`}
                  as={`${PATHS.writing}/${fileName.replace(/\.mdx?$/, '')}`}
                  className={link({ size: 1 })}
                >
                  {metaData.title}
                </CustomLink>
              </div>
              <time className={text({ size: 1, family: 'serif' })}>
                {parseDateToLongDateString(metaData.publishDate)}
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
      <CustomLink
        href={href}
        className={link({
          color: 2,
          size: 1,
          leading: 'tight',
        })}
        style={{ display: 'block' }}
      >
        {children}
      </CustomLink>
      <ArrowRightIcon aria-hidden color='var(--colors-slate11)' />
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
    <CustomLink
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
    </CustomLink>
  );
};

export const config: PageConfig = {
  unstable_includeFiles: ['../data/writings/**/*.mdx'],
};

export default withUrqlSSR(Index);
