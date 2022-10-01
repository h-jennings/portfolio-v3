import * as React from 'react';

/**
 * Sets the custom property: '--vh'
 */
export function useVisualViewportHeight(): void {
  React.useEffect(() => {
    const root = document.documentElement;

    const setVisualVhProperty = (): void => {
      const v = window.visualViewport;
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const vh = v?.height;
      root.style.setProperty('--vh', `${vh}px`);
    };

    setVisualVhProperty();

    window.addEventListener('resize', setVisualVhProperty);

    return () => window.removeEventListener('resize', setVisualVhProperty);
  }, []);
}
