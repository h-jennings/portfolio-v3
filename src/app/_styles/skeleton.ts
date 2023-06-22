import { cva } from 'ds/css';

export const skeleton = cva({
  base: {
    animation: 'skeleton',
    backgroundSize: '400% 100%',
    backgroundImage:
      'linear-gradient(to right, var(--colors-slate1), var(--colors-slate3), var(--colors-slate3), var(--colors-slate1))',
  },
  variants: {
    type: {
      card: {
        rounded: 'card',
      },
      text: {
        rounded: '5px',
      },
    },
  },
});
