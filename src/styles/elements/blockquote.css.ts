import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from '../sprinkles.css';
import { themeVars } from '../theme.css';
import { tokenVars } from '../tokens.css';

export const blockquote = style([
  {
    borderLeft: `4px solid ${themeVars.colors.slate10}`,
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
  fontSize: tokenVars.fontSizes[1],
  color: themeVars.colors.text1,
});

globalStyle(`${blockquote} > p:last-of-type`, {
  margin: 0,
});
