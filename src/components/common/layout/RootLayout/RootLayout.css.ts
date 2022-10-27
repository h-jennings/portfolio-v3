import { sprinkles } from '@/styles/sprinkles.css';
import { style } from '@vanilla-extract/css';

export const container = style([
  sprinkles({
    width: 'full',
    backgroundColor: 'uiBg',
    height: 'full',
    minHeight: 'screenH',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingX: 's',
  }),
]);

export const wrapper = style([
  {
    gridTemplateAreas: `'nav'
                      'main'
                      'footer'`,
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr auto',
  },
  sprinkles({
    display: 'grid',
    maxWidth: 'channel',
    width: 'full',
    height: 'full',
    minHeight: 'screenH',
    position: 'relative',
    zIndex: 'init',
  }),
]);

export const main = style([
  sprinkles({
    display: 'flex',
    width: 'full',
  }),
  {
    zIndex: 1,
    gridArea: 'main',
  },
]);
