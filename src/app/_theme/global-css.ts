import { defineGlobalStyles } from '@pandacss/dev';

// Code syntax
export const globalCss = defineGlobalStyles({
  html: {
    fontFamily: 'primary',
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased',
    textRendering: 'optimizeLegibility',
    backgroundColor: 'uiBg',
    color: 'text1',
  },
  button: {
    cursor: 'pointer',
    transitionDuration: 'default',
    transitionTimingFunction: 'default',
    transitionProperty: 'box-shadow',
    _focus: {
      outline: 'none',
      boxShadow: 'focus',
    },
  },
  a: {
    transitionDuration: 'default',
    transitionTimingFunction: 'default',
    transitionProperty: 'box-shadow',
    _focus: {
      outline: 'none',
      boxShadow: 'focus',
    },
  },
  'html.dark-theme [data-theme] span': {
    color: 'var(--shiki-dark)',
  },
  'html.light-theme [data-theme] span': {
    color: 'var(--shiki-light)',
  },
  '[data-rehype-pretty-code-title]': {
    py: 's',
    px: 'm',
    border: '1px solid',
    borderColor: 'slate8',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  'pre[data-language], :not(pre)>code': {
    whiteSpace: 'pre',
    bgColor: 'surface1',
    fontSize: `calc(var(--font-sizes-1) * 0.95)`,
    webkitTextSizeAdjust: 'none',
    fontFamily: 'mono',
  },
  ':not([data-rehype-pretty-code-title]) + pre[data-language]': {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTop: 0,
  },
  'figure[data-rehype-pretty-code-figure]': {
    code: {
      display: 'grid',
    },
    pre: {
      overflowX: 'auto',
      py: 'm',
    },
    '[data-line]': {
      borderLeft: '4px solid',
      borderLeftColor: 'transparent',
      px: 'm',
      fontFamily: 'mono',
    },
  },
  'code[data-line-numbers]': {
    counterReset: 'line',
    '[data-line]::before': {
      counterIncrement: 'line',
      content: 'counter(line)',
      display: 'inline-block',
      textAlign: 'right',
      mr: 'm',
      opacity: 0.5,
    },
  },
});
