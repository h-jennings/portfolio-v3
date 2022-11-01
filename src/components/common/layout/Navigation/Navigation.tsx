import { link } from '@/styles/elements/link.css';
import { text } from '@/styles/primitives/text.css';
import { PATHS } from '@utils/common/constants/paths.constants';
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
          passHref
          href={PATHS.home}
          key={asPath}
          aria-label='logo link'
          className={link()}
          style={{ display: 'inline-block', userSelect: 'none' }}
        >
          <span
            className={text({ size: 1, leading: 'tight' })}
            role='presentation'
          >
            H—J
          </span>
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};
