import { createVar, style } from '@vanilla-extract/css';
import { ds } from '../ds.css';
import { sprinkles } from '../sprinkles.css';

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
        width: ds.tokens.sizes.full,
        height: 0,
        borderTop: `1px dashed ${ds.theme.colors.slate8}`,
        position: 'absolute',
        bottom: bottom,
        left: 0,
      },
      vars: {
        [bottom]: `calc((${ds.tokens.space.m} / 2) * -1)`,
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
