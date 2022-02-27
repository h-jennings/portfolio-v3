import * as React from 'react';

/**
 * Sets the custom property: '--vh'
 */
export function useVisualViewportHeight(): void {
  React.useEffect(() => {
    const root = document.documentElement;

    const setVisualVhProperty = (): void => {
      const vh = window?.visualViewport?.height ?? window.innerHeight;
      root.style.setProperty('--vh', `${vh}px`);
    };

    setVisualVhProperty();

    window.addEventListener('resize', setVisualVhProperty);

    return () => window.removeEventListener('resize', setVisualVhProperty);
  }, []);
}
