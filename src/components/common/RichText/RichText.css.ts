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
  {
    listStyleType: 'disc',
  },
  sprinkles({
    color: 'text1',
    paddingLeft: 's',
    marginBottom: 'm',
  }),
]);

globalStyle(`${unorderedList} ul`, {
  paddingLeft: tokenVars.space.m,
});

globalStyle(`${unorderedList} ul, ol`, {
  marginBottom: tokenVars.space['2xs'],
});

export const orderedList = style([
  unorderedList,
  {
    listStyleType: 'decimal',
  },
]);

export const listItem = sprinkles({
  marginLeft: 'none',
  marginBottom: 'xs',
  paddingLeft: 'none',
});

globalStyle(`${listItem} > ul li:first-of-type, ol li:first-of-type`, {
  paddingTop: tokenVars.space.xs,
});
