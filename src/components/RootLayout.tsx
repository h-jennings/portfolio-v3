import { styled } from '@/stitches.config';
import { WithChildren } from '@/types/with-children';
import { Footer } from './Footer/Footer';

const Container = styled('div', {
  width: '$full',
  backgroundColor: '$uiBg',
  minHeight: '$screenH',
  d: 'flex',
  ai: 'center',
  flexFlow: 'column',
  height: '$full',
  px: '$2',
  '@bp2': {
    px: '$3',
  },
  '@bp3': {
    px: '$6',
  },
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
  paddingTop: '$7',
  paddingBottom: '$8',
  '@bp2': {
    paddingBottom: '$10',
  },
});

export function RootLayout({ children }: WithChildren): JSX.Element {
  return (
    <Container>
      <Wrapper>
        {/* <Navigation /> */}
        <Main>{children}</Main>
        <Footer />
      </Wrapper>
    </Container>
  );
}
