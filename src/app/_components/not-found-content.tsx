import { css } from 'ds/css';
import { stack } from 'ds/patterns';

interface NotFoundContentProps {
  title?: string;
  children?: React.ReactNode;
}
export const NotFoundContent = ({
  children,
  title = 'Page Not Found',
}: NotFoundContentProps): JSX.Element => {
  return (
    <div className={css({ w: 'full' })}>
      <div className={stack({ gap: 'm' })}>
        <h1 className={css({ textStyle: 'heading' })}>404 - {title}</h1>
        <div>{children}</div>
      </div>
    </div>
  );
};
