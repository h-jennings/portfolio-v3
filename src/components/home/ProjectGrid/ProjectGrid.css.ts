import { BREAKPOINTS, ds } from '@/styles/ds.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { style } from '@vanilla-extract/css';

export const cardContainer = style([
  sprinkles({
    marginBottom: 'l',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
  }),
]);

export const cardWrapper = style({
  minWidth: '90%',
  marginLeft: ds.tokens.space.s,
  selectors: {
    '&:first-of-type': {
      marginLeft: 0,
    },
  },
  '@media': {
    [BREAKPOINTS.bp1]: {
      minWidth: '45%',
    },
    [BREAKPOINTS.bp2]: {
      minWidth: 220,
    },
  },
});
