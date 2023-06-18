import { PATHS } from '@utils/common/constants/paths.constants';
import { css } from 'ds/css';
import { vstack, container } from 'ds/patterns';
import { Metadata } from 'next';

const title = 'System';
const description = 'System Page';
const url = new URL(`${PATHS.base}/system`);

export const metadata: Metadata = {
  metadataBase: url,
  robots: 'noindex, nofollow',
  title,
  description,
  openGraph: {
    url,
    type: 'website',
    locale: 'en_US',
    title,
    description,
  },
};

export default function SystemPage() {
  return (
    <div className={container()}>
      <div
        className={vstack({
          gap: 'm',
        })}
      >
        <h1
          className={css({
            textStyle: 'heading',
          })}
        >
          System Page
        </h1>
        <p
          className={css({
            textStyle: 'body',
          })}
        >
          This is a system page.
        </p>
      </div>
    </div>
  );
}
