module.exports = [
  {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'simple-import-sort': import('eslint-plugin-simple-import-sort'),
      'unused-imports': require('eslint-plugin-unused-imports'),
      cypress: require('eslint-plugin-cypress'),
    },
    extends: [
      'eslint:recommended',
      'next',
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    ignorePatterns: ['!.prettierrc.js'],
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/no-unescaped-entities': 'off',

      'react/display-name': 'off',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],

      //#region  //*=========== Unused Import ===========
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      //#endregion  //*======== Unused Import ===========

      //#region  //*=========== Import Sort ===========
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // ext library & side effect imports
            ['^@?\\w', '^\\u0000'],
            // {s}css files
            ['^.+\\.s?css$'],
            // Lib and hooks
            ['^@/lib', '^@/hooks'],
            // static data
            ['^@/data'],
            // components
            ['^@/components', '^@/container'],
            // zustand store
            ['^@/store'],
            // Other imports
            ['^@/'],
            // relative paths up until 3 level
            [
              '^\\./?$',
              '^\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\./\\.\\.(?!/?$)',
            ],
            ['^@/types'],
            // other that didnt fit in
            ['^'],
          ],
        },
      ],
      //#endregion  //*======== Import Sort ===========

      // #region   //*========= Cypress files =========
      '@typescript-eslint/no-namespace': [
        'error',
        {
          allowDeclarations: true,
        },
      ],
      // #endregion   //*========= Cypress files =========
    },
    globals: {
      React: true,
      JSX: true,
    },
  },
];