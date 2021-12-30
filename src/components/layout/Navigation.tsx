import { Box } from '@components/Box';
import { Link, Text } from '@components/Text';
import { PATHS } from '@utils/constants/paths.constants';
import NextLink from 'next/link';
import { Flex } from '../Flex';

export function Navigation(): JSX.Element {
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
        <Box
          css={{ backgroundColor: '$slate6' }}
          style={{ height: 27, width: 77 }}
        />
      </Flex>
    </Box>
  );
}
