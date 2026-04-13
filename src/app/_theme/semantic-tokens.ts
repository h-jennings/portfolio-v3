import { defineSemanticTokens } from '@pandacss/dev';
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

const colorsDark = {
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

type ColorKey = keyof typeof colorsDark;

const colors = Object.keys(colorsDark).reduce(
  (acc, key) => {
    acc[key as ColorKey] = {
      value: {
        base: colorsLight[key as ColorKey],
        _dark: colorsDark[key as ColorKey],
      },
    };
    return acc;
  },
  {} as Record<ColorKey, { value: { base: string; _dark: string } }>,
);

const lightShadowColor = 'rgb(0 0 0 / 0.06)';
const lightLayers = [
  `0px 0px 0px 1px ${lightShadowColor}`,
  `0px 1px 1px -0.5px ${lightShadowColor}`,
  `0px 3px 3px -1.5px ${lightShadowColor}`,
  `0px 6px 6px -3px ${lightShadowColor}`,
  `0px 12px 12px -6px ${lightShadowColor}`,
  `0px 24px 24px -12px ${lightShadowColor}`,
  `0px 48px 48px -24px ${lightShadowColor}`,
  `0px 96px 96px -48px ${lightShadowColor}`,
];
const lightElevation = (level: number) =>
  lightLayers.slice(0, level + 1).join(', ');

const hi = {
  base: 'rgba(255,255,255,0.02)',
  mid: 'rgba(255,255,255,0.05)',
  high: 'rgba(255,255,255,0.08)',
  peak: 'rgba(255,255,255,0.11)',
};
const ring = {
  base: 'rgba(255,255,255,0.02)',
  mid: 'rgba(255,255,255,0.04)',
  high: 'rgba(255,255,255,0.06)',
};
const drop = 'rgba(0,0,0,0.18)';

const darkElevations = [
  'none',
  `inset 0 0 0 1px ${ring.base}`,
  [
    `inset 0 1px 0 0 ${hi.base}`,
    `inset 0 0 0 1px ${ring.base}`,
    `0 1px 1px -0.5px ${drop}`,
  ].join(', '),
  [
    `inset 0 1px 0 0 ${hi.mid}`,
    `inset 0 0 0 1px ${ring.base}`,
    `0 0 0 1px rgba(0,0,0,0.12)`,
    `0 1px 1px -0.5px ${drop}`,
    `0 3px 3px -1.5px ${drop}`,
  ].join(', '),
  [
    `inset 0 1px 0 0 ${hi.mid}`,
    `inset 0 0 0 1px ${ring.mid}`,
    `0 0 0 1px rgba(0,0,0,0.14)`,
    `0 1px 1px -0.5px ${drop}`,
    `0 3px 3px -1.5px ${drop}`,
    `0 6px 6px -3px ${drop}`,
  ].join(', '),
  [
    `inset 0 1px 0 0 ${hi.high}`,
    `inset 0 0 0 1px ${ring.mid}`,
    `0 0 0 1px rgba(0,0,0,0.16)`,
    `0 1px 1px -0.5px ${drop}`,
    `0 3px 3px -1.5px ${drop}`,
    `0 6px 6px -3px ${drop}`,
    `0 12px 12px -6px ${drop}`,
  ].join(', '),
  [
    `inset 0 1px 0 0 ${hi.high}`,
    `inset 0 0 0 1px ${ring.high}`,
    `0 0 0 1px rgba(0,0,0,0.18)`,
    `0 1px 1px -0.5px ${drop}`,
    `0 3px 3px -1.5px ${drop}`,
    `0 6px 6px -3px ${drop}`,
    `0 12px 12px -6px ${drop}`,
    `0 24px 24px -12px ${drop}`,
  ].join(', '),
  [
    `inset 0 1px 0 0 ${hi.peak}`,
    `inset 0 0 0 1px ${ring.high}`,
    `0 0 0 1px rgba(0,0,0,0.20)`,
    `0 1px 1px -0.5px ${drop}`,
    `0 3px 3px -1.5px ${drop}`,
    `0 6px 6px -3px ${drop}`,
    `0 12px 12px -6px ${drop}`,
    `0 24px 24px -12px ${drop}`,
    `0 48px 48px -24px ${drop}`,
  ].join(', '),
];

const elevationShadows = Object.fromEntries(
  darkElevations.map((dark, i) => [
    `elevation${i}`,
    { value: { base: lightElevation(i), _dark: dark } },
  ]),
);

export const semanticTokens = defineSemanticTokens({
  colors: {
    ...colors,
    text1: {
      value: {
        base: 'black',
        _dark: 'white',
      },
    },
  },
  shadows: elevationShadows,
});
