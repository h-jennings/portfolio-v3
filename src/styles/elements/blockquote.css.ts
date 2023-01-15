import { globalStyle, style } from '@vanilla-extract/css';
import { ds } from '../ds.css';
import { sprinkles } from '../sprinkles.css';

export const blockquote = style([
  {
    borderLeft: `4px solid ${ds.theme.colors.slate10}`,
    borderRadius: 5,
  },
  sprinkles({
    paddingLeft: 'm',
    paddingY: 'xs',
    backgroundColor: 'slate3',
    marginBottom: 's',
  }),
]);

globalStyle(`${blockquote} > p`, {
  fontSize: ds.tokens.fontSizes[1],
  color: ds.theme.colors.text1,
});

globalStyle(`${blockquote} > p:last-of-type`, {
  margin: 0,
});
