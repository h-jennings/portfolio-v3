import { styled } from '@/stitches.config';
import { Box } from '@components/primitives/Box';
import { Link } from '@components/primitives/link';
import { Text } from '@components/primitives/text';
import { NAVIGATION_DATA } from '@utils/constants/navigation.constants';
import { PATHS } from '@utils/constants/paths.constants';
import NextLink from 'next/link';
import useMeasure from 'react-use-measure';
import { Availability } from './Availability';

const Container = styled('div', {
  d: 'flex',
  jc: 'space-between',
  ai: 'center',
  position: 'relative',
});

const LinkList = styled('ul', {
  d: 'grid',
  gridTemplateColumns: 'repeat(4, auto)',
  gap: '$2',
  ai: 'center',
  '@bp3': {
    gap: '$3',
  },
});

const LogotypeContainer = styled('div', {
  position: 'absolute',
  top: '0',
  left: '50%',
  height: '100%',
  d: 'flex',
  ai: 'center',
});

export function Navigation(): JSX.Element {
  const [ref, bounds] = useMeasure();

  return (
    <Box as='nav' css={{ py: '$4' }}>
      <Container>
        <LinkList>
          {NAVIGATION_DATA.map(({ path, label }) => (
            <li key={label}>
              <NextLink passHref href={path}>
                <Link>{label}</Link>
              </NextLink>
            </li>
          ))}
          <li>
            <Availability status='inactive' />
          </li>
        </LinkList>
        <LogotypeContainer
          ref={ref}
          style={{
            marginLeft: `-${bounds.width / 2}px`,
          }}
        >
          <NextLink passHref href={PATHS.home}>
            <Link
              aria-label='logo link'
              css={{ d: 'inline-block', userSelect: 'none' }}
            >
              <Text leading='tight' role='presentation'>
                H—J
              </Text>
            </Link>
          </NextLink>
        </LogotypeContainer>
        <div>
          <Link color='3' href={PATHS.email}>
            jenningsdhunter@gmail.com
          </Link>
        </div>
      </Container>
    </Box>
  );
}
