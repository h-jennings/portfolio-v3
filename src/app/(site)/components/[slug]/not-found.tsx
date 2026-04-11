import { NotFoundContent } from '@/app/_components/not-found-content';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import { css, cx } from 'ds/css';
import { link } from 'ds/recipes';
import Link from 'next/link';

export default function NotFound() {
  return (
    <NotFoundContent title='Component Not Found'>
      <Link
        href={PATHS.components}
        className={cx(
          link({ color: 'accent' }),
          css({ fontSize: { base: '1', bp2: '2' } }),
        )}
      >
        Back to components
      </Link>
    </NotFoundContent>
  );
}
