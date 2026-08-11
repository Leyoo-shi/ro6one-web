import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			/*
			 * adapter-node: the site is deployed as a long-running Node server in
			 * a container, behind a reverse proxy. Server-side rendering is
			 * required — the request locale (cookie / Accept-Language) is resolved
			 * in hooks.server.ts, so the first paint is already in the right
			 * language. See README for the runtime environment variables.
			 */
			adapter: adapter({ out: 'build' })
		})
	]
});
