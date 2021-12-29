import { darkTheme, styled } from '@/stitches.config';
import { WithChildren } from '@utils/types/with-children';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import { Navigation } from './Navigation';

const Container = styled('div', {
  width: '$full',
  backgroundColor: '$uiBg',
  minHeight: '$screenH',
  d: 'flex',
  ai: 'center',
  flexFlow: 'column',
  height: '$full',
});
const Wrapper = styled('div', {
  maxWidth: '$channel',
  width: '$full',
  d: 'flex',
  flexFlow: 'column',
  height: '$full',
  minHeight: '$screenH',
  position: 'relative',
  zIndex: '$init',
});
const Main = styled('main', {
  flex: '1',
  paddingTop: '$5',
  paddingBottom: '$8',
  zIndex: 1,
});

export function RootLayout({ children }: WithChildren): JSX.Element {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Container className={darkTheme}>
        <Wrapper>
          <Navigation />
          <Main>{children}</Main>
          {/* <Footer /> */}
        </Wrapper>
      </Container>
    </>
  );
}
