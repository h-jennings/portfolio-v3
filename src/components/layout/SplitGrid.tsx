import { styled } from '@/stitches.config';

export const SplitGrid = styled('div', {
  d: 'grid',
  columnGap: '$3',
  rowGap: '$7',
  gtc: '1fr',
  '@bp2': {
    gtc: 'repeat(2, 1fr)',
  },
  '@bp3': {
    gtc: '1fr 60%',
  },
});
