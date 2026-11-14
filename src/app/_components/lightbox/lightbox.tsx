'use client';

import { ProjectMedia } from '@/app/_utils/content';
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@ui-sdk/react/dialog';
import { css, cx } from 'ds/css';
import { circle } from 'ds/patterns';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import { motion } from 'motion/react';
import * as React from 'react';
import { useCallback } from 'react';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { ProjectImage } from '../project-image';
import { ZoomableMedia } from './zoomable-media';

interface LightboxContextStore {
  isOpen: boolean;
  isPresent: boolean;
  finishClosing: () => void;
  activeIndex: number;
  open: (index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  carouselRef: UseEmblaCarouselType[0] | null;
  items: Array<ProjectMedia>;
  isZoomedRef: React.RefObject<boolean>;
}

const LightboxContext = React.createContext<LightboxContextStore | null>(null);

export function LightboxProvider({
  items,
  children,
}: {
  items: Array<ProjectMedia>;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  // Stays true through the exit animation, so the dialog stays modal until the
  // springs finish.
  const [isPresent, setIsPresent] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const pendingIndexRef = React.useRef<number | null>(null);
  const isZoomedRef = React.useRef(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    watchDrag: () => !isZoomedRef.current,
  });

  const open = React.useCallback((index: number) => {
    pendingIndexRef.current = index;
    setActiveIndex(index);
    setIsOpen(true);
    setIsPresent(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const finishClosing = React.useCallback(() => {
    setIsPresent(false);
  }, []);

  const onSelect = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, []);

  const next = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const prev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi || !isOpen || pendingIndexRef.current == null) return;
    emblaApi.scrollTo(pendingIndexRef.current, true);
    pendingIndexRef.current = null;
  }, [emblaApi, isOpen]);

  React.useEffect(() => {
    if (!emblaApi) return;
    // Sync with Embla's external state once its API is ready.
    // oxlint-disable-next-line react/set-state-in-effect
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
    return () => {
      emblaApi.off('reInit', onSelect).off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const value = React.useMemo(
    () => ({
      isOpen,
      isPresent,
      finishClosing,
      activeIndex,
      carouselRef: emblaRef,
      open,
      close,
      next,
      prev,
      items,
      isZoomedRef,
    }),
    [
      isOpen,
      isPresent,
      finishClosing,
      activeIndex,
      emblaRef,
      open,
      close,
      next,
      prev,
      items,
    ],
  );

  return <LightboxContext value={value}>{children}</LightboxContext>;
}

export function useLightbox() {
  const context = React.use(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
}

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
const CONTROLS_ENTER = { duration: 0.2, delay: 0.18, ease: 'easeOut' as const };
const CONTROLS_EXIT = { duration: 0.12, ease: 'easeOut' as const };

export function Lightbox({
  finalFocus,
}: {
  finalFocus?: () => HTMLElement | null | undefined;
}) {
  const { isOpen, isPresent, close } = useLightbox();

  const controlsAnimate = isOpen
    ? { opacity: 1, transition: CONTROLS_ENTER }
    : { opacity: 0, transition: CONTROLS_EXIT };

  return (
    <Dialog
      open={isPresent}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogBackdrop
        className={backdrop}
        render={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={isOpen ? ENTER_SPRING : EXIT_SPRING}
          />
        }
      />
      <DialogContent className={content} finalFocus={finalFocus}>
        <DialogTitle className={css({ srOnly: true })}>Lightbox</DialogTitle>
        <DialogDescription className={css({ srOnly: true })}>
          Media gallery viewer
        </DialogDescription>
        <motion.div
          initial={{ opacity: 0 }}
          animate={controlsAnimate}
          className={css({
            display: 'flex',
            justifyContent: 'flex-end',
          })}
        >
          <DialogClose
            className={css({
              fontSize: '1',
              lineHeight: 'tight',
              color: 'text1',
              _hover: { color: 'text2' },
            })}
          >
            close
          </DialogClose>
        </motion.div>
        <LightboxItems />
      </DialogContent>
    </Dialog>
  );
}

const backdrop = css({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'uiBg',
  zIndex: 50,
});

// Resets web.css's centered card so the lightbox fills the screen.
const content = css({
  position: 'fixed',
  inset: 0,
  zIndex: 51,
  w: 'full',
  h: 'full',
  maxW: 'none',
  maxH: 'none',
  m: 0,
  padding: 'm',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateRows: 'auto minmax(0, 1fr)',
  rowGap: 'm',
  overflow: 'hidden',
  border: 'none',
  rounded: 'none',
  bg: 'transparent',
  boxShadow: 'none',
  color: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  _backdrop: {
    bg: 'transparent',
  },
});

function LightboxItems() {
  const { carouselRef, next, prev, items, activeIndex, isOpen, finishClosing } =
    useLightbox();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [next, prev]);

  const stageInitial = { opacity: 0, scale: 0.9, y: 60 };
  const stageAnimate = isOpen
    ? { opacity: 1, scale: 1, y: 0, transition: ENTER_SPRING }
    : { opacity: 0, transition: EXIT_SPRING };

  const controlsAnimate = isOpen
    ? { opacity: 1, transition: CONTROLS_ENTER }
    : { opacity: 0, transition: CONTROLS_EXIT };

  return (
    <div
      className={css({
        w: 'full',
        h: 'full',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        gap: 'm',
      })}
    >
      <motion.div
        initial={stageInitial}
        animate={stageAnimate}
        onAnimationComplete={() => {
          if (!isOpen) finishClosing();
        }}
        className={css({
          flex: '1 1 0',
          minHeight: 0,
          minWidth: 0,
          display: 'flex',
          position: 'relative',
        })}
      >
        <div
          className={css({
            overflow: 'hidden',
            flex: '1 1 0',
            minHeight: 0,
            minWidth: 0,
          })}
          ref={carouselRef}
        >
          <div
            className={css({
              display: 'flex',
              height: '100%',
              touchAction: 'pan-y pinch-zoom',
            })}
          >
            {items.map((item, idx) => {
              if (item.mediaType == null) return null;
              const isActive = idx === activeIndex;

              return (
                <div key={idx} className={slide}>
                  <ZoomableMedia isActive={isActive}>
                    {item.mediaType === 'IMAGE' && (
                      <ProjectImage
                        src={item.url}
                        alt={item.alt}
                        fill
                        sizes='100vw'
                        preload={isActive}
                        style={{
                          objectFit: 'contain',
                          pointerEvents: 'none',
                          userSelect: 'none',
                        }}
                        draggable={false}
                      />
                    )}
                    {item.mediaType === 'VIDEO' && (
                      <video
                        src={item.url}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          pointerEvents: 'none',
                        }}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    )}
                  </ZoomableMedia>
                </div>
              );
            })}
          </div>
        </div>

        <motion.button
          onClick={prev}
          aria-label='Previous'
          initial={{ opacity: 0 }}
          animate={controlsAnimate}
          className={cx(circle({ size: 40, left: 'xs' }), arrowButton)}
          style={{ left: 12 }}
        >
          <ArrowLeftIcon />
        </motion.button>
        <motion.button
          onClick={next}
          aria-label='Next'
          initial={{ opacity: 0 }}
          animate={controlsAnimate}
          className={cx(circle({ size: 40, right: 'xs' }), arrowButton)}
        >
          <ArrowRightIcon />
        </motion.button>
      </motion.div>
    </div>
  );
}

const slide = css({
  position: 'relative',
  transform: 'translate3d(0, 0, 0)',
  flex: '0 0 100%',
  minW: 0,
  height: '100%',
});

const arrowButton = css({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  display: 'grid',
  placeItems: 'center',
  bgColor: 'uiBg',
  color: 'text2',
  cursor: 'pointer',
  boxShadow: 'elevation2',
  willChange: 'opacity, transform',
  transformOrigin: 'center',
  transition: 'background-color 150ms ease',
  scale: 1,
});
