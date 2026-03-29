import ArrowRightIcon from '@/app/_components/icons/ArrowRightIcon';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import { getAllProjects, getAllWritings } from '@/app/_utils/content';
import {
  parseDateToLongDateString,
  sortArrayByDateDesc,
} from '@/app/_utils/helpers/date.helpers';
import { css, cx } from 'ds/css';
import { flex, grid, hstack, stack } from 'ds/patterns';
import { link } from 'ds/recipes';
import { token } from 'ds/tokens';
import Link from 'next/link';

import { ProjectCard } from './_components/project-card';
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
import { VisuallyHiddenRoot } from './_components/visually-hidden';

export default function Home() {
  return (
    <div>
      <VisuallyHiddenRoot>
        <h1>Home</h1>
      </VisuallyHiddenRoot>
      <div className={stack({ gap: '3xl' })}>
        <IntroductionSection />
        <ExperienceSection />
        <WorkSection>
          <ProjectGrid />
        </WorkSection>
        <WritingsSection />
        <ConnectSection />
      </div>
    </div>
  );
}

const IntroductionSection = () => {
  return (
    <section className={stack({ gap: 'm' })}>
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
        UI engineer comfortable working across the stack, with a passion for
        crafting polished interfaces and designs that scale.
      </p>
    </section>
  );
};

const ExperienceSection = () => {
  return (
    <section className={stack({ gap: 'm' })}>
      <h2 className={css({ textStyle: 'base', lineHeight: 'tight' })}>
        Experience
      </h2>
      <p className={css({ textStyle: 'body' })}>
        My experience spans a variety of team sizes, industries, and technical
        challenges, giving me a broad perspective on what it takes to build and
        ship great products.
      </p>
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

const ProjectGrid = () => {
  const projects = getAllProjects(3);

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
              <div key={project.slug} className={cardWrapper}>
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

const cardWrapper = css({
  minW: { base: '90%', bp1: '45%', bp2: '220px' },
  ml: 's',
  _firstOfType: { ml: 'none' },
});

const WritingsSection = () => {
  const writings = sortArrayByDateDesc(getAllWritings());
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
        {writings.map(({ slug, title, date }) => {
          return (
            <li
              className={cx(stack({ gap: '3xs' }), writingsListItem)}
              key={slug}
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
          I&apos;m currently exploring new opportunities. If you&apos;re working
          on something interesting, let&apos;s talk.
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
