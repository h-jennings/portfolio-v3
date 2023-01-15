import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { ds } from '../ds.css';
import { sprinkles } from '../sprinkles.css';

export const yearTitle = style([
  sprinkles({
    marginBottom: 'xs',
    top: 'none',
  }),
  {
    transform: 'translateX(0%)',
    left: calc(ds.tokens.space.l).multiply(-1).toString(),
    '@media': {
      '(width >= 924px)': {
        position: 'absolute',
        transform: 'translateX(-100%)',
      },
    },
  },
]);
