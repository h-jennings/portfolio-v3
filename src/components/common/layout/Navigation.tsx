import { styled } from '@/stitches.config';
import { Link, Text } from '@components/common/Text';
import { PATHS } from '@utils/common/constants/paths.constants';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Flex } from '../Flex';
import { ThemeToggle } from '../ThemeToggle';

const NavigationWrapper = styled('nav', {
  pt: '$m',
  pb: '$2xl',
  '@bp1': {
    pt: '$xl',
  },
});

export const Navigation = (): JSX.Element => {
  const { asPath } = useRouter();

  return (
    <NavigationWrapper>
      <Flex direction='row' justify='between' align='center'>
        <NextLink passHref href={PATHS.home}>
          <Link
            key={asPath}
            aria-label='logo link'
            css={{ d: 'inline-block', userSelect: 'none' }}
          >
            <Text size='1' leading='tight' role='presentation'>
              H—J
            </Text>
          </Link>
        </NextLink>
        <ThemeToggle />
      </Flex>
    </NavigationWrapper>
  );
};
