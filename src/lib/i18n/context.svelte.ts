import { getContext, setContext } from 'svelte';
import { browser } from '$app/environment';
import {
	LOCALE_COOKIE,
	LOCALE_COOKIE_MAX_AGE,
	getDictionary,
	isLocale,
	type Dictionary,
	type Locale
} from './index';

const I18N_KEY = Symbol('ro6one.i18n');

/**
 * Reactive locale holder.
 *
 * The server-rendered locale arrives as a getter (from `+layout.server.ts`), so
 * SSR output is already in the right language and there is no hydration flash.
 * A client-side switch only sets `#override`, which re-renders every component
 * that reads `t` — no navigation, no reload.
 *
 * Deliberately instantiated per layout render instead of living as module-level
 * state, so concurrent SSR requests can never share one visitor's language.
 */
class I18n {
	#serverLocale: () => Locale;
	#override = $state<Locale | null>(null);

	constructor(serverLocale: () => Locale) {
		this.#serverLocale = serverLocale;
	}

	get locale(): Locale {
		return this.#override ?? this.#serverLocale();
	}

	/** The active dictionary. Read as `i18n.t.nav.about`. */
	get t(): Dictionary {
		return getDictionary(this.locale);
	}

	set(locale: Locale) {
		if (!isLocale(locale) || locale === this.locale) return;

		this.#override = locale;

		if (browser) {
			document.documentElement.lang = locale;
			document.cookie = [
				`${LOCALE_COOKIE}=${locale}`,
				'path=/',
				`max-age=${LOCALE_COOKIE_MAX_AGE}`,
				'samesite=lax',
				location.protocol === 'https:' ? 'secure' : ''
			]
				.filter(Boolean)
				.join('; ');
		}
	}
}

export type { I18n };

export function createI18n(serverLocale: () => Locale): I18n {
	const i18n = new I18n(serverLocale);
	setContext(I18N_KEY, i18n);
	return i18n;
}

export function useI18n(): I18n {
	const i18n = getContext<I18n | undefined>(I18N_KEY);

	if (!i18n) {
		throw new Error('useI18n() was called outside the root layout context.');
	}

	return i18n;
}
