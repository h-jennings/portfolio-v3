'use client';
import { ProjectMedia } from '@/app/_utils/content';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { css, cx } from 'ds/css';
import { circle } from 'ds/patterns';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';
import { useCallback } from 'react';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { ProjectImage } from '../project-image';
import { ZoomableMedia } from './zoomable-media';

interface LightboxContextStore {
  isOpen: boolean;
  activeIndex: number;
  canPrev: boolean;
  canNext: boolean;
  open: (index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  carouselRef: UseEmblaCarouselType[0] | null;
  items: Array<ProjectMedia>;
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
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);
  const pendingIndexRef = React.useRef<number | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const open = React.useCallback((index: number) => {
    pendingIndexRef.current = index;
    setActiveIndex(index);
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const onSelect = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, []);

  const next = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const prev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const goTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  React.useEffect(() => {
    if (!emblaApi || !isOpen || pendingIndexRef.current == null) return;
    emblaApi.scrollTo(pendingIndexRef.current, true);
    pendingIndexRef.current = null;
  }, [emblaApi, isOpen]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
    return () => {
      emblaApi.off('reInit', onSelect).off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const value = React.useMemo(
    () => ({
      isOpen,
      activeIndex,
      carouselRef: emblaRef,
      open,
      close,
      next,
      prev,
      goTo,
      canPrev,
      canNext,
      items,
    }),
    [
      isOpen,
      activeIndex,
      emblaRef,
      open,
      close,
      next,
      prev,
      goTo,
      canPrev,
      canNext,
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
// Chrome (close button, nav) fades in after the image has settled,
// fades out fast on dismiss — Twitter iOS pattern.
const CHROME_ENTER = { duration: 0.2, delay: 0.18, ease: 'easeOut' as const };
const CHROME_EXIT = { duration: 0.12, ease: 'easeOut' as const };

export function LightboxRoot({ children }: { children: React.ReactNode }) {
  const { isOpen, close } = useLightbox();

  const backdropExit = { opacity: 0, transition: EXIT_SPRING };
  const chromeInitial = { opacity: 0 };
  const chromeAnimate = {
    opacity: 1,
    transition: CHROME_ENTER,
  };
  const chromeExit = {
    opacity: 0,
    transition: CHROME_EXIT,
  };

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogPrimitive.Portal forceMount>
        <AnimatePresence>
          {isOpen && (
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                key='lightbox-backdrop'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={backdropExit}
                transition={ENTER_SPRING}
                className={css({
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'uiBg',
                  zIndex: 50,
                })}
              />
            </DialogPrimitive.Overlay>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                key='lightbox-content'
                initial={false}
                className={css({
                  position: 'fixed',
                  inset: 0,
                  zIndex: 51,
                  h: 'screenH',
                  w: 'screenW',
                  padding: 'm',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr)',
                  gridTemplateRows: 'auto minmax(0, 1fr)',
                  rowGap: 'm',
                })}
              >
                <DialogPrimitive.Title className={css({ srOnly: true })}>
                  Lightbox
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className={css({ srOnly: true })}>
                  Media gallery viewer
                </DialogPrimitive.Description>
                <motion.div
                  initial={chromeInitial}
                  animate={chromeAnimate}
                  exit={chromeExit}
                  className={css({
                    display: 'flex',
                    justifyContent: 'flex-end',
                  })}
                >
                  <DialogPrimitive.Close>close</DialogPrimitive.Close>
                </motion.div>
                {children}
              </motion.div>
            </DialogPrimitive.Content>
          )}
        </AnimatePresence>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function LightboxItems() {
  const { carouselRef, next, prev, items, activeIndex } = useLightbox();

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
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  const stageInitial = { opacity: 0, scale: 0.9, y: 60 };
  const stageAnimate = { opacity: 1, scale: 1, y: 0 };
  const stageExit = { opacity: 0, transition: EXIT_SPRING };

  const chromeAnimate = {
    opacity: 1,
    transition: CHROME_ENTER,
  };
  const chromeExit = {
    opacity: 0,
    transition: CHROME_EXIT,
  };

  const activeItem = items[activeIndex];

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
        exit={stageExit}
        transition={ENTER_SPRING}
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
                        priority={isActive}
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
          animate={chromeAnimate}
          exit={chromeExit}
          className={cx(circle({ size: 40 }), arrowButton)}
          style={{ left: 12 }}
        >
          <ArrowLeftIcon />
        </motion.button>
        <motion.button
          onClick={next}
          aria-label='Next'
          initial={{ opacity: 0 }}
          animate={chromeAnimate}
          exit={chromeExit}
          className={cx(circle({ size: 40 }), arrowButton)}
          style={{ right: 12 }}
        >
          <ArrowRightIcon />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={chromeAnimate}
        exit={chromeExit}
        className={css({
          textAlign: 'center',
          textStyle: 'body',
          color: 'text2',
          minHeight: '1.25em',
        })}
      >
        {activeItem?.alt}
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
