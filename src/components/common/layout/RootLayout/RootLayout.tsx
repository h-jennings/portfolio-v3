import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import * as React from 'react';
import { PreviewModeControls } from '../../PreviewModeControls';
import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import * as s from './RootLayout.css';

export const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <>
      <DefaultSeo {...SEO} />
      <PreviewModeControls />
      <div className={s.container}>
        <div className={s.wrapper}>
          <Navigation />
          <main className={s.main}>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};
