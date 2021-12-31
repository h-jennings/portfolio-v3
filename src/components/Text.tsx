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
        fontStyle: 'italic',
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
  transitionProperty: 'box-shadow',
  '&:focus': {
    outline: 'none',
    boxShadow: '$focus',
  },
});

export const link = css({
  d: 'inline',
  $$hoverColor: 'inherit',
  transition: '$default',
  cursor: 'pointer',
  transitionProperty: 'box-shadow, color',
  '&:focus': {
    outline: 'none',
    boxShadow: '$focus',
  },
  hover: {
    color: '$$hoverColor',
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
      1: { color: '$text1', $$hoverColor: '$colors$slate11' },
      2: { color: '$text2', $$hoverColor: '$colors$slate9' },
      3: { color: '$text3', $$hoverColor: '$colors$gold8' },
      4: { color: '$text4', $$hoverColor: '$colors$slate2' },
    },
    leading: {
      tight: { lineHeight: '$tight' },
      body: { lineHeight: '$body' },
      loose: { lineHeight: '$loose' },
    },
    underline: {
      whileHover: {
        position: 'relative',
        hover: {
          '&:after': {
            transition: '$default',
            transitionProperty: 'transform, opacity, color',
            transform: 'translateY(0%)',
            opacity: 1,
          },
        },
        '&:after': {
          content: '',
          position: 'absolute',
          opacity: 0,
          width: '$full',
          height: 2,
          backgroundColor: '$$hoverColor',
          left: 0,
          bottom: -2,
          transition: '$default',
          transitionProperty: 'transform, opacity, color',
          transform: 'translateY(100%)',
        },
      },
      true: {
        textDecoration: 'underline',
      },
    },
  },
  defaultVariants: {
    color: '1',
    leading: 'tight',
    size: '2',
  },
});

export const Link = styled('a', link);

// Design Elements
export const PageHeader = styled('h1', {
  lineHeight: '$body',
  color: '$text1',
  fontSize: '$4',
  fontWeight: '$regular',
  fontFamily: '$primary',
});
export const BodyText = styled('p', {
  color: '$text1',
  lineHeight: '$body',
  fontSize: '$2',
});
