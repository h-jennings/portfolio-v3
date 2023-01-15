import { BREAKPOINTS } from '@/styles/ds.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { style } from '@vanilla-extract/css';

export const dot = style([
  sprinkles({ backgroundColor: 'slate11', borderRadius: 'round' }),
  {
    height: 2,
    width: 2,
  },
]);

export const footer = {
  wrapper: style([
    sprinkles({
      display: 'grid',
      alignItems: 'flex-end',
      justifyContent: 'start',
      columnGap: 's',
      rowGap: { initial: 'xl', bp1: 's' },
      width: 'full',
    }),
    {
      gridTemplateAreas: `'a b'
                          'c c'`,
      gridTemplateColumns: 'repeat(2, 1fr)',
      '@media': {
        [BREAKPOINTS.bp1]: {
          gridTemplateAreas: `'a b c'`,
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
      },
    },
  ]),
};

export const weather = {
  wrapper: style([
    sprinkles({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    }),
    {
      justifySelf: 'end',
      alignItems: 'center',
      '@media': {
        [BREAKPOINTS.bp1]: {
          justifySelf: 'start',
        },
      },
    },
  ]),
};
