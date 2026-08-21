import type { Locale } from '$lib/i18n';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			/** Resolved in hooks.server.ts from cookie → Accept-Language → default. */
			locale: Locale;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	/**
	 * Defined by the Google tag loaded in src/app.html. Absent until that script
	 * runs, and absent entirely during SSR, so every caller must check first.
	 */
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

export {};
