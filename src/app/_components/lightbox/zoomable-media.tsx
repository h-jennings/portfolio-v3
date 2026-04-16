'use client';
import { css } from 'ds/css';
import { animate, motion, useMotionValue } from 'motion/react';
import * as React from 'react';

const TAP_SCALE = 2;
const SNAP_SPRING = { type: 'spring' as const, duration: 0.35, bounce: 0.1 };
const CLICK_MAX_PX = 5;
const CLICK_MAX_MS = 300;

interface ZoomableMediaProps {
  isActive: boolean;
  children: React.ReactNode;
}

export function ZoomableMedia({ isActive, children }: ZoomableMediaProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const downAt = React.useRef<{ x: number; y: number; t: number } | null>(null);
  const lastPoint = React.useRef<{ x: number; y: number } | null>(null);
  const [isZoomed, setIsZoomed] = React.useState(false);

  const resetZoom = React.useCallback(() => {
    animate(scale, 1, SNAP_SPRING);
    animate(x, 0, SNAP_SPRING);
    animate(y, 0, SNAP_SPRING);
  }, [scale, x, y]);

  React.useEffect(() => {
    if (!isActive) resetZoom();
  }, [isActive, resetZoom]);

  React.useEffect(
    () => scale.on('change', (v) => setIsZoomed(v > 1.01)),
    [scale],
  );

  function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
  }

  function panBounds() {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { maxX: 0, maxY: 0 };
    const overflow = (scale.get() - 1) / 2;
    return { maxX: rect.width * overflow, maxY: rect.height * overflow };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    downAt.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    lastPoint.current = { x: e.clientX, y: e.clientY };
    if (scale.get() > 1) e.stopPropagation();
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse' || !lastPoint.current) return;
    const dx = e.clientX - lastPoint.current.x;
    const dy = e.clientY - lastPoint.current.y;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    if (scale.get() > 1) {
      const { maxX, maxY } = panBounds();
      x.set(clamp(x.get() + dx, -maxX, maxX));
      y.set(clamp(y.get() + dy, -maxY, maxY));
      e.stopPropagation();
    }
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return;
    const down = downAt.current;
    downAt.current = null;
    lastPoint.current = null;

    if (down) {
      const dx = e.clientX - down.x;
      const dy = e.clientY - down.y;
      const dt = Date.now() - down.t;
      if (Math.hypot(dx, dy) < CLICK_MAX_PX && dt < CLICK_MAX_MS) {
        if (scale.get() > 1) resetZoom();
        else animate(scale, TAP_SCALE, SNAP_SPRING);
      }
    }

    const { maxX, maxY } = panBounds();
    const cx = clamp(x.get(), -maxX, maxX);
    const cy = clamp(y.get(), -maxY, maxY);
    if (cx !== x.get()) animate(x, cx, SNAP_SPRING);
    if (cy !== y.get()) animate(y, cy, SNAP_SPRING);
  }

  return (
    <motion.div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
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
