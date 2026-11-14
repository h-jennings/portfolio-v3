import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@ui-sdk/react/scroll-area';
import { css, cx } from 'ds/css';
import * as React from 'react';

const SCROLLBAR_SIZE = 10;
const EDGE_FADE = '24px';

interface HorizontalScrollAreaProps {
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

// Children opt into snapping with `scrollSnapAlign`.
export const HorizontalScrollArea = ({
  className,
  contentClassName,
  children,
}: HorizontalScrollAreaProps) => {
  return (
    <ScrollArea className={cx(root, className)}>
      <ScrollAreaViewport className={viewport}>
        <ScrollAreaContent className={cx(content, contentClassName)}>
          {children}
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation='horizontal' className={scrollbar}>
        <ScrollAreaThumb className={thumb} />
      </ScrollAreaScrollbar>
    </ScrollArea>
  );
};

const root = css({
  border: 'none',
  rounded: 'none',
  fontSize: 'inherit',
});

const viewport = css({
  w: 'full',
  h: 'full',
  scrollSnapType: 'x mandatory',
  // The overflow variable lives on the root and doesn't inherit by default.
  '--scroll-area-overflow-x-end': 'inherit',
  // Only the trailing edge fades: snapping parks the current card flush at the
  // start, so a leading fade would dim the card being read. Eased stops and a
  // floor keep the peeking card visible rather than washed out.
  '--fade': `min(${EDGE_FADE}, var(--scroll-area-overflow-x-end))`,
  maskImage: `linear-gradient(to left, rgb(0 0 0 / 0.3), rgb(0 0 0 / 0.5) calc(var(--fade) * 0.25), rgb(0 0 0 / 0.75) calc(var(--fade) * 0.5), rgb(0 0 0 / 0.92) calc(var(--fade) * 0.75), #000 var(--fade))`,
});

const content = css({
  p: 0,
});

const scrollbar = css({
  h: SCROLLBAR_SIZE,
  p: 2,
  rounded: 'pill',
  visibility: 'visible',
  opacity: 0,
  transition: 'opacity 150ms ease, background-color 150ms ease',
  '&[data-visible]': {
    opacity: 1,
  },
  '@media (hover: hover) and (pointer: fine)': {
    _hover: { bgColor: 'slate4' },
    '&:hover [data-slot=scroll-area-thumb]': { bgColor: 'slate11' },
  },
  _motionReduce: {
    transition: 'none',
  },
});

const thumb = css({
  pos: 'relative',
  bgColor: 'slate9',
  rounded: 'pill',
  transition: 'background-color 150ms ease',
  '&[data-dragging]': {
    bgColor: 'slate11',
  },
  _motionReduce: {
    transition: 'none',
  },
  _before: {
    content: '""',
    pos: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    w: '100%',
    h: '100%',
    minW: 44,
    minH: 44,
  },
});
