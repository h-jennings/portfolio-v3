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

export const { config, styled, getCssText, theme, createTheme } =
  createStitches({
    // Default Theme
    theme: {
      fonts: {
        primary: '"Basier Circle", sans-serif',
      },
      colors: {
        ...gold,
        ...slate,
        ...green,
        ...yellow,
        ...tomato,
        uiBg: '$slate1',
        text1: '$slate12',
        text2: '$slate11',
        text3: '$gold9',
      },
      shadows: {
        focus: '0 0 0 3px var(--colors-gold6)',
      },
      transitions: {
        default: 'all 225ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      fontWeights: {
        bold: 700,
        regular: 400,
      },
      fontSizes: {
        1: '12px',
        2: '16px',
        3: '28px',
        4: '48px',
        5: '64px',
        6: '80px',
        7: '112px',
        8: '128px',
      },
      lineHeights: {
        tight: 1,
        body: 1.33,
        loose: 2,
      },
      space: {
        1: '8px',
        2: '16px',
        3: '32px',
        4: '48px',
        5: '64px',
        6: '80px',
        7: '112px',
        8: '144px',
        9: '208px',
        10: '256px',
      },
      sizes: {
        full: '100%',
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

      bc: (value: Stitches.ScaleValue<'colors'>) => ({
        backgroundColor: value,
      }),

      br: (value: Stitches.ScaleValue<'radii'>) => ({
        borderRadius: value,
      }),

      lh: (value: Stitches.PropertyValue<'lineHeight'>) => ({
        lineHeight: value,
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
    text1: '$slate12',
    text2: '$slate11',
    text3: '$gold9',
  },
});
