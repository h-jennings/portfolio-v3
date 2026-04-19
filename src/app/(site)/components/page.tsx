import { ComponentPreview } from '@/app/_components/component-preview';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import { getAllComponents } from '@/app/_utils/content';
import { parseDateToLongDateString } from '@/app/_utils/helpers/date.helpers';
import { css } from 'ds/css';
import { flex, grid, linkBox, linkOverlay, stack } from 'ds/patterns';
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
            <li key={component.slug} className={linkBox()}>
              <div className={cardInner}>
                <div className={mediaSlot} data-slot='component-card-media'>
                  <ComponentPreview
                    preview={component.preview}
                    alt={component.title}
                    sizes='(max-width: 590px) 90vw, 45vw'
                  />
                </div>
                <div
                  className={flex({
                    justify: 'space-between',
                    align: 'baseline',
                    gap: 's',
                  })}
                >
                  <Link
                    href={`${PATHS.components}/${component.slug}`}
                    className={linkOverlay({
                      textStyle: 'base',
                      fontSize: '1',
                      lineHeight: 'tight',
                      color: 'inherit',
                      textDecoration: 'none',
                    })}
                    data-slot='component-card-link'
                  >
                    {component.title}
                  </Link>
                  <time
                    className={css({
                      textStyle: 'base',
                      fontSize: '0',
                      color: 'text2',
                      flexShrink: 0,
                      transition: 'color 150ms ease',
                    })}
                  >
                    {parseDateToLongDateString(component.date)}
                  </time>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const cardInner = stack({
  gap: 's',
  '&:has([data-slot="component-card-link"]:hover) [data-slot="component-card-media"]':
    {
      transform: 'scale(1.02)',
    },
  '&:has([data-slot="component-card-link"]:active) [data-slot="component-card-media"]':
    {
      transform: 'scale(0.98)',
    },
  '&:has([data-slot="component-card-link"]:hover) time': {
    color: 'text1',
  },
});

const mediaSlot = css({
  transition: 'transform 150ms ease',
  transform: 'scale(1)',
  transformOrigin: 'center',
});
