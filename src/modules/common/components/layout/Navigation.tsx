import { Box } from '@common/components/Box';
import { Link, Text } from '@common/components/Text';
import { PATHS } from '@common/utils/constants/paths.constants';
import NextLink from 'next/link';
import { Flex } from '../Flex';
import { ThemeToggle } from '../ThemeToggle';

export const Navigation = (): JSX.Element => {
  return (
    <Box as='nav' css={{ pt: '$xl', pb: '$2xl' }}>
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
    </Box>
  );
};
