import { globalStyle, style } from '@vanilla-extract/css';
import { ds } from '../ds.css';
import { sprinkles } from '../sprinkles.css';

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
      boxShadow: ds.tokens.shadows.focus,
    },
  },
]);

export const buttonLink = style([
  sprinkles({
    display: 'inline-flex',
    lineHeight: 'tight',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1',
    paddingX: 's',
    transition: 'default',
    backgroundColor: { initial: 'surface1', hover: 'slate4' },
  }),
  {
    borderRadius: 5,
    border: `1px solid ${ds.theme.colors.surface2}`,
    minWidth: 90,
    minHeight: 40,
    transitionProperty: 'backgroundColor, opacity',
  },
]);

globalStyle(`${buttonLink} > * + *`, {
  marginLeft: ds.tokens.space['2xs'],
});
