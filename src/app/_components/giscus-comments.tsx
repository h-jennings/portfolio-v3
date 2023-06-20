'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { Theme } from './navigation/icon-components';

export const GiscusComments = () => {
  const { theme } = useTheme();
  return (
    <Giscus
      repo='h-jennings/portfolio-v3'
      mapping='pathname'
      repoId='MDEwOlJlcG9zaXRvcnk0MDgyNjE5NzM='
      category='Comment'
      categoryId='DIC_kwDOGFWVVc4CUphe'
      strict='0'
      reactionsEnabled='1'
      emitMetadata='0'
      inputPosition='top'
      theme={THEME_LOOKUP[theme as Theme]}
      loading='lazy'
      lang='en'
    />
  );
};

const THEME_LOOKUP = {
  light: 'light',
  dark: 'dark',
  system: 'preferred_color_scheme',
} as const;
