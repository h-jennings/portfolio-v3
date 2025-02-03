'use client';
import { circle, grid } from 'ds/patterns';
import { LayoutGroup } from 'framer-motion';
import { ICON_SVG_COMPONENTS, Theme } from './icon-components';
import dynamic from 'next/dynamic';

const IconButtonWithLoading = dynamic(() => import('./icon-button'), {
  loading: () => <div className={circle({ size: 20, bgColor: 'slate5' })} />,
  ssr: false,
});

const ThemeToggle = () => {
  return (
    <div
      className={grid({
        gap: '5px',
        gridTemplateColumns: 'repeat(3, 20px)',
        justifyContent: 'center',
        alignItems: 'center',
        rounded: 'pill',
        bgColor: 'slate3',
        h: 30,
        w: 90,
      })}
    >
      <LayoutGroup>
        {Object.keys(ICON_SVG_COMPONENTS).map((key) => (
          <IconButtonWithLoading key={key} icon={key as Theme} />
        ))}
      </LayoutGroup>
    </div>
  );
};

export default ThemeToggle;
