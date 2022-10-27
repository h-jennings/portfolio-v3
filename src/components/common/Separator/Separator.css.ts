import { sprinkles } from '@/styles/sprinkles.css';
import { style } from '@vanilla-extract/css';

export const root = style([
  sprinkles({
    width: 'full',
    paddingTop: 'm',
    paddingBottom: 'm',
  }),
]);

export const dot = style([
  { width: 2, height: 2 },
  sprinkles({
    borderRadius: 'round',
    backgroundColor: 'slate12',
  }),
]);
