import type { Handle } from '@sveltejs/kit';
import { LOCALE_COOKIE, isLocale, localeFromAcceptLanguage } from '$lib/i18n';

/**
 * Resolves the request locale once, server-side:
 *
 *   explicit cookie choice → Accept-Language → default
 *
 * The result is exposed through `locals` (read by `+layout.server.ts`) and
 * stamped into `<html lang>` so the SSR response is already correct for search
 * engines, screen readers and browser translation prompts.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const cookieLocale = event.cookies.get(LOCALE_COOKIE);
	const hasExplicitChoice = isLocale(cookieLocale);

	const locale = hasExplicitChoice
		? cookieLocale
		: localeFromAcceptLanguage(event.request.headers.get('accept-language'));

	event.locals.locale = locale;

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%ro6one.lang%', locale)
	});

	// Without an explicit choice the markup varies by request header; say so, so
	// a shared cache in front of the app cannot serve the wrong language.
	if (!hasExplicitChoice) {
		response.headers.append('Vary', 'Accept-Language');
	}

	return response;
};
