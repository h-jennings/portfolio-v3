import { styled } from '@/stitches.config';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

const SCROLLBAR_SIZE = 10;

const ScrollContainerArea = styled(ScrollAreaPrimitive.Root, {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

const ScrollContainerViewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

const ScrollContainerScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  background: '$uiBg',
  // TODO: adjust this easing
  transition: 'background 160ms ease-out',
  '&:hover': { background: '$slate4' },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
});

const ScrollContainerThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: '$surface2',
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
});

export {
  ScrollContainerArea,
  ScrollContainerViewport,
  ScrollContainerScrollbar,
  ScrollContainerThumb,
};
