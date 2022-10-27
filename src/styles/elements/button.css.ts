import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from '../sprinkles.css';
import { themeVars } from '../theme.css';
import { tokenVars } from '../tokens.css';

export const buttonReset = style([
  sprinkles({
    margin: 'none',
    padding: 'none',
    transition: 'default',
  }),
  {
    border: 'none',
    width: 'auto',
    overflow: 'visible',
    background: 'transparent',
    color: 'inherit',
    lineHeight: 'normal',
    fontSmooth: 'inherit',
    appearance: 'none',
    cursor: 'pointer',
    transitionProperty: 'box-shadow',
    ':focus': {
      outline: 'none',
      boxShadow: tokenVars.shadows.focus,
    },
  },
]);

export const buttonLink = style([
  sprinkles({
    display: 'inline-flex',
    lineHeight: 'tight',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 1,
    paddingX: 's',
    transition: 'default',
    backgroundColor: { initial: 'surface1', hover: 'slate4' },
  }),
  {
    borderRadius: 5,
    border: `1px solid ${themeVars.colors.surface2}`,
    minWidth: 90,
    minHeight: 40,
    transitionProperty: 'backgroundColor, opacity',
  },
]);

globalStyle(`${buttonLink} > * + *`, {
  marginLeft: tokenVars.space['2xs'],
});
