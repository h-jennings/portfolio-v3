import ArrowLeftIcon from '@/app/_components/icons/ArrowLeftIcon';
import { css } from 'ds/css';
import { hstack, linkOverlay } from 'ds/patterns';
import { token } from 'ds/tokens';
import Link from 'next/link';
import * as React from 'react';

interface BackToLinkProps {
  href: string;
}

export const BackToLink = ({
  children,
  href,
}: React.PropsWithChildren<BackToLinkProps>) => {
  return (
    <div className={css({ position: 'relative' })}>
      <div
        className={hstack({
          gap: 'xs',
          mb: 'm',
        })}
      >
        <ArrowLeftIcon color={token('colors.text1')} width={15} aria-hidden />
        <Link className={linkOverlay({ display: 'flex' })} href={href}>
          <span
            className={css({ textStyle: 'base', lineHeight: 'tight' })}
            style={{ fontSize: 12 }}
          >
            {children}
          </span>
        </Link>
      </div>
    </div>
  );
};
