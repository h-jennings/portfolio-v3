import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from '../sprinkles.css';
import { tokenVars } from '../tokens.css';

export const unorderedList = style([
  {
    listStyle: 'unset',
    listStyleType: 'disc',
  },
  sprinkles({
    color: 'text1',
    paddingLeft: 's',
  }),
]);

globalStyle(`${unorderedList} ul`, {
  paddingLeft: tokenVars.space.l,
  listStyle: 'unset',
  listStyleType: 'disc',
});
