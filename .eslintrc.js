module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __CLIENT__: true,
    __SERVER__: true,
    __DEV__: true,
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'eslint-plugin-import-helpers'],
  rules: {
    'prettier/prettier': ['error'],

    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: ['/^react/', 'module', ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    'react/jsx-props-no-spreading': 'off',
    camelcase: 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
        alias: {
          root: './src',
        },
      },
    },
  },
};
