import { css } from '@/stitches.config';

export const buttonReset = css({
  border: 'none',
  m: 0,
  p: 0,
  width: 'auto',
  overflow: 'visible',
  background: 'transparent',
  color: 'inherit',
  lineHeight: 'normal',
  fontSmooth: 'inherit',
  appearance: 'none',
  cursor: 'pointer',
  transition: '$default',
  transitionProperty: 'box-shadow',
  '&:focus': {
    outline: 'none',
    boxShadow: '$focus',
  },
});
