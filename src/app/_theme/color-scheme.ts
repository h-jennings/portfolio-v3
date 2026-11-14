import { createColorScheme, createLocalStorage } from '@ui-sdk/core';

// `theme` is the key next-themes used, so saved choices carry over.
export const colorScheme = createColorScheme({
  global: true,
  storage: createLocalStorage('theme'),
});
