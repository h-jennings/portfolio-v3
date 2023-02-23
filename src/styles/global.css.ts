import { globalStyle } from '@vanilla-extract/css';
import { ds } from './ds.css';

globalStyle(
  'html, body, p, ol, ul, li, dl, dt, dd, blockquote, figure, fieldset, legend, textarea, pre, iframe, hr, h1, h2, h3, h4, h5, h6',
  {
    margin: 0,
    padding: 0,
  },
);

globalStyle('h1, h2, h3, h4, h5, h6', {
  fontSize: '100%',
  fontWeight: 'normal',
});

globalStyle('ul', {
  listStyleType: 'none',
});

globalStyle('button, input, select', {
  margin: 0,
});

globalStyle('html', {
  boxSizing: 'border-box',
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'inherit',
});

globalStyle('img, video', {
  height: 'auto',
  maxWidth: '100%',
});

globalStyle('iframe', {
  border: 0,
});

globalStyle('table', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
});

globalStyle('td, th', {
  padding: 0,
});

globalStyle('html, body', {
  fontFamily: ds.tokens.fonts.primary,
  backgroundColor: ds.theme.colors.uiBg,
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

/* https://css-tricks.com/focus-visible-and-backwards-compatibility/ */
globalStyle('*:focus:not(:focus-visible)', {
  outline: 'none !important',
});

globalStyle('button:not(:disabled), a:not(:disabled)', {
  cursor: 'pointer',
});

/*
 * Code syntax
 */

globalStyle(
  'html.dark-theme div[data-theme="light"], html.dark-theme pre[data-theme="light"], html.dark-theme code[data-theme="light"]',
  {
    display: 'none',
  },
);

globalStyle(
  'html.light-theme div[data-theme="dark"], html.light-theme pre[data-theme="dark"], html.light-theme code[data-theme="dark"]',
  {
    display: 'none',
  },
);

globalStyle('code', {
  fontFamily: ds.tokens.fonts.mono,
  fontSize: '0.9rem',
});

globalStyle('[data-rehype-pretty-code-title]', {
  padding: `${ds.tokens.space.s} ${ds.tokens.space.m}`,
  backgroundColor: ds.theme.colors.surface1,
  border: '1px solid',
  borderColor: ds.theme.colors.slate8,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  fontSize: ds.tokens.fontSizes[1],
});

globalStyle('pre[data-language]', {
  whiteSpace: 'pre',
  backgroundColor: ds.theme.colors.surface1,
});

globalStyle(':not(pre)>code', {
  whiteSpace: 'pre',
  backgroundColor: ds.theme.colors.surface1,
  padding: '0.25rem',
  fontSize: '0.95rem',
});

globalStyle('[data-rehype-pretty-code-title] + pre[data-language]', {
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderTop: 0,
});

globalStyle('div[data-rehype-pretty-code-fragment] code', {
  display: 'grid',
});

globalStyle('div[data-rehype-pretty-code-fragment] pre', {
  overflowX: 'auto',
  paddingTop: ds.tokens.space.m,
  paddingBottom: ds.tokens.space.m,
});

globalStyle('div[data-rehype-pretty-code-fragment] .syntax-line', {
  borderLeft: '4px solid',
  borderLeftColor: 'transparent',
  paddingRight: ds.tokens.space.m,
  paddingLeft: ds.tokens.space.m,
});

/* Line highlighting */
// globalStyle("div[data-rehype-pretty-code-fragment] .syntax-line--highlighted", {
// backgroundColor: vars.color.codeHighlight,
// borderColor: vars.color.highlight,
// });

/* Numbered lines */
globalStyle('code[data-line-numbers]', {
  counterReset: 'line',
});

globalStyle('code[data-line-numbers] .syntax-line::before', {
  counterIncrement: 'line',
  content: 'counter(line)',
  display: 'inline-block',
  textAlign: 'right',
  marginRight: ds.tokens.space.m,
  opacity: 0.5,
});
