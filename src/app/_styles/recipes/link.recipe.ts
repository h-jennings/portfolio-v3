import { defineRecipe } from '@pandacss/dev';

export const linkRecipe = defineRecipe({
  className: 'link',
  description:
    'A link that can be styled with different colors and underlines.',
  base: {
    '--activeColor': 'inherit',
    cursor: 'pointer',
    transitionDuration: 'default',
    transitionTimingFunction: 'default',
    transitionProperty: 'box-shadow, color',
    _focus: {
      outline: 'none',
      boxShadow: 'focus',
    },
  },
  variants: {
    color: {
      primary: {
        color: 'text1',
        '--activeColor': 'colors.slate11',
        _hover: {
          color: 'var(--activeColor)',
        },
        _focus: {
          color: 'var(--activeColor)',
        },
      },
      secondary: {
        color: 'text2',
        '--activeColor': 'colors.slate9',
        _hover: {
          color: 'var(--activeColor)',
        },
        _focus: {
          color: 'var(--activeColor)',
        },
      },
      accent: {
        color: 'text3',
        '--activeColor': 'colors.gold8',
        _hover: {
          color: 'var(--activeColor)',
        },
        _focus: {
          color: 'var(--activeColor)',
        },
      },
    },
    underline: {
      true: {
        pos: 'relative',
        _hover: {
          _after: {
            transform: 'translateY(0%)',
            opacity: 1,
          },
        },
        _after: {
          content: '""',
          pos: 'absolute',
          opacity: 0,
          w: 'full',
          h: 2,
          bgColor: 'var(--activeColor)',
          left: 0,
          bottom: -2,
          transitionDuration: 'default',
          transitionTimingFunction: 'default',
          transitionProperty: 'transform, opacity, color',
          transform: 'translateY(100%)',
        },
      },
    },
  },
});
