import { navigationData } from '@/constants/navigation';
import { PATHS } from '@/constants/paths';
import { css } from '@/stitches.config';
import NextLink from 'next/link';
import useMeasure from 'react-use-measure';
import { Availability } from './Availability';
import { link } from './primitives/link';

const wrapper = css({
  py: '$4',
});
const container = css({
  d: 'flex',
  jc: 'space-between',
  ai: 'center',
  position: 'relative',
});

const linkContainer = css({
  d: 'grid',
  gridTemplateColumns: 'repeat(4, auto)',
  gap: '$2',
  ai: 'center',
  '@bp3': {
    gap: '$3',
  },
});

const logotypeContainer = css({
  position: 'absolute',
  top: '0',
  left: '50%',
  height: '100%',
  d: 'flex',
  ai: 'center',
});

export function Navigation(): JSX.Element {
  const [ref, bounds] = useMeasure();

  return (
    <nav className={wrapper()}>
      <div className={container()}>
        <ul className={linkContainer()}>
          {navigationData.map(({ path, label }) => (
            <li key={label}>
              <NextLink passHref href={path}>
                <a className={link()}>{label}</a>
              </NextLink>
            </li>
          ))}
          <li>
            <Availability status='inactive' />
          </li>
        </ul>
        <div
          ref={ref}
          className={logotypeContainer({
            css: {
              marginLeft: `-${bounds.width / 2}px`,
            },
          })}
        >
          <NextLink passHref href={PATHS.home}>
            <a
              aria-label='logo link'
              className={link({
                css: {
                  userSelect: 'none',
                  display: 'inline-block',
                },
              })}
            >
              <div
                className={css({ lineHeight: '$tight' })()}
                role='presentation'
              >
                H—J
              </div>
            </a>
          </NextLink>
        </div>
        <div>
          <a href={PATHS.email} className={link({ css: { color: '$text3' } })}>
            jenningsdhunter@gmail.com
          </a>
        </div>
      </div>
    </nav>
  );
}
