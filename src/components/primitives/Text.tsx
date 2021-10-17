import { config, css, styled } from '@/stitches.config';

const fontSizes = config.theme.fontSizes;

const sizeVariants = Object.keys(fontSizes).reduce((acc, curr) => {
  Object.assign(acc, { [curr]: { fontSize: `$${curr}` } });
  return acc;
}, {} as Record<keyof typeof fontSizes, { fontSizes: `$${keyof typeof fontSizes}` }>);

export const text = css({
  color: '$text1',
  lineHeight: '$tight',
  fontWeight: '$regular',
  variants: {
    size: {
      ...sizeVariants,
    },
  },
});
export const pageHeader = css(text, {
  lineHeight: '$body',
  fontSize: 'clamp(1.75rem, 8.1vw - 0.9rem, 3rem);',
  '@bp2': {
    fontSize: '$4',
  },
});
export const Text = styled('span', {
  color: '$text1',
  lineHeight: '$tight',
  fontWeight: '$regular',
  variants: {
    size: {
      ...sizeVariants,
    },
  },
});
