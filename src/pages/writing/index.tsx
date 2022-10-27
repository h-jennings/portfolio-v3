import { flex } from '@/styles/elements/flex.css';
import { stack } from '@/styles/elements/stack.css';
import { pageHeader, text } from '@/styles/elements/text.css';
import * as s from '@/styles/pages/writing.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { BackToLink } from '@components/common/BackToLink';
import { LinkBox } from '@components/common/LinkBox/LinkBox';
import { Seo } from '@components/common/Seo';
import { PATHS } from '@utils/common/constants/paths.constants';
import {
  groupDatesByYear,
  sortMdxDataByDateDesc,
} from '@utils/common/helpers/date.helpers';
import { MdxData } from '@utils/common/types/mdx-data';
import clsx from 'clsx';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getWritings } from '../api/writings';

const Writings = ({
  writingsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const featured = writingsData.filter((data) =>
    Boolean(data.metaData.featured),
  );
  const hasWritings = writingsData.length > 0;
  const hasFeaturedWritings = featured.length > 0;
  const groupedWritings = groupDatesByYear(writingsData);

  return (
    <>
      <Seo
        title='Writing'
        url={`${PATHS.base}${PATHS.writing}`}
        description='Thoughts on software, books, life, and any opinions I have at a moment in time.'
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
                {featured.map(({ fileName, metaData }) => {
                  const slug = fileName.replace(/\.mdx?$/, '');

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
                              {metaData.title}
                            </p>
                          </LinkBox.Target>
                          <p
                            className={clsx(
                              sprinkles({ paddingTop: '3xs' }),
                              text({ size: 1, color: 2 }),
                            )}
                          >
                            {metaData.description}
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
                        {writings.map(({ fileName, metaData }) => {
                          const slug = fileName.replace(/\.mdx?$/, '');

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
                                    <p className={text({ size: 1 })}>
                                      {metaData.title}
                                    </p>
                                  </LinkBox.Target>
                                  <p className={text({ size: 1, color: 2 })}>
                                    {metaData.publishDate}
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
  writingsData: MdxData[];
}> = () => {
  const writings = getWritings();
  const writingsData = sortMdxDataByDateDesc(writings).filter(
    (data) => data.metaData.status === 'published',
  );
  return {
    props: {
      writingsData,
    },
  };
};

export default Writings;
