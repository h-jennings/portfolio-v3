import { styled } from '@/stitches.config';

export const UnorderedList = styled('ul', {
  listStyle: 'unset',
  listStyleType: 'disc',
  color: '$text1',
  pl: '$s',
  ul: {
    pl: '$l',
    listStyle: 'unset',
    listStyleType: 'disc',
  },
});
