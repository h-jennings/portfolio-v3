import { semanticTokens } from '@/app/_theme/semantic-tokens';
import { tokens } from '@/app/_theme/tokens';
import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: ['./src/app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    tokens,
    semanticTokens,
    breakpoints: {
      bp1: '520px',
      bp2: '768px',
      bp3: '1040px',
      bp4: '1800px',
    },
  },
  outdir: 'ds',
  jsxFramework: 'react',
  conditions: {
    extend: {
      dark: '.dark-theme &',
      light: '.light-theme &',
    },
  },
});
