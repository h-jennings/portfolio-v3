import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { BREAKPOINTS } from '../ds.css';
import { sprinkles } from '../sprinkles.css';

export const chip = recipe({
  base: [
    {
      whiteSpace: 'nowrap',
      fontSize: 12,
    },
    sprinkles({
      paddingX: '2xs',
      paddingY: '3xs',
      borderRadius: 'pill',
      lineHeight: 'tight',
    }),
  ],
  variants: {
    variant: {
      darker: sprinkles({
        backgroundColor: 'gold5',
        color: 'gold10',
      }),
      default: sprinkles({
        backgroundColor: 'gold7',
        color: 'gold10',
      }),
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const imageGrid = style([
  sprinkles({
    marginBottom: { '<bp1': 'l' },
    display: 'grid',
    gap: 's',
  }),
  {
    gridTemplateColumns: 'repeat(3, 40%)',
    '@media': {
      [BREAKPOINTS.bp1]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
    },
  },
]);

export const mediaContainer = recipe({
  base: [
    {
      isolation: 'isolate',
      overflow: 'hidden',
    },
    sprinkles({
      borderRadius: 'card',
      height: 'full',
      backgroundColor: 'slate8',
    }),
  ],
  variants: {
    item: {
      0: {
        gridColumn: '1 / span 2',
      },
      1: {
        gridColumn: '3 / -1',
      },
      2: {
        gridColumn: '1 / -1',
      },
    },
  },
});
