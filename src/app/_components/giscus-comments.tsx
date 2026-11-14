'use client';

import { colorScheme } from '@/app/_theme/color-scheme';
import Giscus from '@giscus/react';
import { usePreference } from '@ui-sdk/react/preferences';

export const GiscusComments = () => {
  const { value } = usePreference(colorScheme);
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
      theme={THEME_LOOKUP[value]}
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
