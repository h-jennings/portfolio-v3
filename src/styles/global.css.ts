import { globalStyle } from '@vanilla-extract/css';

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
  fontFamily: 'var(--fonts-primary)',
  backgroundColor: 'var(--colors-uiBg)',
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
