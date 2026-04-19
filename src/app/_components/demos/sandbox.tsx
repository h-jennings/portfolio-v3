import { css } from 'ds/css';

interface SandboxProps {
  aspectRatio?: string;
  children: React.ReactNode;
}

export function Sandbox({ aspectRatio, children }: SandboxProps) {
  return (
    <div className={wrapper}>
      <div
        className={content}
        style={aspectRatio != null ? { aspectRatio } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

const wrapper = css({
  w: 'full',
  mb: 'm',
  rounded: 'card',
  overflow: 'hidden',
  p: '3xs',
  bg: 'uiBg',
  shadow: 'elevation3',
});

const content = css({
  display: 'flex',
  flexDir: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid',
  borderColor: 'slate4',
  rounded: 'calc(token(radii.card) - token(spacing.3xs))',
  bg: 'slate2',
});
