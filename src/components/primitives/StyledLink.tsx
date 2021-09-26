import { styled } from '@/stitches.config';

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
