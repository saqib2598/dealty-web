module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'no-unused-vars': [
      'error',
      {'argsIgnorePattern': '^_'},
    ],
    'prettier/prettier': [
      'error',
      {},
      {'usePrettierrc': true},
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'no-class-assign': 0,
    'no-prototype-builtins': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/no-unescaped-entities': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-undef': 'error',
    'max-lines-per-function': 0,
    'max-len': 0,
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        'groups': [
          [
            '^react',
            '^@?\\w',
          ],
          ['^(actions|reducers|helpers|components|assets|variables|api|style|config|store)(/.*|$)'],
          ['^\\\\u0000"'],
          [
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
          ],
          [
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
          ['^.+\\.s?css$'],
        ],
      },
    ],
  },
};
