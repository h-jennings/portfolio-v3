import { ds } from '@/styles/ds.css';
import { buttonReset } from '@/styles/elements/button.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const toggle = {
  root: style([
    {
      gridTemplateColumns: 'repeat(3, 20px)',
      height: 30,
      width: 90,
      gap: 5,
    },
    sprinkles({
      display: 'grid',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'slate3',
      borderRadius: 'pill',
    }),
  ]),
};

export const button = {
  wrapper: style([
    sprinkles({
      display: 'grid',
      position: 'relative',
      zIndex: 'init',
    }),
    {
      placeItems: 'center',
      height: 20,
    },
  ]),
  root: recipe({
    base: [
      buttonReset,
      sprinkles({
        borderRadius: 'pill',
        display: 'block',
        transition: 'default',
      }),
      {
        gridArea: '1 / 1 / 1 / 1',
        transitionProperty: 'color',
        zIndex: 2,
        width: 15,
        height: 15,
      },
    ],
    variants: {
      isActive: {
        true: {
          color: ds.theme.colors.slate12,
        },
        false: {
          color: ds.theme.colors.slate8,
        },
      },
    },
  }),
  circle: style([
    sprinkles({
      zIndex: 'over',
      backgroundColor: 'slate5',
      borderRadius: 'round',
      position: 'absolute',
    }),
    {
      width: 20,
      height: 20,
    },
  ]),
};
