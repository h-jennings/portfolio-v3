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
export const StyledLink = styled('a', {
  d: 'inline',
  color: '$text1',
  fontSize: '$2',
  transition: '$default',
  '&:focus': {
    outline: 'none',
    boxShadow: '$focus',
  },
});
