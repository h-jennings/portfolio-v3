import { PATHS } from '@/app/_utils/constants/paths.constants';
import { css, cx } from 'ds/css';
import { flex, hstack } from 'ds/patterns';
import { link } from 'ds/recipes';
import Link from 'next/link';
import ThemeToggle from './theme-toggle';

export const Navigation = () => {
  return (
    <nav
      className={css({
        gridArea: 'nav',
        pt: { base: 'm', bp1: 'xl' },
        pb: '2xl',
      })}
    >
      <div
        className={flex({
          w: 'full',
          justify: 'space-between',
          align: 'center',
        })}
      >
        <Link
          href={PATHS.home}
          aria-label='logo link'
          className={cx(
            link({ color: 'primary' }),
            css({ display: 'inline-block', userSelect: 'none' }),
          )}
        >
          <span
            className={css({
              textStyle: 'base',
              fontSize: '1',
              lineHeight: 'tight',
            })}
            role='presentation'
          >
            H—J
          </span>
        </Link>
        <div className={hstack({ gap: 's' })}>
          <Link
            href={PATHS.now}
            className={cx(link({ color: 'secondary' }), now)}
          >
            Now
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

const now = css({
  lineHeight: 'tight',
  display: 'inline-block',
  color: 'transparent',
  background: 'linear-gradient(270deg,#8a8c93 50%,hsla(227,4%,56%,.6))',
  backgroundClip: 'text',
  _hover: {
    color: 'hsla(227,4%,56%,1)',
  },
});
