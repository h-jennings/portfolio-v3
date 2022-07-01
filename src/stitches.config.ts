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
import { createFluidValue } from './styles/create-fluid-value';

const getConfigFluidValue = (minSize: number, maxSize: number) =>
  createFluidValue(minSize, maxSize, 360, 1024);

export const { config, styled, getCssText, theme, createTheme, css } =
  createStitches({
    // Default Theme
    theme: {
      fonts: {
        primary: '"Basier Circle", sans-serif',
        serif: '"Untitled Serif", Georgia, serif',
      },
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
        1: getConfigFluidValue(13, 16),
        2: getConfigFluidValue(16, 20),
        3: getConfigFluidValue(20, 25),
        4: getConfigFluidValue(25, 31),
        5: getConfigFluidValue(31, 39),
        6: getConfigFluidValue(39, 49),
        7: getConfigFluidValue(49, 61),
        8: getConfigFluidValue(61, 76),
      },
      lineHeights: {
        tight: 1,
        body: 1.5,
        loose: 2,
      },
      space: {
        // 4 - 5
        '3xs': getConfigFluidValue(4, 5),
        // 8 - 10
        '2xs': getConfigFluidValue(8, 10),
        // 12 - 15
        xs: getConfigFluidValue(12, 15),
        // 16 - 20
        s: getConfigFluidValue(16, 20),
        // 24 - 30
        m: getConfigFluidValue(24, 30),
        // 32 - 40
        l: getConfigFluidValue(32, 40),
        // 48 - 60
        xl: getConfigFluidValue(48, 60),
        // 64 - 80
        '2xl': getConfigFluidValue(64, 80),
        // 96 - 120
        '3xl': getConfigFluidValue(96, 120),
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
        card: '15px',
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

export const lightTheme = createTheme({
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
});
