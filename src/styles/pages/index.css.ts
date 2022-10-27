import { createVar, style } from '@vanilla-extract/css';
import { sprinkles } from '../sprinkles.css';
import { themeVars } from '../theme.css';
import { tokenVars } from '../tokens.css';

export const arrowLink = {
  root: style([
    sprinkles({
      display: 'grid',
      gap: '2xs',
      justifyContent: 'end',
      alignContent: 'center',
    }),
    {
      gridTemplateColumns: 'auto auto',
    },
  ]),
};

const bottom = createVar();

export const writings = {
  listItem: style([
    sprinkles({
      position: 'relative',
    }),
    {
      ':after': {
        content: '',
        width: tokenVars.sizes.full,
        height: 0,
        borderTop: `1px dashed ${themeVars.colors.slate8}`,
        position: 'absolute',
        bottom: bottom,
        left: 0,
      },
      vars: {
        [bottom]: `calc((${tokenVars.space.m} / 2) * -1)`,
      },
    },
  ]),
};

export const connectLinkListItem = {
  root: style([
    sprinkles({
      display: 'grid',
      alignItems: 'center',
      gap: 's',
    }),
    {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  ]),
};
