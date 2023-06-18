import { linkRecipe } from '@/app/_styles/recipes/link';
import { globalCss } from '@/app/_theme/global-css';
import { semanticTokens } from '@/app/_theme/semantic-tokens';
import { textStyles } from '@/app/_theme/text-styles';
import { tokens } from '@/app/_theme/tokens';
import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: ['./src/app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    tokens,
    semanticTokens,
    textStyles,
    breakpoints: {
      bp1: '520px',
      bp2: '768px',
      bp3: '1040px',
      bp4: '1800px',
    },
    extend: {
      recipes: {
        link: linkRecipe,
      },
    },
  },
  globalCss,
  outdir: 'ds',
  jsxFramework: 'react',
  conditions: {
    extend: {
      dark: '.dark-theme &',
      light: '.light-theme &',
    },
  },
});
