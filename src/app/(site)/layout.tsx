import { Footer } from '@/app/_components/footer/footer';
import { Navigation } from '@/app/_components/navigation/navigation';
import { css } from 'ds/css';

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className={container}>
      <div className={wrapper}>
        <Navigation />
        <main className={main}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

const container = css({
  w: 'full',
  bgColor: 'uiBg',
  h: 'full',
  minH: 'screenH',
  display: 'flex',
  alignItems: 'center',
  flexDir: 'column',
  px: 's',
});

const wrapper = css({
  gridTemplateAreas: `'nav'
                      'main'
                      'footer'`,
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
  display: 'grid',
  maxW: 'channel',
  w: 'full',
  h: 'full',
  minH: 'screenH',
  pos: 'relative',
  zIndex: 'init',
});

const main = css({
  w: 'full',
  zIndex: 1,
  gridArea: 'main',
});
