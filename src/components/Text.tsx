import { css, styled } from '@/stitches.config';

export const text = css({
  variants: {
    size: {
      1: { fontSize: '$1' },
      2: { fontSize: '$2' },
      3: { fontSize: '$3' },
      4: { fontSize: '$4' },
      5: { fontSize: '$5' },
      6: { fontSize: '$6' },
      7: { fontSize: '$7' },
      8: { fontSize: '$8' },
    },
    leading: {
      tight: { lineHeight: '$tight' },
      body: { lineHeight: '$body' },
      loose: { lineHeight: '$loose' },
    },
    color: {
      1: { color: '$text1' },
      2: { color: '$text2' },
      3: { color: '$text3' },
      4: { color: '$text4' },
    },
    weight: {
      bold: { fontWeight: '$bold' },
      regular: { fontWeight: '$regular' },
    },
    family: {
      primary: {
        fontFamily: '$primary',
      },
      serif: {
        fontFamily: '$serif',
      },
    },
  },
  defaultVariants: {
    color: '1',
    family: 'primary',
    leading: 'body',
    size: '2',
    weight: 'regular',
  },
});

// Html Elements
export const Text = styled('span', text);
export const Quote = styled('q', text);
export const Paragraph = styled('p', text);
export const ListItem = styled('li', text);
export const Small = styled('small', text);
export const Deleted = styled('del', text);
export const H1 = styled('h1', text);
export const H2 = styled('h2', text);
export const H3 = styled('h3', text);
export const H4 = styled('h4', text);
export const H5 = styled('h5', text);
export const H6 = styled('h6', text);

export const focus = css({
  transition: '$default',
  '&:focus': {
    outline: 'none',
    boxShadow: '$focus',
  },
});

export const Link = styled('a', {
  d: 'inline',
  transition: '$default',
  '&:focus': {
    outline: 'none',
    boxShadow: '$focus',
  },
  variants: {
    size: {
      1: { fontSize: '$1' },
      2: { fontSize: '$2' },
      3: { fontSize: '$3' },
      4: { fontSize: '$4' },
      5: { fontSize: '$5' },
      6: { fontSize: '$6' },
      7: { fontSize: '$7' },
      8: { fontSize: '$8' },
    },
    color: {
      1: { color: '$text1' },
      2: { color: '$text2' },
      3: { color: '$text3' },
      4: { color: '$text4' },
    },
    leading: {
      tight: { lineHeight: '$tight' },
      body: { lineHeight: '$body' },
      loose: { lineHeight: '$loose' },
    },
  },
  defaultVariants: {
    color: '1',
    leading: 'tight',
    size: '2',
  },
});

// Design Elements
export const PageHeader = styled('h1', {
  lineHeight: '$body',
  color: '$text1',
  fontSize: 'clamp(1.75rem, 8.1vw - 0.9rem, 3rem);',
  fontWeight: '$regular',
  fontFamily: '$primary',
  '@bp1': {
    lineHeight: '$tight',
  },
  '@bp2': {
    fontSize: '$4',
  },
});
export const BodyText = styled('p', {
  color: '$text2',
  lineHeight: '$body',
  fontSize: '$1',
  '@bp2': {
    fontSize: '$2',
  },
});
