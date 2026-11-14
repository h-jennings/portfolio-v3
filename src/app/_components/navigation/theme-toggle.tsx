'use client';
import { colorScheme } from '@/app/_theme/color-scheme';
import { usePreference } from '@ui-sdk/react/preferences';
import {
  SegmentedControl,
  SegmentedControlItem,
} from '@ui-sdk/react/segmented-control';
import { css } from 'ds/css';
import { circle, grid } from 'ds/patterns';
import { motion, useReducedMotion } from 'motion/react';
import { useSyncExternalStore } from 'react';
import { ICON_SVG_COMPONENTS, Theme } from './icon-components';

const THEMES = Object.keys(ICON_SVG_COMPONENTS) as Array<Theme>;

// The theme itself swaps instantly, so the indicator has to land fast to
// read as part of the same change rather than trailing behind it.
const INDICATOR_SPRING = { type: 'spring', duration: 0.25, bounce: 0 } as const;

const isTheme = (value: string): value is Theme => value in ICON_SVG_COMPONENTS;

// Without this, every color transition on the page would run as the theme
// swaps, each on its own timing.
const withoutTransitions = (update: () => void) => {
  const style = document.createElement('style');
  style.textContent = '*,*::before,*::after{transition:none!important}';
  document.head.append(style);
  update();
  void window.getComputedStyle(document.body).color;
  requestAnimationFrame(() => style.remove());
};

const subscribe = () => () => {};

const ThemeToggle = () => {
  const { value: theme } = usePreference(colorScheme);
  // The choice lives in localStorage, so the server can't know it.
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const value = isMounted ? theme : null;
  const reduceMotion = useReducedMotion();

  return (
    <SegmentedControl
      aria-label='Theme'
      value={value}
      onValueChange={(next) => {
        if (next != null && isTheme(next)) {
          withoutTransitions(() => colorScheme.set(next));
        }
      }}
      className={root}
    >
      {THEMES.map((key) => {
        const { icon: Icon, label } = ICON_SVG_COMPONENTS[key];

        return (
          <SegmentedControlItem
            key={key}
            value={key}
            aria-label={label}
            className={item}
          >
            {value === key ? (
              <motion.span
                layoutId='theme-indicator'
                transition={
                  reduceMotion === true ? { duration: 0 } : INDICATOR_SPRING
                }
                className={indicator}
              />
            ) : null}
            <Icon aria-hidden className={icon} />
          </SegmentedControlItem>
        );
      })}
    </SegmentedControl>
  );
};

const root = grid({
  gap: '5px',
  gridTemplateColumns: 'repeat(3, 20px)',
  justifyContent: 'center',
  alignItems: 'center',
  rounded: 'pill',
  bgColor: 'slate3',
  isolation: 'isolate',
  border: 'none',
  p: 0,
  h: 30,
  w: 90,
});

const item = circle({
  size: 20,
  // The items share the control's stacking context, so a travelling indicator
  // stays under every icon instead of over the one it leaves.
  pos: 'relative',
  zIndex: 'auto',
  p: 0,
  color: 'slate10',
  bg: 'transparent',
  cursor: 'pointer',
  '@media (hover: hover) and (pointer: fine)': {
    _hover: { color: 'slate11' },
  },
  '&[data-checked]': {
    color: 'slate12',
  },
});

const indicator = css({
  pos: 'absolute',
  inset: 0,
  zIndex: 0,
  rounded: 'round',
  bgColor: 'slate5',
});

const icon = css({
  pos: 'relative',
  zIndex: 1,
});

export default ThemeToggle;
