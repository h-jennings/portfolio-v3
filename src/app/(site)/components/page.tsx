import { ComponentPreview } from '@/app/_components/component-preview';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import { getAllComponents } from '@/app/_utils/content';
import { parseDateToLongDateString } from '@/app/_utils/helpers/date.helpers';
import { css } from 'ds/css';
import { flex, grid, stack } from 'ds/patterns';
import { Metadata } from 'next';
import Link from 'next/link';

const title = 'Components';
const description = 'Interactive snippets and techniques.';
const url = new URL(`${PATHS.base}${PATHS.components}`);

export const metadata: Metadata = {
  title,
  description,
  robots: 'follow, index',
  openGraph: {
    url,
    type: 'website',
    locale: 'en_US',
    title,
    description,
  },
};

export default function ComponentsIndex() {
  const components = getAllComponents();

  return (
    <section className={stack({ gap: 'xl' })}>
      <header className={stack({ gap: 'm' })}>
        <h1 className={css({ textStyle: 'heading' })}>{title}</h1>
        <p className={css({ textStyle: 'body', color: 'text2' })}>
          {description}
        </p>
      </header>
      {components.length === 0 ? (
        <p className={css({ textStyle: 'body', color: 'text2' })}>
          No components found.
        </p>
      ) : (
        <ul
          className={grid({
            columns: { base: 1, bp1: 2 },
            gap: 'm',
            listStyle: 'none',
          })}
        >
          {components.map((component) => (
            <li key={component.slug}>
              <Link
                href={`${PATHS.components}/${component.slug}`}
                className={cardLink}
              >
                <ComponentPreview
                  preview={component.preview}
                  alt={component.title}
                  sizes='(max-width: 590px) 90vw, 45vw'
                />
                <div
                  className={flex({
                    justify: 'space-between',
                    align: 'baseline',
                    gap: 's',
                    mt: 's',
                  })}
                >
                  <span
                    className={css({
                      textStyle: 'base',
                      fontSize: '1',
                      lineHeight: 'tight',
                    })}
                  >
                    {component.title}
                  </span>
                  <time
                    className={css({
                      textStyle: 'serif',
                      fontSize: '0',
                      color: 'text2',
                      flexShrink: 0,
                    })}
                  >
                    {parseDateToLongDateString(component.date)}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const cardLink = css({
  display: 'block',
  color: 'inherit',
  textDecoration: 'none',
  _hover: {
    '& time': { color: 'text1' },
  },
});
