import { ErrorProps } from 'next/error';
import { pageHeader } from './primitives/Text';

export function ErrorContent({ statusCode, title }: ErrorProps): JSX.Element {
  return <h1 className={pageHeader()}>{statusCode} - Page Not Found</h1>;
}
