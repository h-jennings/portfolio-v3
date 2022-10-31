import { stack } from '@/styles/primitives/stack.css';
import * as s from './Separator.css';

export const Separator = (): JSX.Element => {
  return (
    <div className={s.root}>
      <div
        className={stack({
          orientation: 'horizontal',
          justify: 'center',
          gap: '3xs',
        })}
      >
        <div className={s.dot} />
        <div className={s.dot} />
        <div className={s.dot} />
      </div>
    </div>
  );
};
