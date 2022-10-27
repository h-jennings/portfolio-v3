import { globalStyle, style } from '@vanilla-extract/css';

export const root = style({
  position: 'relative',
});

globalStyle(
  `${root} a[href]:not(.linkbox__target), ${root} abbr[title], ${root} button`,
  {
    position: 'relative',
    zIndex: 1,
  },
);

export const target = style({
  ':before': {
    content: '',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
});
