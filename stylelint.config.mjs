export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-prettier/recommended',
  ],
  ignoreFiles: ['node_modules/**', 'dist/**', 'coverage/**'],
  overrides: [
    {
      files: ['*.html', '**/*.html', '*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {},
}
