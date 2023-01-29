import {
  COLUMN_GAP,
  GAP,
  ROW_GAP,
} from '@utils/common/constants/space.constants';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../sprinkles.css';

export const grid = recipe({
  base: sprinkles({ display: 'grid' }),
  variants: {
    center: {
      true: {
        placeItems: 'center',
      },
    },
    align: {
      start: sprinkles({ alignItems: 'start' }),
      center: sprinkles({ alignItems: 'center' }),
      end: sprinkles({ alignItems: 'end' }),
      stretch: {
        alignItems: 'stretch',
      },
      baseline: {
        alignItems: 'baseline',
      },
    },
    justify: {
      start: sprinkles({ justifyContent: 'start' }),
      center: sprinkles({ justifyContent: 'center' }),
      end: sprinkles({ justifyContent: 'end' }),
      between: sprinkles({ justifyContent: 'space-between' }),
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
      '1': {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
      auto1: {
        gridTemplateColumns: 'repeat(1, auto)',
      },
      '2': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      auto2: {
        gridTemplateColumns: 'repeat(2, auto)',
      },
      '3': {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      auto3: {
        gridTemplateColumns: 'repeat(3, auto)',
      },
      '4': {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
      auto4: {
        gridTemplateColumns: 'repeat(4, auto)',
      },
    },
    gap: GAP,
    gapX: COLUMN_GAP,
    gapY: ROW_GAP,
  },
  defaultVariants: {},
});
