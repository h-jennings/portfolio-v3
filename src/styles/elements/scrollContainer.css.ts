import { style } from '@vanilla-extract/css';
import { sprinkles } from '../sprinkles.css';

const SCROLLBAR_SIZE = 10;

export const scrollContainer = {
  area: style([
    sprinkles({ height: 'full', width: 'full' }),
    { overflow: 'hidden' },
  ]),
  viewPort: style([
    sprinkles({ height: 'full', width: 'full' }),
    { borderRadius: 'inherit' },
  ]),
  scrollBar: style([
    sprinkles({
      display: 'flex',
      backgroundColor: { initial: 'uiBg', hover: 'slate4' },
    }),
    {
      userSelect: 'none',
      touchAction: 'none',
      padding: 2,
      transition: 'background-color 160ms ease-out',
      selectors: {
        '&[data-orientation="horizontal"]': {
          flexDirection: 'column',
          height: SCROLLBAR_SIZE,
        },
      },
    },
  ]),
  scrollThumb: style([
    sprinkles({
      backgroundColor: 'surface2',
      position: 'relative',
    }),
    {
      flex: 1,
      borderRadius: SCROLLBAR_SIZE,
      ':before': {
        content: '',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        minWidth: 44,
        minHeight: 44,
      },
    },
  ]),
};
