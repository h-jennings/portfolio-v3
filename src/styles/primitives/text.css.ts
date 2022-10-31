import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../sprinkles.css';

export const text = recipe({
  base: [sprinkles({ fontFamily: 'primary' })],
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
    align: {
      left: sprinkles({ textAlign: 'left' }),
      center: sprinkles({ textAlign: 'center' }),
      right: sprinkles({ textAlign: 'right' }),
    },
    leading: {
      tight: sprinkles({ lineHeight: 'tight' }),
      body: sprinkles({ lineHeight: 'body' }),
      loose: sprinkles({ lineHeight: 'loose' }),
    },
    color: {
      1: sprinkles({ color: 'text1' }),
      2: sprinkles({ color: 'text2' }),
      3: sprinkles({ color: 'text3' }),
      4: sprinkles({ color: 'text4' }),
    },
    weight: {
      bold: sprinkles({ fontWeight: 'bold' }),
      regular: sprinkles({ fontWeight: 'regular' }),
    },
    family: {
      primary: sprinkles({ fontFamily: 'primary' }),
      serif: [sprinkles({ fontFamily: 'serif' }), { fontStyle: 'italic' }],
    },
  },
  defaultVariants: {
    color: 1,
    family: 'primary',
    leading: 'body',
    size: 2,
    weight: 'regular',
  },
});

// Design Elements
export const bodyText = text({ color: 1, leading: 'body', size: 2 });
export const pageHeader = text({
  color: 1,
  leading: 'body',
  size: 4,
  weight: 'regular',
  family: 'primary',
});
