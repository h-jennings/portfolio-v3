import { PATHS } from '@/constants/paths';
import { navigationData } from '@/data/navigation';
import { styled } from '@/stitches.config';
import Link from 'next/link';
import useMeasure from 'react-use-measure';
import { Availability } from './Availability';
import { Box } from './primitives/Box';
import { StyledLink } from './primitives/StyledLink';

const Wrapper = styled('nav', {
  py: '$4',
});
const Container = styled('div', {
  d: 'flex',
  jc: 'space-between',
  ai: 'center',
  position: 'relative',
});

const LinkContainer = styled('ul', {
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
    <Wrapper>
      <Container>
        <LinkContainer>
          {navigationData.map(({ path, label }) => (
            <li key={label}>
              <Link passHref href={path}>
                <StyledLink>{label}</StyledLink>
              </Link>
            </li>
          ))}
          <li>
            <Availability status='available' />
          </li>
        </LinkContainer>
        <LogotypeContainer
          ref={ref}
          css={{ marginLeft: `-${bounds.width / 2}px` }}
        >
          <Link passHref href={PATHS.home}>
            <StyledLink
              aria-label='logo link'
              css={{ userSelect: 'none', display: 'inline-block' }}
            >
              <Box css={{ lineHeight: '$tight' }} role='presentation'>
                H—J
              </Box>
            </StyledLink>
          </Link>
        </LogotypeContainer>
        <div>
          <Link passHref href={PATHS.email}>
            <StyledLink css={{ color: '$text3' }}>
              jenningsdhunter@gmail.com
            </StyledLink>
          </Link>
        </div>
      </Container>
    </Wrapper>
  );
}
