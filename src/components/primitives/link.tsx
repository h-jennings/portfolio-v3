import { css, styled } from '@/stitches.config';

export const linkFocus = css({
  transition: '$default',
  '&:focus': {
    outline: 'none',
    boxShadow: '$focus',
  },
});

const linkStyles = {
  d: 'inline',
  color: '$text1',
  fontSize: '$2',
};

export const link = css(linkFocus, { ...linkStyles });
export const Link = styled('a', {
  d: 'inline',
  color: '$text1',
  fontSize: '$2',
  transition: '$default',
  '&:focus': {
    outline: 'none',
    boxShadow: '$focus',
  },
  variants: {
    size: {
      1: { fontSize: '$1' },
      2: { fontSize: '$2' },
      3: { fontSize: '$3' },
      4: { fontSize: '$4' },
      5: { fontSize: '$5' },
      6: { fontSize: '$6' },
      7: { fontSize: '$7' },
      8: { fontSize: '$8' },
    },
    color: {
      1: { color: '$text1' },
      2: { color: '$text2' },
      3: { color: '$text3' },
      4: { color: '$text4' },
    },
  },
});
