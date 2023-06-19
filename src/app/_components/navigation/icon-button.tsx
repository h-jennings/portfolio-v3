'use client';
import { cva, cx } from 'ds/css';
import { circle, grid } from 'ds/patterns';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ICON_SVG_COMPONENTS, Theme } from './icon-components';

interface IconButtonProps {
  icon: Theme;
}
const IconButton = ({ icon }: IconButtonProps) => {
  const { theme, setTheme } = useTheme();
  const isActive = theme === icon;

  const Icon = ICON_SVG_COMPONENTS[icon].icon;
  const buttonLabel = ICON_SVG_COMPONENTS[icon].label;

  return (
    <div
      className={grid({
        pos: 'relative',
        zIndex: 0,
        placeItems: 'center',
        h: 20,
      })}
    >
      <button
        className={cx(circle({ size: 15 }), iconButton({ isActive }))}
        aria-label={`Change to ${buttonLabel}`}
        onClick={() => setTheme(icon)}
      >
        <Icon />
      </button>
      {isActive ? (
        <motion.div
          className={circle({ size: 20, bgColor: 'slate5', pos: 'absolute' })}
          layout
          layoutId='circle'
        />
      ) : null}
    </div>
  );
};

const iconButton = cva({
  base: {
    display: 'block',
    transitionDuration: 'default',
    transitionTimingFunction: 'default',
    transitionProperty: 'color',
    gridArea: '1 / 1 / 1 / 1',
    zIndex: 2,
  },
  variants: {
    isActive: {
      true: {
        color: 'slate12',
      },
      false: {
        color: 'slate8',
      },
    },
  },
});

export default IconButton;
