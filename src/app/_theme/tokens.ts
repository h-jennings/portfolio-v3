import { createFluidValue } from '@/app/_styles/create-fluid-value';
import { defineTokens } from '@pandacss/dev';

const getConfigFluidValue = (minSize: number, maxSize: number) =>
  createFluidValue(minSize, maxSize, 360, 1024);

export const tokens = defineTokens({
  colors: {
    uiBg: {
      value: '{colors.slate1}',
    },
    surface1: {
      value: '{colors.slate3}',
    },
    surface2: {
      value: '{colors.slate12}',
    },
    text2: {
      value: '{colors.slate11}',
    },
    text3: {
      value: '{colors.gold9}',
    },
    text4: {
      value: '{colors.slate1}',
    },
  },
  spacing: {
    none: { value: 0 },
    '3xs': { value: getConfigFluidValue(4, 5) },
    '2xs': { value: getConfigFluidValue(8, 10) },
    xs: { value: getConfigFluidValue(12, 15) },
    s: { value: getConfigFluidValue(16, 20) },
    m: { value: getConfigFluidValue(24, 30) },
    l: { value: getConfigFluidValue(32, 40) },
    xl: { value: getConfigFluidValue(48, 60) },
    '2xl': { value: getConfigFluidValue(64, 80) },
    '3xl': { value: getConfigFluidValue(96, 120) },
  },
  sizes: {
    prose: { value: '60ch' },
    full: { value: '100%' },
    channel: { value: '700px' },
    screenW: { value: '100vw' },
    screenH: { value: '100vh' },
    desktop: { value: '1440px' },
  },
  radii: {
    none: { value: '0' },
    round: { value: '50%' },
    pill: { value: '9999px' },
    card: { value: '15px' },
  },
  fonts: {
    primary: { value: 'var(--font-sans)' },
    serif: { value: 'var(--font-serif)' },
    mono: { value: 'var(--font-mono)' },
  },
  fontWeights: {
    bold: { value: '700' },
    regular: { value: '400' },
  },
  fontSizes: {
    '1': { value: getConfigFluidValue(13, 16) },
    '2': { value: getConfigFluidValue(16, 20) },
    '3': { value: getConfigFluidValue(20, 25) },
    '4': { value: getConfigFluidValue(25, 31) },
    '5': { value: getConfigFluidValue(31, 39) },
    '6': { value: getConfigFluidValue(39, 49) },
    '7': { value: getConfigFluidValue(49, 61) },
    '8': { value: getConfigFluidValue(61, 76) },
  },
  lineHeights: {
    tight: { value: '1' },
    body: { value: '1.5' },
    loose: { value: '2' },
  },
  zIndex: {
    under: { value: -1 },
    over: { value: 1 },
    init: { value: 0 },
    nuclear: { value: 9999 },
  },
  shadows: {
    focus: { value: '0 0 0 3px {colors.gold6}' },
  },
  durations: {
    default: {
      value: '225ms',
    },
  },
  easings: {
    default: {
      value: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  animations: {
    skeleton: {
      value: 'skeleton 8s ease-in-out infinite',
    },
  },
});
