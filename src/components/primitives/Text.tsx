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
