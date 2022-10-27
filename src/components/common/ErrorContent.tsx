import { link } from '@/styles/elements/link.css';
import { stack } from '@/styles/elements/stack.css';
import { pageHeader } from '@/styles/elements/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import clsx from 'clsx';
import { ErrorProps } from 'next/error';
import { CustomLink } from './CustomLink';

export const ErrorContent = ({ statusCode }: ErrorProps): JSX.Element => {
  return (
    <div className={sprinkles({ width: 'full' })}>
      <div className={stack({ gap: 'm' })}>
        <h1 className={pageHeader}>{statusCode} - Page Not Found</h1>
        <div>
          <CustomLink
            href='/'
            className={clsx(
              link({ color: 3 }),
              sprinkles({
                fontSize: { initial: 1, bp2: 2 },
              }),
            )}
          >
            Back to homepage
          </CustomLink>
        </div>
      </div>
    </div>
  );
};
