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

export const colorsDark = {
  ...goldDark,
  ...greenDark,
  ...slateDark,
  ...greenDark,
  ...yellowDark,
  ...tomatoDark,
} as const;

export const colorsLight = {
  ...gold,
  ...green,
  ...slate,
  ...green,
  ...yellow,
  ...tomato,
} as const;
