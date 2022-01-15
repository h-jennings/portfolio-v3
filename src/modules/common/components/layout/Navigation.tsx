import { styled } from '@/stitches.config';
import { Link, Text } from '@common/components/Text';
import { PATHS } from '@common/utils/constants/paths.constants';
import NextLink from 'next/link';
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
  return (
    <NavigationWrapper>
      <Flex direction='row' justify='between' align='center'>
        <NextLink passHref href={PATHS.home}>
          <Link
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
