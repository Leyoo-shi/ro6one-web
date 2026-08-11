import type { LayoutServerLoad } from './$types';

/**
 * The locale resolved in `hooks.server.ts` is the single source of truth for
 * server-rendered copy. The client may override it afterwards (see
 * `$lib/i18n/context.svelte.ts`) without a navigation.
 */
export const load: LayoutServerLoad = ({ locals }) => {
	return { locale: locals.locale };
};
