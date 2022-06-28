import { getCssText } from '@/stitches.config';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

const FONTS = `
@font-face {
  font-family: 'Basier Circle';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/basiercircle-regular-webfont.woff2') format('woff2'),
    url('/fonts/basiercircle-regular-webfont.woff') format('woff');
}

@font-face {
  font-family: 'Basier Circle';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/basiercircle-bold-webfont.woff2') format('woff2'),
    url('/fonts/basiercircle-bold-webfont.woff') format('woff');
}

@font-face {
  font-family: 'Untitled Serif';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/untitled-serif-regular-italic.woff2') format('woff2');
}

@font-face {
  font-family: 'Untitled Serif';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/untitled-serif-bold-italic.woff2') format('woff2');
}

@font-face {
  font-family: 'Jetbrains Mono';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/jetbrainsmono-regular.woff2') format('woff2');
}
`;

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='preload'
            href={`/fonts/basiercircle-regular-webfont.woff2`}
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href={`/fonts/untitled-serif-regular-italic.woff2`}
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <style
            id='stitches'
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <style
            dangerouslySetInnerHTML={{
              __html: FONTS,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
