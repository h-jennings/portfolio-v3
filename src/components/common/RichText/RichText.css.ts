import { unorderedList as list } from '@/styles/elements/list.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { tokenVars } from '@/styles/tokens.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const paragraph = style({
  selectors: {
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
});

export const inlineElementReset = style({
  fontSize: 'inherit',
  color: 'inherit',
  lineHeight: 'inherit',
});

export const unorderedList = style([
  list,
  sprinkles({
    marginBottom: 'm',
  }),
]);

globalStyle(`${unorderedList} ul, ol`, {
  marginBottom: tokenVars.space['2xs'],
});

export const orderedList = style([
  unorderedList,
  {
    listStyle: 'none',
    counterReset: 'listCounter',
  },
]);

globalStyle(`${orderedList} > li:before`, {
  counterIncrement: 'listCounter',
  display: 'inline-block',
  content: 'counter(listCounter)"."',
  width: '1em',
  marginLeft: '-1em',
});

export const listItem = style([
  {
    listStyle: 'none',
    ':before': {
      display: 'inline-block',
      content: '-',
      width: '1em',
      marginLeft: '-1em',
    },
  },
  sprinkles({
    marginLeft: 'none',
    marginBottom: 'xs',
    paddingLeft: 'none',
  }),
]);

globalStyle(`${listItem} ul li:first-of-type, ol li:first-of-type`, {
  paddingTop: tokenVars.space.xs,
});
