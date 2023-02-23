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
import {
  createGlobalTheme,
  createGlobalThemeContract,
} from '@vanilla-extract/css';
import { createFluidValue } from './create-fluid-value';

const colorsDark = {
  ...goldDark,
  ...greenDark,
  ...slateDark,
  ...greenDark,
  ...yellowDark,
  ...tomatoDark,
} as const;

const colorsLight = {
  ...gold,
  ...green,
  ...slate,
  ...green,
  ...yellow,
  ...tomato,
} as const;

const themeVars = createGlobalThemeContract(
  {
    colors: {
      ...colorsDark,
      uiBg: null,
      surface1: null,
      surface2: null,
      text1: null,
      text2: null,
      text3: null,
      text4: null,
    },
  },
  (_, path) => path.join('-'),
);

createGlobalTheme('html.dark-theme', themeVars, {
  colors: {
    ...colorsDark,
    uiBg: colorsDark.slate1,
    surface1: colorsDark.slate3,
    surface2: colorsDark.slate12,
    text1: 'white',
    text2: colorsDark.slate11,
    text3: colorsDark.gold9,
    text4: colorsDark.slate1,
  },
});

createGlobalTheme('html.light-theme', themeVars, {
  colors: {
    ...colorsLight,
    uiBg: colorsLight.slate1,
    surface1: colorsLight.slate3,
    surface2: colorsLight.slate12,
    text1: 'black',
    text2: colorsLight.slate11,
    text3: colorsLight.gold9,
    text4: colorsLight.slate1,
  },
});

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

const tokenVars = createGlobalTheme(':root', {
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
    mono: '"Jetbrains Mono", monospace',
  },
  shadows: {
    focus: `0 0 0 3px ${themeVars.colors.gold6}`,
  },
  transitions: {
    default: '225ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  fontWeights: {
    bold: '700',
    regular: '400',
  },
  fontSizes: {
    '1': getConfigFluidValue(13, 16),
    '2': getConfigFluidValue(16, 20),
    '3': getConfigFluidValue(20, 25),
    '4': getConfigFluidValue(25, 31),
    '5': getConfigFluidValue(31, 39),
    '6': getConfigFluidValue(39, 49),
    '7': getConfigFluidValue(49, 61),
    '8': getConfigFluidValue(61, 76),
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

export const ds = {
  theme: themeVars,
  tokens: tokenVars,
} as const;
