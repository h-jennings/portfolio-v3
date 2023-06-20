import { css, cx } from 'ds/css';

export const inlineElementReset = css({
  fontSize: 'inherit',
  color: 'inherit',
  lineHeight: 'inherit',
});

export const unorderedList = css({
  listStyleType: 'disc',
  color: 'text1',
  pl: 'm',
  mb: 'm',
  '& ul': {
    pl: 'm',
  },
  '& ol, ul': {
    mb: '2xs',
  },
});

export const orderedList = cx(
  unorderedList,
  css({
    listStyleType: 'decimal',
  }),
);

export const listItem = css({
  ml: 'none',
  mb: 'xs',
  pl: 'none',
  _lastOfType: {
    mb: 'none',
  },
  '& > ul li:first-of-type, ol li:first-of-type': {
    pt: 'xs',
  },
});
