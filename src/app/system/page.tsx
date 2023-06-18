import { css } from 'ds/css';
import { vstack, container } from 'ds/patterns';

export default function SystemPage() {
  return (
    <div className={container()}>
      <div
        className={vstack({
          gap: '10',
        })}
      >
        <h1
          className={css({
            fontSize: { base: '4', bp2: '6' },
            color: 'slate12',
            shadow: 'focus',
          })}
        >
          System Page
        </h1>
        <div>System Page</div>
      </div>
    </div>
  );
}
