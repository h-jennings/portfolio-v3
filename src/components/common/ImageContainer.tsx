import { stack } from '@/styles/elements/stack.css';
import { text } from '@/styles/elements/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import clsx from 'clsx';
import * as React from 'react';

interface ImageContainerProps {
  caption: string;
}
export const ImageContainer = ({
  caption,
  children,
}: React.PropsWithChildren<ImageContainerProps>) => {
  return (
    <div
      className={clsx(
        stack({ gap: 'xs' }),
        sprinkles({
          paddingTop: 'xs',
          paddingBottom: 'xs',
        }),
      )}
    >
      <div
        className={sprinkles({
          borderRadius: 'card',
          backgroundColor: 'slate8',
        })}
        style={{
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
      {caption ? (
        <p
          className={clsx(
            sprinkles({ paddingBottom: 'm' }),
            text({ size: 1, color: 2 }),
          )}
        >
          {caption}
        </p>
      ) : null}
    </div>
  );
};
