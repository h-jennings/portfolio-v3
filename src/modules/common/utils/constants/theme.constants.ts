import { theme } from '@/stitches.config';

export const FONT_SIZE_VARIANTS: Record<
  keyof typeof theme.fontSizes,
  { fontSize: `$${keyof typeof theme.fontSizes}` }
> = {
  1: {
    fontSize: '$1',
  },
  2: {
    fontSize: '$2',
  },
  3: {
    fontSize: '$3',
  },
  4: {
    fontSize: '$4',
  },
  5: {
    fontSize: '$5',
  },
  6: {
    fontSize: '$6',
  },
  7: {
    fontSize: '$7',
  },
  8: {
    fontSize: '$8',
  },
};

export const GAP_SPACE_VARIANTS: Record<
  keyof typeof theme.space,
  { gap: `$${keyof typeof theme.space}` }
> = {
  '3xs': {
    gap: '$3xs',
  },
  '2xs': {
    gap: '$2xs',
  },
  xs: {
    gap: '$xs',
  },
  s: {
    gap: '$s',
  },
  m: {
    gap: '$m',
  },
  l: {
    gap: '$l',
  },
  xl: {
    gap: '$xl',
  },
  '2xl': {
    gap: '$2xl',
  },
  '3xl': {
    gap: '$2xl',
  },
};
