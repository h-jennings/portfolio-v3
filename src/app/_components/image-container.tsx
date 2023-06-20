'use client';
import { css } from 'ds/css';
import { stack } from 'ds/patterns';
import * as React from 'react';

interface ImageContainerProps {
  caption?: string;
}
export const ImageContainer = ({
  caption,
  children,
}: React.PropsWithChildren<ImageContainerProps>) => {
  return (
    <div className={stack({ gap: 'xs', py: 'xs' })}>
      <div
        className={css({
          rounded: 'card',
          bgColor: 'slate8',
          overflow: 'hidden',
        })}
      >
        {children}
      </div>
      {caption != null && (
        <p className={css({ fontSize: '1', color: 'text2', pb: 'm' })}>
          {caption}
        </p>
      )}
    </div>
  );
};
