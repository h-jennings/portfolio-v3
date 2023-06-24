import { defineTextStyles } from '@pandacss/dev';

export const textStyles = defineTextStyles({
  base: {
    value: {
      lineHeight: 'body',
      fontSize: '2',
      fontWeight: 'regular',
      fontFamily: 'primary',
    },
  },
  serif: {
    value: {
      lineHeight: 'body',
      fontSize: '2',
      fontWeight: 'regular',
      fontFamily: 'serif',
      fontStyle: 'italic',
    },
  },
  heading: {
    value: {
      lineHeight: 'body',
      fontSize: '4',
      fontWeight: 'regular',
      fontFamily: 'primary',
    },
  },
  body: {
    value: {
      lineHeight: 'body',
      fontSize: '2',
      fontWeight: 'regular',
      fontFamily: 'primary',
    },
  },
});
