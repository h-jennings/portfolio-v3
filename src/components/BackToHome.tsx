import { PATHS } from '@/utils/constants/paths.constants';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { Stack } from './Stack';
import { Link } from './Text';

export function BackToHome(): JSX.Element {
  return (
    <Stack css={{ pb: '$m' }} direction='row' gap='xs'>
      <ArrowLeftIcon color='var(--colors-text1)' width={15} aria-hidden />
      <NextLink href={PATHS.home} passHref>
        <Link leading='tight' css={{ fontSize: 12 }}>
          Back to home
        </Link>
      </NextLink>
    </Stack>
  );
}
