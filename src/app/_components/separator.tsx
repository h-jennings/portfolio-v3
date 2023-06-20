import { css } from 'ds/css';
import { circle, hstack } from 'ds/patterns';

export const Separator = (): JSX.Element => {
  return (
    <div
      className={css({
        w: 'full',
        pt: 'm',
        pb: 'm',
      })}
    >
      <div
        className={hstack({
          justify: 'center',
          gap: '3xs',
        })}
      >
        <div className={dot} />
        <div className={dot} />
        <div className={dot} />
      </div>
    </div>
  );
};

const dot = circle({
  size: 2,
  bg: 'slate12',
});
