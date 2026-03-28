import tsPlugin from '@typescript-eslint/eslint-plugin';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores([
    '**/*.{js,mjs,cjs}',
    '**/*.d.ts',
    'src/graphql/generated/*',
  ]),
  ...nextCoreWebVitals,
  ...tsPlugin.configs['flat/recommended-type-checked'],
  ...tsPlugin.configs['flat/strict'],
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },

    rules: {
      'no-unused-vars': 'off',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-constant-binary-expression': 'warn',
      'no-implicit-coercion': 'warn',
      'no-unneeded-ternary': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/prefer-reduce-type-parameter': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
]);
