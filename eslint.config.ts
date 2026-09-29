// @ts-check
import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import angularEslint from 'angular-eslint';
import stylistic from '@stylistic/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

/** @type {import("eslint").Linter.Config[]} */

export default defineConfig([
  // Global ignore patterns (actually ignores directories and not just files)
  globalIgnores(['dist/', 'build/', 'coverage/']),

  // Base ESLint recommended rules (apply to all files implicityly by default)
  eslint.configs.recommended,

  // Typescript specific configuration (applies only to .ts files)
  {
    files: ['**/*.ts'],
    plugins: {
      ['@stylistic']: stylistic,
    },
    extends: [
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        ecmaFeatures: { modules: true },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Add any custom , non-Angular Typescript rules here
      // Prevent floating promises (common async bug)
      '@typescript-eslint/no-floating-promises': 'error',

      // Require await in async functions (catches mistakes)
      '@typescript-eslint/require-await': 'error',

      //Ban @ts-ignore without explanation
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': 'allow-with-description', minimumDescriptionLength: 10 },
      ],

      // Enforce strict equality checks
      eqeqeq: ['error', 'always'],

      // Require explicit accessibility modifiers on class members
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit' },
      ],

      // Enforce naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        // Interfaces must start with an 'I'
        { selector: 'interface', format: ['PascalCase'], prefix: ['I'] },
        // Types must be in PascalCase
        { selector: 'typeAlias', format: ['PascalCase'] },
        // Constants must be UPPER_CASE or camelCase
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE'],
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            memberTypes: [
              'private-decorated-field',
              'protected-decorated-field',
              'public-decorated-field',
              'private-static-field',
              'protected-static-field',
              'public-static-field',
              'private-instance-field',
              'protected-instance-field',
              'public-instance-field',
              'static-field',
              'private-field',
              'protected-field',
              'public-field',
              'constructor',
              'private-static-method',
              'protected-static-method',
              'public-static-method',
              'private-method',
              'protected-method',
              'public-method',
            ],
          },
        },
      ],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/template-curly-spacing': ['error', 'never'],
    },
  },

  // Angular=specific configuration (applies to .ts files and inline templates)
  {
    files: ['**/*.ts'],
    processor: angularEslint.processInlineTemplates,
    extends: [angularEslint.configs.tsRecommended],
    rules: {
      // Add Angular-specific TS rules (e.g., component/directive selectors)
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          style: 'camelCase',
          prefix: [],
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          style: 'kebab-case',
          prefix: [],
        },
      ],
    },
  },

  // Angular HTML Phase 1: template-specific configuration (applies only to .html files)
  // NOTE: WE ARE NOT APPLYING PRETTIER IN THIS OVERRIDE, ONLY @ANGULAR-ESLINT TEMPLATE
  {
    files: ['**/*.html'],
    plugins: {
      ['@stylistic']: stylistic,
    },
    extends: [
      angularEslint.configs.templateRecommended,
      angularEslint.configs.templateAccessibility,
    ],
    rules: {
      // Add any custom Angular HTML rules here
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/template-curly-spacing': ['error', 'always'],
      '@angular-eslint/template/eqeqeq': 'off',
    },
  },

  // Angular HTML Phase 2:
  // NOTE: WE ARE NOT APPLYING @ANGULAR-ESLINT/TEMPLATE IN THIS OVERRIDE, ONLY PRETTIER
  {
    files: ['**/*.html'],
    ignores: ['*inline-templates-*.component.html'],
    extends: [eslintPluginPrettierRecommended],
    // NOTE: WE ARE OVERRIDING THE DEFAULT CONFIG TO ALWAYS SET THE PARSER TO ANGULAR (SEE BELOW)
    rules: {
      // Add any custom Angular HTML rules here
      'prettier/prettier': [
        'error',
        {
          parser: 'angular',
        },
      ],
    },
  },

  // Node/Express Project Overrides
  {
    files: ['server/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: ['./server/tsconfig.json'],
        sourceType: 'module',
      },
      ecmaVersion: 'latest',
    },
    rules: {
      // Add Node/Express specific rules here
      'no-console': 'warn',
    },
  },
]);
