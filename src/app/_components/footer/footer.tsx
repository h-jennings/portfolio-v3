import { css } from 'ds/css';
import { flex, hstack, vstack } from 'ds/patterns';
import { Time } from './time';
import * as React from 'react';
import { Weather, WeatherError, WeatherLoading } from './weather';
import { ErrorBoundary } from 'react-error-boundary';

export const Footer = () => {
  return (
    <footer
      className={css({
        pt: '3xl',
        pb: { base: 'm', bp1: 'xl' },
        gridArea: 'footer',
      })}
    >
      <div className={hstack({ justify: 'center', gap: '3xs', pb: '2xl' })}>
        <div className={dot} />
        <div className={dot} />
        <div className={dot} />
      </div>
      <div className={footerWrapper}>
        <div
          className={vstack({
            gap: '2xs',
            textAlign: 'left',
            alignItems: 'flex-start',
          })}
        >
          <Time />
          <span
            className={css({
              textStyle: 'base',
              lineHeight: 'tight',
              fontSize: '1',
              whiteSpace: 'nowrap',
            })}
          >
            Richmond, VA
          </span>
        </div>
        <div
          className={flex({
            align: 'center',
            gap: '3xs',
            justifySelf: { base: 'end', bp1: 'start' },
          })}
        >
          <ErrorBoundary fallback={<WeatherError />}>
            <React.Suspense fallback={<WeatherLoading />}>
              {/* @ts-expect-error - Async Server Component  */}
              <Weather />
            </React.Suspense>
          </ErrorBoundary>
        </div>
        <span
          className={css({
            textStyle: 'base',
            lineHeight: 'tight',
            fontSize: '1',
            color: 'text2',
            textAlign: { base: 'center', bp1: 'right' },
            gridArea: 'c',
          })}
        >
          Always pushing.
        </span>
      </div>
    </footer>
  );
};

const dot = css({
  w: 2,
  h: 2,
  rounded: 'round',
  bgColor: 'slate11',
});

const footerWrapper = css({
  display: 'grid',
  gridTemplateAreas: `"a b"
                      "c c"`,
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'end',
  justifyContent: 'start',
  columnGap: 's',
  rowGap: { base: 'xl', bp1: 's' },
  w: 'full',
  bp1: {
    gridTemplateAreas: `"a b c"`,
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
});
