'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { css, cx } from 'ds/css';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';
import * as React from 'react';

interface Slide {
  id: number;
  label: string;
  tint: 'slate' | 'gold';
}

const SLIDES: Array<Slide> = [
  { id: 0, label: '01', tint: 'slate' },
  { id: 1, label: '02', tint: 'gold' },
  { id: 2, label: '03', tint: 'slate' },
  { id: 3, label: '04', tint: 'gold' },
  { id: 4, label: '05', tint: 'slate' },
];

const ENTER_SPRING = {
  type: 'spring' as const,
  duration: 0.45,
  bounce: 0.2,
};
const EXIT_SPRING = {
  type: 'spring' as const,
  duration: 0.35,
  bounce: 0,
};
const ZOOM_SPRING = {
  type: 'spring' as const,
  duration: 0.35,
  bounce: 0.1,
};
const CONTROLS_ENTER = {
  duration: 0.2,
  delay: 0.18,
  ease: 'easeOut' as const,
};
const CONTROLS_EXIT = { duration: 0.12, ease: 'easeOut' as const };

const TAP_SCALE = 2;

export function GalleryLightbox() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const pendingIndexRef = React.useRef<number | null>(null);
  const isZoomedRef = React.useRef(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    // Disable dragging while zoomed to prevent clashes between lightbox zoom panning
    watchDrag: () => !isZoomedRef.current,
  });

  function open(index: number) {
    pendingIndexRef.current = index;
    setActiveIndex(index);
    setIsOpen(true);
  }
  const next = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const prev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  React.useEffect(
    function handleScrollToPending() {
      if (!emblaApi || !isOpen || pendingIndexRef.current == null) return;
      emblaApi.scrollTo(pendingIndexRef.current, true);
      pendingIndexRef.current = null;
    },
    [emblaApi, isOpen],
  );

  React.useEffect(
    function handleEmblaSelect() {
      if (!emblaApi) return;
      const onSelect = (api: UseEmblaCarouselType[1]) => {
        if (!api) return;
        setActiveIndex(api.selectedScrollSnap());
      };
      onSelect(emblaApi);
      emblaApi.on('reInit', onSelect).on('select', onSelect);
      return () => {
        emblaApi.off('reInit', onSelect).off('select', onSelect);
      };
    },
    [emblaApi],
  );

  React.useEffect(
    function handleKeydown() {
      if (!isOpen) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          next();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prev();
        }
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    },
    [isOpen, next, prev],
  );

  return (
    <>
      <div className={grid}>
        {SLIDES.map((s, index) => (
          <button
            key={s.id}
            type='button'
            className={cx(thumb, thumbTint[s.tint])}
            onClick={() => {
              open(index);
            }}
            aria-label={`Open slide ${s.label}`}
          >
            <span className={thumbLabel}>{s.label}</span>
          </button>
        ))}
      </div>
      <DialogPrimitive.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsOpen(false);
          }
        }}
      >
        <DialogPrimitive.Portal forceMount>
          <AnimatePresence>
            {isOpen && (
              <DialogPrimitive.Overlay asChild forceMount>
                <motion.div
                  key='backdrop'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: EXIT_SPRING }}
                  transition={ENTER_SPRING}
                  className={backdrop}
                />
              </DialogPrimitive.Overlay>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpen && (
              <DialogPrimitive.Content asChild forceMount>
                <motion.div key='content' initial={false} className={content}>
                  <DialogPrimitive.Title className={srOnly}>
                    Gallery lightbox
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className={srOnly}>
                    Demo lightbox composing Radix Dialog, Embla, and Motion
                  </DialogPrimitive.Description>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: CONTROLS_ENTER }}
                    exit={{ opacity: 0, transition: CONTROLS_EXIT }}
                    className={topBar}
                  >
                    <DialogPrimitive.Close className={closeBtn}>
                      close
                    </DialogPrimitive.Close>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 60 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, transition: EXIT_SPRING }}
                    transition={ENTER_SPRING}
                    className={stage}
                  >
                    <div className={viewport} ref={emblaRef}>
                      <div className={track}>
                        {SLIDES.map((s, i) => (
                          <div key={s.id} className={slide}>
                            <ZoomableSlide
                              isActive={i === activeIndex}
                              isZoomedRef={isZoomedRef}
                            >
                              <div className={cx(card, cardTint[s.tint])}>
                                <span className={cardLabel}>{s.label}</span>
                              </div>
                            </ZoomableSlide>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      type='button'
                      onClick={prev}
                      aria-label='Previous'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: CONTROLS_ENTER }}
                      exit={{ opacity: 0, transition: CONTROLS_EXIT }}
                      className={cx(arrowBtn, arrowLeft)}
                    >
                      <ChevronIcon dir='left' />
                    </motion.button>
                    <motion.button
                      type='button'
                      onClick={next}
                      aria-label='Next'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: CONTROLS_ENTER }}
                      exit={{ opacity: 0, transition: CONTROLS_EXIT }}
                      className={cx(arrowBtn, arrowRight)}
                    >
                      <ChevronIcon dir='right' />
                    </motion.button>
                  </motion.div>
                </motion.div>
              </DialogPrimitive.Content>
            )}
          </AnimatePresence>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}

interface ZoomableSlideProps {
  isActive: boolean;
  isZoomedRef: React.RefObject<boolean>;
  children: React.ReactNode;
}

function ZoomableSlide({
  isActive,
  isZoomedRef,
  children,
}: ZoomableSlideProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const didPanRef = React.useRef(false);
  const reduced = useReducedMotion() ?? false;
  const spring = React.useMemo(
    () => (reduced ? { duration: 0 } : ZOOM_SPRING),
    [reduced],
  );

  const reset = React.useCallback(() => {
    animate(scale, 1, spring);
    animate(x, 0, spring);
    animate(y, 0, spring);
  }, [scale, x, y, spring]);

  React.useEffect(
    function handleActiveChange() {
      if (!isActive) {
        reset();
      }
    },
    [isActive, reset],
  );

  React.useEffect(
    function handleScaleChange() {
      return scale.on('change', (v) => {
        const zoomed = v > 1.01;
        setIsZoomed(zoomed);
        if (isActive) {
          isZoomedRef.current = zoomed;
        }
      });
    },
    [scale, isActive, isZoomedRef],
  );

  React.useEffect(
    function handleInitialZoom() {
      if (isActive) {
        isZoomedRef.current = scale.get() > 1.01;
      }
    },
    [isActive, scale, isZoomedRef],
  );

  function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
  }

  function panBounds() {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) {
      return { maxX: 0, maxY: 0 };
    }
    const overflow = (scale.get() - 1) / 2;
    return { maxX: rect.width * overflow, maxY: rect.height * overflow };
  }

  return (
    <motion.div
      ref={ref}
      onClick={() => {
        if (didPanRef.current) {
          didPanRef.current = false;
          return;
        }
        if (scale.get() > 1) {
          reset();
        } else {
          animate(scale, TAP_SCALE, spring);
        }
      }}
      onPan={(_, info) => {
        if (scale.get() <= 1) return;
        didPanRef.current = true;
        const { maxX, maxY } = panBounds();
        // Clamp panning within bounds of the zoomed image
        x.set(clamp(x.get() + info.delta.x, -maxX, maxX));
        y.set(clamp(y.get() + info.delta.y, -maxY, maxY));
      }}
      onPanEnd={() => {
        const { maxX, maxY } = panBounds();
        const nx = clamp(x.get(), -maxX, maxX);
        const ny = clamp(y.get(), -maxY, maxY);

        // If the user has panned beyond the bounds of the zoomed image, animate back to the edge
        if (nx !== x.get()) {
          animate(x, nx, spring);
        }
        if (ny !== y.get()) {
          animate(y, ny, spring);
        }
      }}
      style={{
        scale,
        x,
        y,
        cursor: isZoomed ? 'zoom-out' : 'zoom-in',
      }}
      className={zoomable}
    >
      {children}
    </motion.div>
  );
}

function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      style={{ transform: dir === 'right' ? 'scaleX(-1)' : undefined }}
      aria-hidden
    >
      <path
        d='M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86461 3.84188L5.43521 7.49991L8.86461 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2xs',
  w: 'full',
  p: 'm',
});

const thumb = css({
  position: 'relative',
  aspectRatio: '4 / 3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid',
  borderColor: 'slate6',
  rounded: 'card',
  bg: 'transparent',
  cursor: 'pointer',
  appearance: 'none',
  overflow: 'hidden',
  transition: 'transform 150ms ease, border-color 225ms ease',
  _hover: { transform: 'scale(1.02)' },
  _active: { transform: 'scale(0.98)' },
  _focusVisible: {
    outline: 'none',
    borderColor: 'gold8',
    boxShadow: 'focus',
  },
});

const thumbTint = {
  slate: css({ bgColor: 'slate3' }),
  gold: css({ bgColor: 'gold4' }),
};

const thumbLabel = css({
  fontSize: '1',
  fontWeight: 'medium',
  color: 'text2',
  letterSpacing: '-0.01em',
});

const backdrop = css({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'uiBg',
  zIndex: 50,
});

const content = css({
  position: 'fixed',
  inset: 0,
  zIndex: 51,
  padding: 'm',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateRows: 'auto minmax(0, 1fr)',
  rowGap: 'm',
});

const srOnly = css({ srOnly: true });

const topBar = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

const closeBtn = css({
  fontSize: '1',
  lineHeight: 'tight',
  color: 'text1',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  appearance: 'none',
  _hover: { color: 'text2' },
});

const stage = css({
  flex: '1 1 0',
  minHeight: 0,
  minWidth: 0,
  display: 'flex',
  position: 'relative',
});

const viewport = css({
  overflow: 'hidden',
  flex: '1 1 0',
  minHeight: 0,
  minWidth: 0,
});

const track = css({
  display: 'flex',
  height: '100%',
  touchAction: 'pan-y pinch-zoom',
});

const slide = css({
  position: 'relative',
  transform: 'translate3d(0, 0, 0)',
  flex: '0 0 100%',
  minW: 0,
  height: '100%',
});

const zoomable = css({
  position: 'absolute',
  inset: 0,
});

const card = css({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  rounded: 'card',
  userSelect: 'none',
  pointerEvents: 'none',
});

const cardTint = {
  slate: css({ bgColor: 'slate3' }),
  gold: css({ bgColor: 'gold4' }),
};

const cardLabel = css({
  fontSize: '8',
  fontWeight: 'medium',
  color: 'text2',
  letterSpacing: '-0.02em',
});

const arrowBtn = css({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  display: 'grid',
  placeItems: 'center',
  w: '40px',
  h: '40px',
  rounded: 'round',
  bgColor: 'uiBg',
  color: 'text2',
  border: '1px solid',
  borderColor: 'slate6',
  cursor: 'pointer',
  appearance: 'none',
  boxShadow: 'elevation2',
  willChange: 'opacity, transform',
  transition: 'background-color 150ms ease',
  _hover: { bgColor: 'slate3' },
});

const arrowLeft = css({ left: '12px' });
const arrowRight = css({ right: '12px' });
