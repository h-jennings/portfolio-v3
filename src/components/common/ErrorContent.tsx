import { link } from '@/styles/elements/link.css';
import { stack } from '@/styles/primitives/stack.css';
import { pageHeader } from '@/styles/primitives/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import clsx from 'clsx';
import { ErrorProps } from 'next/error';
import Link from 'next/link';

export const ErrorContent = ({ statusCode }: ErrorProps): JSX.Element => {
  return (
    <div className={sprinkles({ width: 'full' })}>
      <div className={stack({ gap: 'm' })}>
        <h1 className={pageHeader}>{statusCode} - Page Not Found</h1>
        <div>
          <Link
            href='/'
            className={clsx(
              link({ color: 3 }),
              sprinkles({
                fontSize: { initial: 1, bp2: 2 },
              }),
            )}
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
