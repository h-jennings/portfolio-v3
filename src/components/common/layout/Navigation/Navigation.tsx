import { link } from '@/styles/elements/link.css';
import { stack } from '@/styles/primitives/stack.css';
import { text } from '@/styles/primitives/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { PATHS } from '@utils/common/constants/paths.constants';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ThemeToggle } from '../../ThemeToggle/ThemeToggle';
import * as s from './Navigation.css';

export const Navigation = (): JSX.Element => {
  const { asPath } = useRouter();

  return (
    <nav className={s.root}>
      <div className={s.inner}>
        <Link
          href={PATHS.home}
          key={asPath}
          aria-label='logo link'
          className={link()}
          style={{ display: 'inline-block', userSelect: 'none' }}
        >
          <span
            className={text({ size: '1', leading: 'tight' })}
            role='presentation'
          >
            H—J
          </span>
        </Link>
        <div
          className={clsx(
            stack({
              orientation: 'horizontal',
              inline: true,
            }),
            sprinkles({ alignItems: 'center' }),
          )}
        >
          <Link
            key={asPath}
            href={PATHS.now}
            className={clsx(s.now, link({ size: '1' }))}
          >
            Now
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
