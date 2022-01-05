import { ErrorProps } from 'next/error';
import NextLink from 'next/link';
import { Stack } from './Stack';
import { Link, PageHeader } from './Text';

export const ErrorContent = ({ statusCode }: ErrorProps): JSX.Element => {
  return (
    <Stack gap='m'>
      <PageHeader>{statusCode} - Page Not Found</PageHeader>
      <div>
        <NextLink passHref href='/'>
          <Link
            color='3'
            size={{
              '@initial': '1',
              '@bp2': '2',
            }}
          >
            Back to homepage
          </Link>
        </NextLink>
      </div>
    </Stack>
  );
};
