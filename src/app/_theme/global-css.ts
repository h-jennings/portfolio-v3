import { defineGlobalStyles } from '@pandacss/dev';

export const globalCss = defineGlobalStyles({
  html: {
    fontFamily: 'primary',
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased',
    textRendering: 'optimizeLegibility',
    backgroundColor: 'uiBg',
    color: 'text1',
  },
});
