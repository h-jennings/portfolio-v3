import * as React from 'react';
import {
  parseDateToLongDateString,
  sortArrayByDateDesc,
} from '@/app/_utils/helpers/date.helpers';
import { allWritings } from 'contentlayer/generated';
import { VisuallyHiddenRoot } from './_components/visually-hidden';
import { flex, grid, hstack, stack } from 'ds/patterns';
import { css, cx } from 'ds/css';
import Link from 'next/link';
import { link } from 'ds/recipes';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import { token } from 'ds/tokens';
import ArrowRightIcon from '@/app/_components/icons/ArrowRightIcon';
import { getProjects } from './_utils/helpers/projects.helpers';
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  barStyles,
  rootStyles,
  thumbStyles,
  viewportStyles,
} from './_components/scroll-area';
import { ProjectCard, ProjectCardLoadingUI } from './_components/project-card';

export default function Home() {
  return (
    <div>
      <VisuallyHiddenRoot>
        <h1>Home</h1>
      </VisuallyHiddenRoot>
      <div className={stack({ gap: '3xl' })}>
        <IntroductionSection />
        <WorkSection>
          <React.Suspense fallback={<ProjectGridLoadingUI />}>
            <ProjectGrid />
          </React.Suspense>
        </WorkSection>
        <WritingsSection />
        <ConnectSection />
      </div>
    </div>
  );
}

const IntroductionSection = () => {
  return (
    <section className={stack({ gap: 'xl' })}>
      <div className={stack({ gap: 'm' })}>
        <h2
          className={css({
            textStyle: 'serif',
            lineHeight: 'tight',
          })}
          aria-label='Who is Hunter Jennings'
        >
          Hunter Jennings
        </h2>
        <p className={css({ textStyle: 'base' })}>
          User interface engineer interested in design systems, component
          architectures, TypeScript, and React.
        </p>
      </div>
      <div className={stack({ gap: 'xs' })}>
        <h2
          className={css({ textStyle: 'base', color: 'text2', fontSize: '1' })}
          aria-label="What I'm up to now"
        >
          Now
        </h2>
        <p className={css({ textStyle: 'base' })}>
          Currently working as a Senior Frontend Developer for a social venture
          education start-up&mdash;
          <Link
            className={link({ underline: true, color: 'accent' })}
            href={PATHS.breakline}
          >
            Breakline
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

const WorkSection = ({ children }: { children?: React.ReactNode }) => {
  return (
    <section className={stack({ gap: 's' })}>
      <div className={flex({ justify: 'space-between', align: 'center' })}>
        <h2 className={css({ textStyle: 'base', lineHeight: 'tight' })}>
          Selected work
        </h2>
        <ArrowLink href={PATHS.work}>view all</ArrowLink>
      </div>
      {children}
    </section>
  );
};

const ProjectGrid = async () => {
  const { projects } = await getProjects(3);

  return (
    <ScrollAreaRoot className={rootStyles}>
      <ScrollAreaScrollbar className={barStyles} orientation='horizontal'>
        <ScrollAreaThumb className={thumbStyles} />
      </ScrollAreaScrollbar>
      <ScrollAreaViewport className={viewportStyles}>
        <div
          className={flex({
            mb: 'l',
            wrap: 'nowrap',
            direction: 'row',
          })}
        >
          {projects.map((project) => {
            return (
              <div key={project.id} className={cardWrapper}>
                <ProjectCard
                  project={project}
                  sizes='(max-width: 590px) 90vw, (max-width: 767px) 45vw, 220px'
                />
              </div>
            );
          })}
        </div>
      </ScrollAreaViewport>
    </ScrollAreaRoot>
  );
};

const ProjectGridLoadingUI = () => {
  return (
    <div
      className={flex({
        mb: 'l',
        wrap: 'nowrap',
        direction: 'row',
        overflow: 'hidden',
      })}
    >
      {Array.from({ length: 3 }, (_, i) => {
        return (
          <div key={i} className={cardWrapper}>
            <ProjectCardLoadingUI />
          </div>
        );
      })}
    </div>
  );
};

const cardWrapper = css({
  minW: { base: '90%', bp1: '45%', bp2: '220px' },
  ml: 's',
  _firstOfType: { ml: 'none' },
});

const WritingsSection = () => {
  const writings = sortArrayByDateDesc(allWritings);
  const hasWritings = writings.length > 0;

  if (!hasWritings) return null;

  return (
    <section className={stack({ gap: 'm' })}>
      <div className={flex({ justify: 'space-between', align: 'center' })}>
        <h2 className={css({ textStyle: 'base', lineHeight: 'tight' })}>
          Writing
        </h2>
        <ArrowLink href={PATHS.writing}>view all</ArrowLink>
      </div>
      <ul className={stack({ gap: 'm' })}>
        {writings.map(({ _id, slug, title, date }) => {
          return (
            <li
              className={cx(stack({ gap: '3xs' }), writingsListItem)}
              key={_id}
            >
              <div>
                <Link
                  href={`${PATHS.writing}/${slug}`}
                  className={cx(link(), css({ fontSize: '1' }))}
                >
                  {title}
                </Link>
              </div>
              <time
                className={css({
                  textStyle: 'serif',
                  fontSize: '1',
                })}
              >
                {parseDateToLongDateString(date)}
              </time>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const writingsListItem = css({
  pos: 'relative',
  _after: {
    content: '" "',
    w: 'full',
    h: 0,
    borderTop: '1px dashed',
    borderColor: 'slate8',
    pos: 'absolute',
    bottom: 'calc((var(--spacing-m) / 2) * -1)',
    left: 0,
  },
});

const ArrowLink = ({
  href,
  children,
}: React.PropsWithChildren<{ href: string }>) => {
  return (
    <div className={hstack()}>
      <Link
        href={href}
        className={cx(
          link({
            color: 'secondary',
          }),
          css({ fontSize: '1', lineHeight: 'tight' }),
        )}
        style={{ display: 'block' }}
      >
        {children}
      </Link>
      <ArrowRightIcon aria-hidden color={token('colors.slate11')} />
    </div>
  );
};

const ConnectSection = () => {
  return (
    <section className={stack({ gap: 'm' })}>
      <h2 className={css({ textStyle: 'base', lineHeight: 'tight' })}>
        Connect
      </h2>
      <div className={stack({ gap: 'xl' })}>
        <p className={css({ textStyle: 'body' })}>
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
    <li className={grid({ columns: 3, alignItems: 'center', gap: 's' })}>
      <h3
        className={css({
          textStyle: 'base',
          fontSize: '1',
          lineHeight: 'tight',
        })}
      >
        {label}
      </h3>
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
      className={cx(
        link({
          color: 'secondary',
        }),
        css({ display: 'inline-block', lineHeight: 'tight', fontSize: '1' }),
      )}
      href={href}
    >
      {children}
    </Link>
  );
};
