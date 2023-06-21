import Link from 'next/link';
import { link } from 'ds/recipes';
import { css, cx } from 'ds/css';
import { NotFoundContent } from '@/app/_components/not-found-content';
import { PATHS } from '@utils/common/constants/paths.constants';

export default function NotFound() {
  return (
    <NotFoundContent title='Project Page Not Found'>
      <Link
        href={PATHS.work}
        className={cx(
          link({ color: 'accent' }),
          css({ fontSize: { base: '1', bp2: '2' } }),
        )}
      >
        View all work
      </Link>
    </NotFoundContent>
  );
}
