'use client';

import { css, cx } from 'ds/css';
import { motion, useReducedMotion } from 'motion/react';
import * as React from 'react';

const dockSpring = { type: 'spring', duration: 0.5, bounce: 0.15 } as const;

const NAMES = [
  'Ada Lovelace',
  'Grace Hopper',
  'Alan Turing',
  'Margaret Hamilton',
  'Dennis Ritchie',
  'Barbara Liskov',
  'Linus Torvalds',
  'Radia Perlman',
  'Donald Knuth',
  'Frances Allen',
  'Tim Berners-Lee',
  'Katherine Johnson',
  'John von Neumann',
  'Claude Shannon',
  'Edsger Dijkstra',
  'Sheryl Sandberg',
  'Ken Thompson',
  'Adele Goldberg',
  'James Gosling',
  'Marissa Mayer',
];

const PLACEHOLDER = 'Search team…';

export function StickyStuck() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const pendingFocusRef = React.useRef(false);

  const [isStuck, setIsStuck] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [value, setValue] = React.useState('');

  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    const sentinelEl = sentinelRef.current;
    const scrollEl = scrollRef.current;
    if (!sentinelEl || !scrollEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const stuck = !entry.isIntersecting;
        setIsStuck((prev) => (prev === stuck ? prev : stuck));
      },
      { root: scrollEl, threshold: 0, rootMargin: '0px 0px -4px 0px' },
    );

    observer.observe(sentinelEl);
    return () => observer.disconnect();
  }, []);

  const compact = isStuck && !isFocused && value.length === 0;
  const reduced = prefersReducedMotion ?? false;
  const transition = reduced ? { duration: 0 } : dockSpring;

  React.useEffect(() => {
    if (!compact && pendingFocusRef.current) {
      inputRef.current?.focus();
      pendingFocusRef.current = false;
    }
  }, [compact]);

  const activate = () => {
    pendingFocusRef.current = true;
    setIsFocused(true);
  };

  const filtered = NAMES.filter((name) =>
    name.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div
      ref={scrollRef}
      className={scroll}
      tabIndex={0}
      role='region'
      aria-label='Scrollable demo area'
    >
      <p className={hint}>Scroll to dock the search bar</p>

      <div ref={sentinelRef} className={sentinel} aria-hidden />

      <div className={stickyRow}>
        <motion.div
          layout
          layoutDependency={compact}
          className={cx(shell, compact && shellCompact)}
          transition={transition}
          style={{ borderRadius: '9999px' }}
        >
          {compact ? (
            <button type='button' className={compactInner} onClick={activate}>
              <motion.span
                layoutId='sticky-search-icon'
                layoutDependency={compact}
                className={iconWrap}
                transition={transition}
              >
                <SearchIcon width={12} height={12} />
              </motion.span>
              <motion.span
                layoutId='sticky-search-label'
                layout='position'
                layoutDependency={compact}
                className={compactLabel}
                transition={transition}
              >
                Search
              </motion.span>
            </button>
          ) : (
            <div
              className={expandedInner}
              onClick={() => inputRef.current?.focus()}
            >
              <motion.span
                layoutId='sticky-search-icon'
                layoutDependency={compact}
                className={iconWrap}
                transition={transition}
              >
                <SearchIcon />
              </motion.span>
              <motion.div
                layout='position'
                layoutDependency={compact}
                className={inputWrap}
              >
                <input
                  ref={inputRef}
                  className={input}
                  placeholder={PLACEHOLDER}
                  value={value}
                  spellCheck={false}
                  onChange={(e) => setValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <motion.div
                  layoutId='sticky-search-label'
                  layout='position'
                  layoutDependency={compact}
                  aria-hidden
                  className={placeholder}
                  animate={{ opacity: value.length === 0 ? 1 : 0 }}
                  transition={{ ...transition, opacity: { duration: 0 } }}
                >
                  {PLACEHOLDER}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>

      <ul className={list}>
        {filtered.map((name) => (
          <li key={name} className={row}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SearchIcon(props: React.ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}

const scroll = css({
  position: 'relative',
  w: 'full',
  h: 'full',
  overflowY: 'auto',
  px: 'm',
  pt: 'm',
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
  clipPath: 'inset(0 round calc(token(radii.card) - token(spacing.3xs)))',
});

const hint = css({
  fontSize: '0',
  color: 'text2',
  textAlign: 'center',
  textDecoration: 'underline',
  textDecorationStyle: 'dashed',
  textDecorationColor: 'slate7',
  textUnderlineOffset: '3px',
  mt: 'l',
  mb: 'm',
});

const sentinel = css({
  h: '1px',
  w: 'full',
  marginBottom: '-1px',
});

const stickyRow = css({
  position: 'sticky',
  top: '0',
  zIndex: 1,
  mx: 'auto',
  maxW: 'full',
  h: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const shell = css({
  position: 'relative',
  display: 'flex',
  w: '280px',
  h: '40px',
  border: '1px solid',
  borderColor: 'slate6',
  bgColor: 'slate3',
  color: 'text1',
  overflow: 'hidden',
  willChange: 'transform',
  transition:
    'border-color 225ms ease, color 225ms ease, background-color 225ms ease, box-shadow 225ms ease',
  _focusWithin: {
    borderColor: 'gold8',
    color: 'text1',
    bgColor: 'slate2',
    boxShadow: 'focus',
  },
});

const shellCompact = css({
  w: 'max-content',
  h: '24px',
  borderColor: 'slate5',
  bgColor: 'slate2',
  color: 'text2',
});

const iconWrap = css({
  display: 'inline-flex',
  flexShrink: 0,
});

const expandedInner = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2xs',
  w: 'full',
  h: 'full',
  pl: 'xs',
  pr: 'xs',
  cursor: 'text',
});

const compactInner = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3xs',
  w: 'full',
  h: 'full',
  px: '2xs',
  bg: 'transparent',
  border: 'none',
  color: 'inherit',
  cursor: 'pointer',
  font: 'inherit',
  appearance: 'none',
  _focusVisible: { outline: 'none' },
});

const compactLabel = css({
  fontSize: '0',
  fontWeight: 'regular',
  color: 'text2',
  letterSpacing: '-0.01em',
});

const inputWrap = css({
  position: 'relative',
  flex: 1,
  minW: 0,
});

const input = css({
  flex: 1,
  minW: 0,
  w: 'full',
  h: 'full',
  bg: 'transparent',
  border: 'none',
  outline: 'none',
  fontSize: '1',
  color: 'text1',
  _placeholder: { visibility: 'hidden' },
});

const placeholder = css({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  fontSize: '1',
  color: 'text2',
  pointerEvents: 'none',
  opacity: 1,
  '&[data-visible="false"]': {
    opacity: 0,
  },
});

const list = css({
  display: 'flex',
  flexDir: 'column',
  listStyle: 'none',
  pt: 'm',
});

const row = css({
  display: 'flex',
  alignItems: 'center',
  px: 'xs',
  py: '2xs',
  fontSize: '1',
  color: 'text1',
  borderBottom: '1px solid',
  borderColor: 'slate3',
  _last: { borderBottom: 'none' },
});
