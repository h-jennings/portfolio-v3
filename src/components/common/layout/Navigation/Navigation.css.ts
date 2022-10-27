import { sprinkles } from '@/styles/sprinkles.css';
import { style } from '@vanilla-extract/css';

export const root = style([
  { gridArea: 'nav' },
  sprinkles({
    paddingTop: { initial: 'm', bp1: 'xl' },
    paddingBottom: '2xl',
  }),
]);

export const inner = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
]);
