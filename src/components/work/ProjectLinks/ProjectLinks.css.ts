import { ds } from '@/styles/ds.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { style } from '@vanilla-extract/css';

export const root = style([
  sprinkles({
    paddingY: 'm',
    display: 'flex',
  }),
  {
    borderTop: `1px dashed ${ds.theme.colors.slate8}`,
    borderBottom: `1px dashed ${ds.theme.colors.slate8}`,
  },
]);

export const link = {
  root: style([
    {
      flex: 1,
    },
    sprinkles({
      display: 'flex',
      height: 'full',
      width: 'full',
      justifyContent: 'center',
    }),
  ]),
};
