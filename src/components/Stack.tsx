import { config, styled } from '@/stitches.config';
import type * as Stitches from '@stitches/react';

/**
 * Selectors
 */
const child = '> *';
const childWithGap = '> * + *';

/**
 * Generate `gap` prop values from theme
 */
const { space } = config.theme;
type TSpaceKey = keyof typeof space;

const gap = Object.keys(space).reduce(
  (acc, cv) => ({
    ...acc,
    [cv]: { [childWithGap]: { $$stackGap: `$space$${cv}` } },
  }),
  {},
) as { [key in TSpaceKey]: Stitches.CSS };

/**
 * Stack
 */
export const Stack = styled('div', {
  display: 'flex',
  // reset list styles
  listStyleType: 'none',
  paddingLeft: 0,
  [child]: {
    margin: 0,
  },
  [childWithGap]: {
    $$stackGapLeft: 'initial',
    $$stackGapRight: 'initial',
    $$stackGapTop: 'initial',
    marginLeft: '$$stackGapLeft',
    marginTop: '$$stackGapTop',
    marginRight: '$$stackGapRight',
  },
  variants: {
    direction: {
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        [childWithGap]: {
          $$stackGapLeft: '$$stackGap',
        },
      },
      'row-reverse': {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        [childWithGap]: {
          $$stackGapRight: '$$stackGap',
        },
      },
      column: {
        flexDirection: 'column',
        [childWithGap]: {
          $$stackGapTop: '$$stackGap',
        },
      },
    },
    gap,
  },
  defaultVariants: {
    gap: 's',
    direction: 'column',
  },
});
