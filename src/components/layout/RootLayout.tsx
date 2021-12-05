import { config, styled } from '@/stitches.config';
import { WithChildren } from '@utils/types/with-children';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import Media from 'react-media';
import { Footer } from './Footer';
import { MobileNavigation } from './MobileNavigation';
import { Navigation } from './Navigation';

const Container = styled('div', {
  width: '$full',
  backgroundColor: '$uiBg',
  minHeight: '$screenH',
  d: 'flex',
  ai: 'center',
  flexFlow: 'column',
  height: '$full',
  px: '$2',
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
  position: 'relative',
  zIndex: '$init',
});
const Main = styled('main', {
  flex: '1',
  paddingTop: '$5',
  paddingBottom: '$8',
  zIndex: 1,
  '@bp2': {
    paddingTop: '$7',
    paddingBottom: '$10',
  },
});

export function RootLayout({ children }: WithChildren): JSX.Element {
  // Breakpoint for the navigation options
  const breakpoint = config.media.bp2;

  return (
    <>
      <DefaultSeo {...SEO} />
      <Container>
        <Wrapper>
          <Media query={breakpoint} defaultMatches>
            {(matches: boolean) => {
              return matches ? <Navigation /> : <MobileNavigation />;
            }}
          </Media>
          <Main>{children}</Main>
          <Footer />
        </Wrapper>
      </Container>
    </>
  );
}
