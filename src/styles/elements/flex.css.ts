import { GAP } from '@utils/common/constants/space.constants';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../sprinkles.css';

export const flex = recipe({
  base: sprinkles({ display: 'flex' }),
  variants: {
    direction: {
      row: sprinkles({ flexDirection: 'row' }),
      column: sprinkles({ flexDirection: 'column' }),
      rowReverse: sprinkles({ flexDirection: 'row-reverse' }),
      columnReverse: sprinkles({ flexDirection: 'column-reverse' }),
    },
    align: {
      start: sprinkles({ alignItems: 'flex-start' }),
      center: sprinkles({ alignItems: 'center' }),
      end: sprinkles({ alignItems: 'flex-end' }),
      stretch: sprinkles({ alignItems: 'stretch' }),
      baseline: sprinkles({ alignItems: 'baseline' }),
    },
    justify: {
      start: sprinkles({ justifyContent: 'flex-start' }),
      center: sprinkles({ justifyContent: 'center' }),
      end: sprinkles({ justifyContent: 'flex-end' }),
      between: sprinkles({ justifyContent: 'space-between' }),
    },
    wrap: {
      noWrap: sprinkles({ flexWrap: 'nowrap' }),
      wrap: sprinkles({ flexWrap: 'wrap' }),
    },
    inline: {
      true: sprinkles({ display: 'inline-flex' }),
    },
    gap: GAP,
  },
  defaultVariants: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
    wrap: 'noWrap',
  },
});
