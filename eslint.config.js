import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import eslintJs from '@eslint/js';
import eslintReact from 'eslint-plugin-react';
import eslintTs from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  eslintReact.configs.flat.recommended,
  {
    languageOptions: {
      parser: eslintTs.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: process.cwd(),
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-console': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      'arrow-body-style': ['error', 'as-needed'],
    },
  },

  {
    languageOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/consistent-type-exports': [
        'error',
        {
          fixMixedExportsWithInlineTypeSpecifier: true,
        },
      ],
    },
  },
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['app', '!~/app', '!./app'],
              message: 'Import from "~/app" instead',
            },
            {
              group: ['pages', '!~/pages'],
              message: 'Import from "~/pages" instead',
            },
            {
              group: ['api', '!~/api'],
              message: 'Import from "~/api" instead',
            },
            {
              group: ['assets', '!~/assets'],
              message: 'Import from "~assets" instead',
            },
            {
              group: ['hooks', '!~/hooks'],
              message: 'Import from "~/hooks" instead',
            },
            {
              group: ['layouts', '!~/layouts'],
              message: 'Import from "~/layouts" instead',
            },
            {
              group: ['utils', '!~/utils'],
              message: 'Import from "~/utils" instead',
            },
          ],
        },
      ],
    },
  },
];