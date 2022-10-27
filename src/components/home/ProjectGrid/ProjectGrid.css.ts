import { sprinkles } from '@/styles/sprinkles.css';
import { BREAKPOINTS, tokenVars } from '@/styles/tokens.css';
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
  marginLeft: tokenVars.space.s,
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
