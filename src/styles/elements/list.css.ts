import { globalStyle, style } from '@vanilla-extract/css';
import { ds } from '../ds.css';
import { sprinkles } from '../sprinkles.css';

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
  paddingLeft: ds.tokens.space.l,
  listStyle: 'unset',
  listStyleType: 'disc',
});
