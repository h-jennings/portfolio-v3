import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { ds } from '../ds.css';
import { sprinkles } from '../sprinkles.css';

const hoverColor = createVar();

export const link = recipe({
  base: [
    sprinkles({
      transition: 'default',
    }),
    {
      vars: {
        [hoverColor]: 'inherit',
      },
      display: 'inline',
      cursor: 'pointer',
      transitionProperty: 'box-shadow, color',
      ':focus': {
        outline: 'none',
        boxShadow: ds.tokens.shadows.focus,
      },
      ':hover': {
        color: hoverColor,
      },
    },
  ],
  variants: {
    size: {
      1: sprinkles({ fontSize: 1 }),
      2: sprinkles({ fontSize: 2 }),
      3: sprinkles({ fontSize: 3 }),
      4: sprinkles({ fontSize: 4 }),
      5: sprinkles({ fontSize: 5 }),
      6: sprinkles({ fontSize: 6 }),
      7: sprinkles({ fontSize: 7 }),
      8: sprinkles({ fontSize: 8 }),
    },
    color: {
      1: [
        { vars: { [hoverColor]: ds.theme.colors.slate11 } },
        sprinkles({ color: 'text1' }),
      ],
      2: [
        { vars: { [hoverColor]: ds.theme.colors.slate9 } },
        sprinkles({ color: 'text2' }),
      ],
      3: [
        { vars: { [hoverColor]: ds.theme.colors.gold8 } },
        sprinkles({ color: 'text3' }),
      ],
      4: [
        { vars: { [hoverColor]: ds.theme.colors.slate2 } },
        sprinkles({ color: 'text4' }),
      ],
    },
    leading: {
      tight: sprinkles({ lineHeight: 'tight' }),
      body: sprinkles({ lineHeight: 'body' }),
      loose: sprinkles({ lineHeight: 'loose' }),
    },
    underline: {
      whileHover: {
        position: 'relative',
        selectors: {
          '&:hover:after': {
            transition: ds.tokens.transitions.default,
            transitionProperty: 'transform, opacity, color',
            transform: 'translateY(0%)',
            opacity: 1,
          },
        },
        ':after': {
          content: '',
          position: 'absolute',
          opacity: 0,
          width: ds.tokens.sizes.full,
          height: 2,
          backgroundColor: hoverColor,
          left: 0,
          bottom: -2,
          transition: ds.tokens.transitions.default,
          transitionProperty: 'transform, opacity, color',
          transform: 'translateY(100%)',
        },
      },
      true: {
        textDecoration: 'underline',
      },
    },
  },
  defaultVariants: {
    color: 1,
    leading: 'tight',
    size: 2,
  },
});
