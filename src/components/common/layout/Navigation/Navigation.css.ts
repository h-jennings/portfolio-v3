import { sprinkles } from '@/styles/sprinkles.css';
import { style } from '@vanilla-extract/css';

export const root = style([
  { gridArea: 'nav' },
  sprinkles({
    paddingTop: { initial: 'm', bp1: 'xl' },
    paddingBottom: '2xl',
  }),
]);

export const inner = style([
  sprinkles({
    display: 'flex',
    width: 'full',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
]);

export const now = style([
  sprinkles({
    display: 'inline-block',
  }),
  {
    color: 'transparent',
    ':hover': {
      color: 'hsla(227,4%,56%,1)',
    },
    background: 'linear-gradient(270deg,#8a8c93 50%,hsla(227,4%,56%,.6))',
    backgroundClip: 'text',
  },
]);
