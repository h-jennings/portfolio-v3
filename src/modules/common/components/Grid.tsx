import { styled } from '@/stitches.config';

export const Grid = styled('div', {
  boxSizing: 'border-box',
  display: 'grid',

  variants: {
    center: {
      true: {
        placeItems: 'center',
      },
    },
    align: {
      start: {
        alignItems: 'start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'end',
      },
      stretch: {
        alignItems: 'stretch',
      },
      baseline: {
        alignItems: 'baseline',
      },
    },
    justify: {
      start: {
        justifyContent: 'start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'end',
      },
      between: {
        justifyContent: 'space-between',
      },
    },
    flow: {
      row: {
        gridAutoFlow: 'row',
      },
      column: {
        gridAutoFlow: 'column',
      },
      dense: {
        gridAutoFlow: 'dense',
      },
      rowDense: {
        gridAutoFlow: 'row dense',
      },
      columnDense: {
        gridAutoFlow: 'column dense',
      },
    },
    columns: {
      1: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
      2: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      3: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      4: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    },
    gap: {
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
    },
    gapX: {
      '3xs': {
        columnGap: '$3xs',
      },
      '2xs': {
        columnGap: '$2xs',
      },
      xs: {
        columnGap: '$xs',
      },
      s: {
        columnGap: '$s',
      },
      m: {
        columnGap: '$m',
      },
      l: {
        columnGap: '$l',
      },
      xl: {
        columnGap: '$xl',
      },
      '2xl': {
        columnGap: '$2xl',
      },
      '3xl': {
        columnGap: '$xl',
      },
    },
    gapY: {
      '3xs': {
        rowGap: '$3xs',
      },
      '2xs': {
        rowGap: '$2xs',
      },
      xs: {
        rowGap: '$xs',
      },
      s: {
        rowGap: '$s',
      },
      m: {
        rowGap: '$m',
      },
      l: {
        rowGap: '$l',
      },
      xl: {
        rowGap: '$xl',
      },
      '2xl': {
        rowGap: '$2xl',
      },
      '3xl': {
        rowGap: '$xl',
      },
    },
  },
});
