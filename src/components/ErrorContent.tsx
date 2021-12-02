import { css } from '@/stitches.config';
import { ErrorProps } from 'next/error';
import NextLink from 'next/link';
import { link } from './primitives/link';
import { Stack } from './primitives/Stack';
import { PageHeader } from './primitives/text';

const homepageLink = css(link, {
  fontSize: '$1',
  color: '$text3',
  '@bp2': {
    fontSize: '$2',
  },
});
export function ErrorContent({ statusCode, title }: ErrorProps): JSX.Element {
  return (
    <Stack gap='3'>
      <PageHeader>{statusCode} - Page Not Found</PageHeader>
      <div>
        <NextLink passHref href='/'>
          <a className={homepageLink()}>Back to homepage</a>
        </NextLink>
      </div>
    </Stack>
  );
}
