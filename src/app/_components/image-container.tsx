'use client';
import { css } from 'ds/css';
import { stack } from 'ds/patterns';
import * as React from 'react';

interface ImageContainerProps {
  caption?: string;
  ratio?: number;
}
export default function ImageContainer({
  caption,
  ratio,
  children,
}: React.PropsWithChildren<ImageContainerProps>) {
  return (
    <div className={stack({ gap: 'xs', py: 'xs' })}>
      <div
        className={css({
          rounded: 'card',
          bgColor: 'slate8',
          overflow: 'hidden',
        })}
      >
        {ratio == null ? (
          children
        ) : (
          <div style={{ position: 'relative', aspectRatio: ratio }}>
            {children}
          </div>
        )}
      </div>
      {caption != null && (
        <p className={css({ fontSize: '1', color: 'text2', pb: 'm' })}>
          {caption}
        </p>
      )}
    </div>
  );
}
