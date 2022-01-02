import { styled } from '@/stitches.config';
import { BodyText } from './Text';

export const BlockQuote = styled('blockquote', {
  pl: '$m',
  py: '$xs',
  backgroundColor: '$slate3',
  borderLeft: '4px solid $slate10',
  borderRadius: '5px',
  [`& > ${BodyText}`]: {
    fontSize: '$1',
    color: '$text1',
    '&:last-of-type': {
      m: 0,
    },
  },
  mb: '$s',
});
