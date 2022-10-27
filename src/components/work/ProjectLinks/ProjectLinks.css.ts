import { sprinkles } from '@/styles/sprinkles.css';
import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const root = style([
  sprinkles({
    paddingY: 'm',
    display: 'flex',
  }),
  {
    borderTop: `1px dashed ${themeVars.colors.slate8}`,
    borderBottom: `1px dashed ${themeVars.colors.slate8}`,
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
