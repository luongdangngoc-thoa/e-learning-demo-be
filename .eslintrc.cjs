/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx,cjs}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: [path.resolve(__dirname, 'tsconfig.json'), path.resolve(__dirname, 'tsconfig.eslint.json')],
        sourceType: 'module'
      },
      extends: ['eslint:recommended', 'eslint-config-prettier', 'plugin:prettier/recommended', 'prettier'],
      plugins: ['@typescript-eslint', 'import', 'prettier', 'simple-import-sort', 'unused-imports'],
      settings: {
        react: {
          version: 'detect'
        },
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
          node: {
            paths: [path.resolve(__dirname, '')],
            extensions: ['.js', '.jsx', '.ts', '.tsx']
          },
          typescript: {
            project: path.resolve(__dirname, 'tsconfig.json')
          }
        },
        env: {
          node: true
        }
      },
      rules: {
        'no-unused-vars': 'off',
        'no-nested-ternary': 'off',
        'object-curly-newline': 'off',
        'max-len': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/semi': ['error', 'never'],
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true
          }
        ],
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            fixStyle: 'inline-type-imports'
          }
        ],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            ignoreRestSiblings: true,
            destructuredArrayIgnorePattern: '[A-Z]',
            caughtErrors: 'none'
          }
        ],
        '@typescript-eslint/no-misused-promises': [
          2,
          {
            checksVoidReturn: {
              attributes: false
            }
          }
        ],
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            endOfLine: 'auto'
          }
        ],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never'
          }
        ],
        '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
        'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
        // Overrides Airbnb configuration and enable no-restricted-syntax
        'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
        'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
        'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
        'import/order': 'off', // Avoid conflict rule between `eslint-plugin-import` and `eslint-plugin-simple-import-sort`
        'unused-imports/no-unused-imports': 'error'
        // 'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      }
    }
  ]
}
