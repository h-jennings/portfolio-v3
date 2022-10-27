import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { sprinkles } from '../sprinkles.css';
import { tokenVars } from '../tokens.css';

export const yearTitle = style([
  sprinkles({
    marginBottom: 'xs',
    top: 'none',
  }),
  {
    transform: 'translateX(0%)',
    left: calc(tokenVars.space.l).multiply(-1).toString(),
    '@media': {
      '(width >= 924px)': {
        position: 'absolute',
        transform: 'translateX(-100%)',
      },
    },
  },
]);
