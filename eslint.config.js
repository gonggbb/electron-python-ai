import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';
export default [
  // 忽略构建产物和依赖
  {
    ignores: [
      'dist/**',
      '.vite/**',
      'out/**',
      'node_modules/**',
      'coverage/**',
      '*.config.js',
      'forge.config.js',
    ],
  },

  // 基础 JS 推荐规则
  js.configs.recommended,
  // TypeScript 推荐（无类型检查，速度快）
  ...tseslint.configs.recommended,
  // Vue 3 推荐规则
  ...pluginVue.configs['flat/recommended'],

  // .vue 文件：让 vue-eslint-parser 内部用 TypeScript parser 解析 <script lang="ts>
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
  },

  // 全局环境（同时支持浏览器和 Node）
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        // electron-vite / @electron-forge 注入的构建期宏常量
        MAIN_WINDOW_VITE_DEV_SERVER_URL: 'readonly',
        MAIN_WINDOW_VITE_NAME: 'readonly',
      },
    },
  },

  // 自定义规则
  {
    files: ['**/*.{ts,js,mjs,cjs,vue}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier 作为 ESLint 规则
      'prettier/prettier': 'error',

      // 常用规则调整
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // Vue 规则
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      'vue/require-default-prop': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: { void: 'always', normal: 'never', component: 'always' },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },

  // 关闭与 Prettier 冲突的规则（必须放最后）
  prettier,
];
