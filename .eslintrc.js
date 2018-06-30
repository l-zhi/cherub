module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
  globals: {
    process: true,
    __dirname: true
  }
}
