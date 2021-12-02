import { config, css } from '@/stitches.config';
import { WithChildren } from '@utils/types/with-children';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import Media from 'react-media';
import { Footer } from './Footer/Footer';
import { MobileNavigation } from './MobileNavigation/MobileNavigation';
import { Navigation } from './Navigation';

const container = css({
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
const wrapper = css({
  maxWidth: '$desktop',
  width: '$full',
  d: 'flex',
  flexFlow: 'column',
  height: '$full',
  minHeight: '$screenH',
  position: 'relative',
  zIndex: '$init',
});
const main = css({
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
      <div className={container()}>
        <div className={wrapper()}>
          <Media query={breakpoint} defaultMatches>
            {(matches: boolean) => {
              return matches ? <Navigation /> : <MobileNavigation />;
            }}
          </Media>
          <main className={main()}>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
