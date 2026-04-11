import { ArrowTopRightIcon } from '@/app/_components/icons/ArrowTopRightIcon';
import { css, cx } from 'ds/css';
import { hstack } from 'ds/patterns';
import { link } from 'ds/recipes';
import Link from 'next/link';

interface SandboxProps {
  href?: string;
  label?: string;
  aspectRatio?: string;
  children: React.ReactNode;
}

export function Sandbox({ href, label, aspectRatio, children }: SandboxProps) {
  const hasTopBar = label != null || href != null;

  return (
    <div className={wrapper}>
      {hasTopBar && (
        <div className={topBar}>
          {label != null && <span className={labelText}>{label}</span>}
          {href != null && (
            <Link
              href={href}
              className={cx(
                hstack({ gap: '3xs' }),
                link({ color: 'secondary' }),
                css({ fontSize: '0', lineHeight: 'tight', ml: 'auto' }),
              )}
            >
              <span>Open demo</span>
              <ArrowTopRightIcon />
            </Link>
          )}
        </div>
      )}
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
  border: '1px dashed',
  borderColor: 'slate6',
  rounded: 'card',
  overflow: 'hidden',
});

const topBar = css({
  display: 'flex',
  alignItems: 'center',
  px: 's',
  py: '3xs',
  borderBottom: '1px dashed',
  borderColor: 'slate6',
});

const labelText = css({
  fontSize: '0',
  color: 'text2',
  lineHeight: 'tight',
});

const content = css({
  display: 'flex',
  flexDir: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  p: 's',
  backgroundImage:
    'radial-gradient(circle, {colors.slate5} 1px, transparent 1px)',
  backgroundSize: '20px 20px',
});
