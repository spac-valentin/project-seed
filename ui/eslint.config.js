// @ts-check
import tseslint from 'typescript-eslint';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';

export default tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      ...tseslint.configs.recommended,
    ],
    plugins: {
      '@angular-eslint': angular,
    },
    processor: angularTemplate.processors['extract-inline-html'],
    rules: {
      // Enforce OnPush change detection
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      // Enforce standalone components (no NgModules)
      '@angular-eslint/prefer-standalone': 'error',
      // Enforce inject() over constructor injection
      '@angular-eslint/prefer-inject': 'error',
      // Enforce signals inputs
      '@angular-eslint/prefer-signals': 'error',
      // No unused vars
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // No explicit any
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplate,
    },
    languageOptions: {
      parser: angularTemplateParser,
    },
    rules: {
      // Enforce @if/@for/@switch over *ngIf/*ngFor/*ngSwitch
      '@angular-eslint/template/prefer-control-flow': 'error',
      // Enforce NgOptimizedImage for <img>
      '@angular-eslint/template/prefer-ngsrc': 'error',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', '*.spec.ts'],
  },
);
