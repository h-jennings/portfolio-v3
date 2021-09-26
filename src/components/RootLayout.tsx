import { styled } from '@/stitches.config';
import { WithChildren } from '@/types/with-children';
import { Footer } from './Footer';
import { Navigation } from './Navigation';

const Container = styled('div', {
  width: '$full',
  backgroundColor: '$uiBg',
  minHeight: '$screenH',
  d: 'flex',
  alignItems: 'center',
  flexFlow: 'column',
  height: '$full',
  px: '80px',
});
const Wrapper = styled('div', {
  maxWidth: '$desktop',
  width: '$full',
  d: 'flex',
  flexFlow: 'column',
  height: '$full',
  minHeight: '$screenH',
});
const Main = styled('main', {
  flex: '1',
});

export function RootLayout({ children }: WithChildren): JSX.Element {
  return (
    <Container>
      <Wrapper>
        <Navigation />
        <Main>{children}</Main>
        <Footer />
      </Wrapper>
    </Container>
  );
}
