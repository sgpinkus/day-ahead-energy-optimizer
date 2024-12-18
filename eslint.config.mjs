import eslint from '@eslint/js';
// import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
  { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs['flat/recommended'],
    ],
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
        jsx: true,
        tsx: true,
      },
    },
    rules: {
      'no-var': 'warn',
      'eqeqeq': 'warn',
      'keyword-spacing': 'error',
      'handle-callback-err': 'error',
      'no-console': 0,
      'linebreak-style': 0,
      'react/no-unescaped-entities': 0,
      'quotes': [ 'error', 'single', { avoidEscape: true, allowTemplateLiterals: true } ],
      'semi': ['error', 'always'],
      'semi-spacing': 'error',
      'spaced-comment': ['warn', 'always'],
      'vue/multi-word-component-names': 'off',
      'comma-dangle': ['warn', 'always-multiline'],
      'no-unused-vars': 0,
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  // eslintConfigPrettier
);