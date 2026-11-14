import { Separator as SeparatorPrimitive } from '@ui-sdk/react/separator';
import { css } from 'ds/css';
import { circle } from 'ds/patterns';

export const Separator = () => {
  return (
    <SeparatorPrimitive className={root}>
      <span className={dot} />
      <span className={dot} />
      <span className={dot} />
    </SeparatorPrimitive>
  );
};

const root = css({
  display: 'flex',
  justifyContent: 'center',
  gap: '3xs',
  w: 'full',
  h: 'auto',
  py: 'm',
  bg: 'transparent',
});

const dot = circle({
  size: 2,
  bg: 'slate12',
});
