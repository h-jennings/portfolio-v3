import { NotFoundContent } from './_components/not-found-content';
import Link from 'next/link';
import { link } from 'ds/recipes';
import { css, cx } from 'ds/css';

export default function NotFound() {
  return (
    <NotFoundContent>
      <Link
        href='/'
        className={cx(
          link({ color: 'accent' }),
          css({ fontSize: { base: '1', bp2: '2' } }),
        )}
      >
        Back to homepage
      </Link>
    </NotFoundContent>
  );
}
