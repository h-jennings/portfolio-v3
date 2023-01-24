import * as s from '@/styles/pages/writing.css';
import { flex } from '@/styles/primitives/flex.css';
import { stack } from '@/styles/primitives/stack.css';
import { pageHeader, text } from '@/styles/primitives/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { BackToLink } from '@components/common/BackToLink';
import { LinkBox } from '@components/common/LinkBox/LinkBox';
import { Seo } from '@components/common/Seo';
import { PATHS } from '@utils/common/constants/paths.constants';
import {
  addYearToWritings,
  groupDatesByYear,
  parseDateToString,
} from '@utils/common/helpers/date.helpers';
import clsx from 'clsx';
import { allWritings, Writing } from 'contentlayer/generated';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

const Writings = ({
  writings,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const featuredWritings = writings.filter(({ featured }) => {
    return featured;
  });
  const hasWritings = writings.length > 0;
  const hasFeaturedWritings = writings.some((writing) => writing.featured);
  const groupedWritings = groupDatesByYear(addYearToWritings(writings));
  const title = 'Writing';
  const description =
    'Thoughts on software, books, life, and any opinions I have at a moment in time.';

  return (
    <>
      <Seo
        title={title}
        url={`${PATHS.base}${PATHS.writing}`}
        description={description}
        image={`${PATHS.og}?title=${title}&subtitle=${description}`}
      />
      <div className={sprinkles({ width: 'full' })}>
        <div className={stack({ gap: 'xl' })}>
          <div>
            <BackToLink href={PATHS.home}>Back to home</BackToLink>
            <h1 className={pageHeader}>Writing</h1>
          </div>
          {hasFeaturedWritings ? (
            <div className={stack({ gap: 'm' })}>
              <h2 className={text({ size: 2, leading: 'tight' })}>Featured</h2>
              <ul className={stack({ gap: 's' })}>
                {featuredWritings.map(({ slug, title, description }) => {
                  return (
                    <li key={slug}>
                      <LinkBox.Root>
                        <div
                          className={sprinkles({
                            padding: 's',
                            borderRadius: 'card',
                            backgroundColor: 'slate3',
                          })}
                        >
                          <LinkBox.Target
                            href={`${PATHS.writing}/[slug]`}
                            as={`${PATHS.writing}/${slug}`}
                          >
                            <p
                              className={text({ size: 1 })}
                              style={{ display: 'inline-block' }}
                            >
                              {title}
                            </p>
                          </LinkBox.Target>
                          <p
                            className={clsx(
                              sprinkles({ paddingTop: '3xs' }),
                              text({ size: 1, color: 2 }),
                            )}
                          >
                            {description}
                          </p>
                        </div>
                      </LinkBox.Root>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          {hasWritings ? (
            <div className={stack({ gap: 'm' })}>
              <h2 className={text({ size: 2, leading: 'tight' })}>
                All Writing
              </h2>
              <ul className={stack({ gap: 'm' })}>
                {groupedWritings.map(({ year, writings }) => {
                  writings.map(({}) => null);
                  return (
                    <li
                      className={sprinkles({ position: 'relative' })}
                      key={year}
                    >
                      <h3
                        className={clsx(
                          text({ size: 1, color: 2 }),
                          s.yearTitle,
                        )}
                      >
                        {year}
                      </h3>
                      <ul className={stack({ gap: 'xs' })}>
                        {writings.map(({ slug, title, date }) => {
                          return (
                            <li key={slug}>
                              <LinkBox.Root>
                                <div
                                  className={flex({
                                    direction: 'row',
                                    align: 'baseline',
                                    justify: 'between',
                                    gap: 's',
                                  })}
                                >
                                  <LinkBox.Target
                                    href={`${PATHS.writing}/[slug]`}
                                    as={`${PATHS.writing}/${slug}`}
                                  >
                                    <p className={text({ size: 1 })}>{title}</p>
                                  </LinkBox.Target>
                                  <p className={text({ size: 1, color: 2 })}>
                                    {parseDateToString(date)}
                                  </p>
                                </div>
                              </LinkBox.Root>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p className={text()}>No writings to display (yet!).</p>
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  writings: Writing[];
}> = () => {
  return {
    props: {
      writings: allWritings,
    },
  };
};

export default Writings;
