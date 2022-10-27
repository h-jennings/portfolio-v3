import {
  createGlobalTheme,
  createGlobalThemeContract,
} from '@vanilla-extract/css';
import { createFluidValue } from './create-fluid-value';

const getConfigFluidValue = (minSize: number, maxSize: number) =>
  createFluidValue(minSize, maxSize, 360, 1024);

export const BREAKPOINTS = {
  bp1: '(width >= 520px)',
  '<bp1': '(width < 519px)',
  bp2: '(width >= 768px)',
  '<bp2': '(width < 767px)',
  bp3: '(width >= 1040px)',
  '<bp3': '(width < 1039px)',
  bp4: '(width >= 1800px)',
  '<bp4': '(width < 1799px)',
} as const;

export const tokenVars = createGlobalThemeContract(
  {
    space: {
      none: null,
      '3xs': null,
      '2xs': null,
      xs: null,
      s: null,
      m: null,
      l: null,
      xl: null,
      '2xl': null,
      '3xl': null,
    },
    sizes: {
      full: null,
      channel: null,
      screenW: null,
      screenH: null,
      desktop: null,
      prose: null,
    },
    radii: {
      none: null,
      pill: null,
      round: null,
      card: null,
    },
    fonts: {
      primary: null,
      serif: null,
    },
    shadows: {
      focus: null,
    },
    transitions: {
      default: null,
    },
    fontWeights: {
      regular: null,
      bold: null,
    },
    fontSizes: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
    },
    lineHeights: {
      tight: null,
      body: null,
      loose: null,
    },
    zIndices: {
      under: null,
      over: null,
      init: null,
      nuclear: null,
    },
  },
  (_, path) => `${path.join('-')}`,
);

createGlobalTheme(':root', tokenVars, {
  space: {
    none: '0',
    '3xs': getConfigFluidValue(4, 5),
    '2xs': getConfigFluidValue(8, 10),
    xs: getConfigFluidValue(12, 15),
    s: getConfigFluidValue(16, 20),
    m: getConfigFluidValue(24, 30),
    l: getConfigFluidValue(32, 40),
    xl: getConfigFluidValue(48, 60),
    '2xl': getConfigFluidValue(64, 80),
    '3xl': getConfigFluidValue(96, 120),
  },
  sizes: {
    prose: '60ch',
    full: '100%',
    channel: '700px',
    screenW: '100vw',
    screenH: '100vh',
    desktop: '1440px',
  },
  radii: {
    none: '0',
    round: '50%',
    pill: '9999px',
    card: '15px',
  },
  fonts: {
    primary: '"Basier Circle", sans-serif',
    serif: '"Untitled Serif", Georgia, serif',
  },
  shadows: {
    focus: '0 0 0 3px var(--colors-gold6)',
  },
  transitions: {
    default: '225ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  fontWeights: {
    bold: '700',
    regular: '400',
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
    tight: '1',
    body: '1.5',
    loose: '2',
  },
  zIndices: {
    under: '-1',
    over: '1',
    init: '0',
    nuclear: '9999px',
  },
});
