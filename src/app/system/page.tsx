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
        <h1 className={css({ fontSize: '4xl', color: 'gray.500' })}>
          System Page
        </h1>
        <div>System Page</div>
      </div>
    </div>
  );
}
