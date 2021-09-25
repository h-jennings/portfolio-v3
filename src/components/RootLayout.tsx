import { darkTheme, styled } from '@/stitches.config';
import { WithChildren } from '@/types/with-children';
import { Footer } from './Footer';
import { Navigation } from './Navigation';

const Wrapper = styled('div', {
  backgroundColor: '$uiBg',
  minHeight: '$screenH',
  d: 'flex',
  flexFlow: 'column',
  height: '$full',
});
const Main = styled('main', {
  flex: '1',
});

export function RootLayout({ children }: WithChildren): JSX.Element {
  return (
    <Wrapper className={darkTheme}>
      <Navigation />
      <Main>{children}</Main>
      <Footer />
    </Wrapper>
  );
}
