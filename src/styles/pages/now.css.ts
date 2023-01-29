import { style } from '@vanilla-extract/css';
import { ds } from '../ds.css';
import { sprinkles } from '../sprinkles.css';

export const updatesWrapper = style([
  sprinkles({ display: 'flex', flexDirection: 'column' }),
]);

export const update = style([
  sprinkles({
    paddingTop: 'm',
  }),
  {
    borderTop: `1px solid ${ds.theme.colors.slate6}`,
    ':first-of-type': {
      paddingTop: 0,
      borderTop: 'none',
    },
  },
]);
