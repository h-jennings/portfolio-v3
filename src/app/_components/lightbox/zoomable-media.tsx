'use client';
import { css } from 'ds/css';
import { animate, motion, useMotionValue } from 'motion/react';
import * as React from 'react';
import { useLightbox } from './lightbox';

const TAP_SCALE = 2;
const SNAP_SPRING = { type: 'spring' as const, duration: 0.35, bounce: 0.1 };

interface ZoomableMediaProps {
  isActive: boolean;
  children: React.ReactNode;
}

export function ZoomableMedia({ isActive, children }: ZoomableMediaProps) {
  const { isZoomedRef } = useLightbox();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const didPanRef = React.useRef(false);

  const resetZoom = React.useCallback(() => {
    animate(scale, 1, SNAP_SPRING);
    animate(x, 0, SNAP_SPRING);
    animate(y, 0, SNAP_SPRING);
  }, [scale, x, y]);

  React.useEffect(() => {
    if (!isActive) resetZoom();
  }, [isActive, resetZoom]);

  React.useEffect(
    () =>
      scale.on('change', (v) => {
        const zoomed = v > 1.01;
        setIsZoomed(zoomed);
        if (isActive) isZoomedRef.current = zoomed;
      }),
    [scale, isActive, isZoomedRef],
  );

  React.useEffect(() => {
    if (isActive) isZoomedRef.current = scale.get() > 1.01;
  }, [isActive, scale, isZoomedRef]);

  function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
  }

  function panBounds() {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { maxX: 0, maxY: 0 };
    const overflow = (scale.get() - 1) / 2;
    return { maxX: rect.width * overflow, maxY: rect.height * overflow };
  }

  return (
    <motion.div
      ref={containerRef}
      onClick={() => {
        if (didPanRef.current) {
          didPanRef.current = false;
          return;
        }
        if (scale.get() > 1) {
          resetZoom();
        } else {
          animate(scale, TAP_SCALE, SNAP_SPRING);
        }
      }}
      onPan={(_, info) => {
        if (scale.get() <= 1) return;
        didPanRef.current = true;
        const { maxX, maxY } = panBounds();
        const cx = clamp(x.get() + info.delta.x, -maxX, maxX);
        const cy = clamp(y.get() + info.delta.y, -maxY, maxY);
        x.set(cx);
        y.set(cy);
      }}
      onPanEnd={() => {
        const { maxX, maxY } = panBounds();
        const cx = clamp(x.get(), -maxX, maxX);
        const cy = clamp(y.get(), -maxY, maxY);
        if (cx !== x.get()) animate(x, cx, SNAP_SPRING);
        if (cy !== y.get()) animate(y, cy, SNAP_SPRING);
      }}
      style={{
        scale,
        x,
        y,
        cursor: isZoomed ? 'zoom-out' : 'zoom-in',
      }}
      className={css({
        position: 'absolute',
        inset: 0,
      })}
    >
      {children}
    </motion.div>
  );
}
