import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [

  // -----------------------------
  // Ignore patterns
  // -----------------------------
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/*.tsbuildinfo',
      '**/.env*',
      '**/docs/.vitepress/*',
    ],
  },

  // -----------------------------
  // Base JS Rules (Recommended)
  // -----------------------------
  js.configs.recommended,

  // -----------------------------
  // TypeScript Rules + Parser
  // -----------------------------
  {
    files: ['docs/src/**/*.[ts,md]'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
        Bun: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // -----------------------------
  // Global stylistic rules
  // -----------------------------
  {
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      indent: ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'max-len': 'off',
    },
  },
];
