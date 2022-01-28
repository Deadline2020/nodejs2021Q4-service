module.exports = {
  root: true,
  env: {
    es2020: true,
    jasmine: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2021,
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  settings: {
    noInlineConfig: true,
    import/resolver: {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
    node: {
      resolvePath: ['__dirname'],
      tryExtensions: ['.js', '.ts'],
    },
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    "eslint:recommended",
    'plugin:@typescript-eslint/recommended',
    "plugin:node/recommended",
    'plugin:prettier/recommended',
    "airbnb-base",
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
