import {
  gold,
  goldDark,
  green,
  greenDark,
  slate,
  slateDark,
  tomato,
  tomatoDark,
  yellow,
  yellowDark,
} from '@radix-ui/colors';
import type * as Stitches from '@stitches/react';
import { createStitches } from '@stitches/react';

export const { config, styled, getCssText, theme, createTheme, css } =
  createStitches({
    // Default Theme
    theme: {
      fonts: {
        primary: '"Basier Circle", sans-serif',
        serif: '"Untitled Serif", Georgia, serif',
      },
      colors: {
        ...gold,
        ...slate,
        ...green,
        ...yellow,
        ...tomato,
        uiBg: '$slate1',
        surface1: '$slate1',
        surface2: '$slate12',
        text1: 'black',
        text2: '$slate11',
        text3: '$gold9',
        text4: '$slate1',
      },
      shadows: {
        focus: '0 0 0 3px var(--colors-gold6)',
      },
      transitions: {
        default: '225ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      fontWeights: {
        bold: 700,
        regular: 400,
      },
      fontSizes: {
        1: 'clamp(0.80rem, 0.69rem + 0.48vw, 1.00rem)',
        2: 'clamp(1.00rem, 0.86rem + 0.60vw, 1.25rem)',
        3: 'clamp(1.25rem, 1.08rem + 0.75vw, 1.56rem)',
        4: 'clamp(1.56rem, 1.35rem + 0.94vw, 1.95rem)',
        5: 'clamp(1.95rem, 1.69rem + 1.18vw, 2.44rem)',
        6: 'clamp(2.44rem, 2.11rem + 1.47vw, 3.05rem)',
        7: 'clamp(3.05rem, 2.64rem + 1.84vw, 3.82rem)',
        8: 'clamp(3.82rem, 3.30rem + 2.30vw, 4.77rem)',
      },
      lineHeights: {
        tight: 1,
        body: 1.5,
        loose: 2,
      },
      space: {
        // 4 - 5
        '3xs':
          'calc(((var(--fc-3xs-min) / 16) * 1rem) + (var(--fc-3xs-max) - var(--fc-3xs-min)) * var(--fluid-bp))',
        // 8 - 10
        '2xs':
          'calc(((var(--fc-2xs-min) / 16) * 1rem) + (var(--fc-2xs-max) - var(--fc-2xs-min)) * var(--fluid-bp))',
        // 12 - 15
        xs: 'calc(((var(--fc-xs-min) / 16) * 1rem) + (var(--fc-xs-max) - var(--fc-xs-min)) * var(--fluid-bp))',
        // 16 - 20
        s: 'calc(((var(--fc-s-min) / 16) * 1rem) + (var(--fc-s-max) - var(--fc-s-min)) * var(--fluid-bp))',
        // 24 - 30
        m: 'calc(((var(--fc-m-min) / 16) * 1rem) + (var(--fc-m-max) - var(--fc-m-min)) * var(--fluid-bp))',
        // 32 - 40
        l: 'calc(((var(--fc-l-min) / 16) * 1rem) + (var(--fc-l-max) - var(--fc-l-min)) * var(--fluid-bp))',
        // 48 - 60
        xl: 'calc(((var(--fc-xl-min) / 16) * 1rem) + (var(--fc-xl-max) - var(--fc-xl-min)) * var(--fluid-bp))',
        // 64 - 80
        '2xl':
          'calc(((var(--fc-2xl-min) / 16) * 1rem) + (var(--fc-2xl-max) - var(--fc-2xl-min)) * var(--fluid-bp))',
        // 96 - 120
        '3xl':
          'calc(((var(--fc-3xl-min) / 16) * 1rem) + (var(--fc-3xl-max) - var(--fc-3xl-min)) * var(--fluid-bp))',
        // TODO: Potentially add space steps (S-M, ...etc.)
      },
      sizes: {
        full: '100%',
        channel: '700px',
        screenW: '100vw',
        screenH: '100vh',
        desktop: '1440px',
      },
      zIndices: {
        under: -1,
        over: 1,
        init: 0,
      },
      radii: {
        none: 0,
        round: '50%',
        pill: '9999px',
      },
    },

    // Media
    media: {
      bp1: '(width >= 520px)',
      bp2: '(width >= 768px)',
      bp3: '(width >= 1040px)',
      bp4: '(width >= 1800px)',
      motion: '(prefers-reduced-motion)',
      hover: '(any-hover: hover)',
      dark: '(prefers-color-scheme: dark)',
      light: '(prefers-color-scheme: light)',
    },

    // Utilities
    utils: {
      m: (value: Stitches.PropertyValue<'margin'>) => ({
        margin: value,
      }),
      mt: (value: Stitches.PropertyValue<'margin'>) => ({
        marginTop: value,
      }),
      mr: (value: Stitches.PropertyValue<'margin'>) => ({
        marginRight: value,
      }),
      mb: (value: Stitches.PropertyValue<'margin'>) => ({
        marginBottom: value,
      }),
      ml: (value: Stitches.PropertyValue<'margin'>) => ({
        marginLeft: value,
      }),
      mx: (value: Stitches.PropertyValue<'margin'>) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: Stitches.PropertyValue<'margin'>) => ({
        marginTop: value,
        marginBottom: value,
      }),

      p: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingTop: value,
        paddingBottom: value,
        paddingLeft: value,
        paddingRight: value,
      }),
      pt: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingTop: value,
      }),
      pr: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingRight: value,
      }),
      pb: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingBottom: value,
      }),
      pl: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingLeft: value,
      }),
      px: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingTop: value,
        paddingBottom: value,
      }),

      ta: (value: Stitches.PropertyValue<'textAlign'>) => ({
        textAlign: value,
      }),

      d: (value: Stitches.PropertyValue<'display'>) => ({ display: value }),
      fd: (value: Stitches.PropertyValue<'flexDirection'>) => ({
        flexDirection: value,
      }),
      fw: (value: Stitches.PropertyValue<'flexWrap'>) => ({ flexWrap: value }),

      ai: (value: Stitches.PropertyValue<'alignItems'>) => ({
        alignItems: value,
      }),
      ac: (value: Stitches.PropertyValue<'alignContent'>) => ({
        alignContent: value,
      }),
      jc: (value: Stitches.PropertyValue<'justifyContent'>) => ({
        justifyContent: value,
      }),
      as: (value: Stitches.PropertyValue<'alignSelf'>) => ({
        alignSelf: value,
      }),
      fg: (value: Stitches.PropertyValue<'flexGrow'>) => ({ flexGrow: value }),
      fs: (value: Stitches.PropertyValue<'flexShrink'>) => ({
        flexShrink: value,
      }),
      fb: (value: Stitches.PropertyValue<'flexBasis'>) => ({
        flexBasis: value,
      }),
      gtc: (value: Stitches.PropertyValue<'gridTemplateColumns'>) => ({
        gridTemplateColumns: value,
      }),

      bc: (value: Stitches.ScaleValue<'colors'>) => ({
        backgroundColor: value,
      }),

      br: (value: Stitches.ScaleValue<'radii'>) => ({
        borderRadius: value,
      }),

      lh: (value: Stitches.PropertyValue<'lineHeight'>) => ({
        lineHeight: value,
      }),

      hover: (val: Stitches.CSSProperties) => ({
        '@media(hover: hover)': {
          '&:hover': val,
        },
      }),
    },
  });

export const darkTheme = createTheme({
  colors: {
    ...goldDark,
    ...greenDark,
    ...slateDark,
    ...greenDark,
    ...yellowDark,
    ...tomatoDark,
    uiBg: '$slate1',
    surface1: '$slate1',
    surface2: '$slate12',
    text1: 'white',
    text2: '$slate11',
    text3: '$gold9',
    text4: '$slate1',
  },
});
