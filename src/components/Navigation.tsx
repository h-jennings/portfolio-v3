import { styled } from '@/stitches.config';
import Link from 'next/link';
import { Availability } from './Availability';
import { Box } from './primitives/Box';
import { StyledLink } from './primitives/StyledLink';

const Container = styled('nav', {
  py: '$4',
  d: 'flex',
  jc: 'space-between',
  alignItems: 'center',
});

const LinkContainer = styled('ul', {
  d: 'grid',
  gridTemplateColumns: 'repeat(4, auto)',
  gap: '$3',
  alignItems: 'center',
});

const LogotypeContainer = styled('div', {
  position: 'absolute',
  top: '0',
  left: '50%',
  transform: 'translate(0%, calc(50% + 48px))',
});

export function Navigation(): JSX.Element {
  return (
    <Container>
      <LinkContainer>
        <li>
          <Link passHref href='/'>
            <StyledLink>work</StyledLink>
          </Link>
        </li>
        <li>
          <Link passHref href='/'>
            <StyledLink>writing</StyledLink>
          </Link>
        </li>
        <li>
          <Link passHref href='/'>
            <StyledLink>about</StyledLink>
          </Link>
        </li>
        <li>
          <Availability status='available' />
        </li>
      </LinkContainer>
      <LogotypeContainer>
        <Link passHref href='/'>
          <StyledLink
            aria-label='logo link'
            css={{ userSelect: 'none', display: 'inline-block' }}>
            <Box css={{ lineHeight: '$tight' }} role='presentation'>
              H—J
            </Box>
          </StyledLink>
        </Link>
      </LogotypeContainer>
      <div>
        <Link passHref href='mailto:jenningsdhunter@gmail.com'>
          <StyledLink css={{ color: '$text3' }}>
            jenningsdhunter@gmail.com
          </StyledLink>
        </Link>
      </div>
    </Container>
  );
}
