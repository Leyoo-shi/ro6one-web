import prettier from 'eslint-config-prettier';
import path from 'node:path';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		}
	},
	{
		rules: {
			/*
			 * The site is served from the domain root, so `paths.base` is empty
			 * and resolve() would be an identity call on every link. Link hrefs
			 * also come from the shared navigation config and generic link
			 * components, where the rule cannot see through the indirection —
			 * instead, NavItem['href'] is typed as SvelteKit's generated
			 * `Pathname`, which catches bad routes at type-check time.
			 *
			 * Programmatic navigation (goto / pushState / replaceState) is still
			 * checked. Re-enable link checking if a base path is ever configured.
			 */
			'svelte/no-navigation-without-resolve': ['error', { ignoreLinks: true }]
		}
	}
);
