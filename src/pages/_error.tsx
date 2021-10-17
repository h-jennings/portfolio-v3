import { ErrorContent } from '@/components/ErrorContent';
import { ErrorProps } from 'next/error';

export const CustomError = ({ statusCode, title }: ErrorProps) => {
  return <ErrorContent statusCode={statusCode} />;
};
