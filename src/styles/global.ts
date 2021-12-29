import { globalCss } from '@stitches/react';

export const globalStyles = globalCss({
  // Setting base constraints for fluid space scale
  ':root': {
    '--fluid-min-width': 360,
    '--fluid-max-width': 1024,
    '--fluid-screen': '100vw',
    '--fluid-bp':
      'calc((var(--fluid-screen) - var(--fluid-min-width) / 16 * 1rem) / (var(--fluid-max-width) - var(--fluid-min-width)))',

    // base font sizes
    '--base-fz-min': 16,
    '--base-fz-max': 20,

    // min max space values
    '--fc-3xs-min': '(var(--base-fz-min) * 0.25)',
    '--fc-3xs-max': '(var(--base-fz-max) * 0.25)',
    '--fc-2xs-min': '(var(--base-fz-min) * 0.5)',
    '--fc-2xs-max': '(var(--base-fz-max) * 0.5)',
    '--fc-xs-min': '(var(--base-fz-min) * 0.75)',
    '--fc-xs-max': '(var(--base-fz-max) * 0.75)',
    '--fc-s-min': '(var(--base-fz-min))',
    '--fc-s-max': '(var(--base-fz-max))',
    '--fc-m-min': '(var(--base-fz-min) * 1.5)',
    '--fc-m-max': '(var(--base-fz-max) * 1.5)',
    '--fc-l-min': '(var(--base-fz-min) * 2)',
    '--fc-l-max': '(var(--base-fz-max) * 2)',
    '--fc-xl-min': '(var(--base-fz-min) * 3)',
    '--fc-xl-max': '(var(--base-fz-max) * 3)',
    '--fc-2xl-min': '(var(--base-fz-min) * 4)',
    '--fc-2xl-max': '(var(--base-fz-max) * 4)',
    '--fc-3xl-min': '(var(--base-fz-min) * 6)',
    '--fc-3xl-max': '(var(--base-fz-max) * 6)',
  },
  '@media screen and (min-width: 1024px)': {
    ':root': {
      '--fluid-screen': 'calc(var(--fluid-max-width) * 1px)',
    },
  },
});
