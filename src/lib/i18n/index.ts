import { en, type Dictionary } from './dictionaries/en';
import { tr } from './dictionaries/tr';

export type { Dictionary };

/**
 * Adding a language:
 *  1. copy `dictionaries/en.ts` to `dictionaries/<code>.ts` and translate it
 *     (the `Dictionary` type will flag anything missing),
 *  2. add the code to `locales`,
 *  3. add the entries to `dictionaries` and `localeMeta`.
 *
 * Nothing else in the app needs to change.
 */
export const locales = ['en', 'tr'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const dictionaries: Record<Locale, Dictionary> = { en, tr };

/**
 * `short` is the visible switcher label, `label` the accessible name, `og` the
 * Open Graph locale code.
 */
export const localeMeta: Record<Locale, { short: string; label: string; og: string }> = {
	en: { short: 'EN', label: 'English', og: 'en_US' },
	tr: { short: 'TR', label: 'Türkçe', og: 'tr_TR' }
};

/** Preference cookie. Written client-side only, on an explicit user choice. */
export const LOCALE_COOKIE = 'ro6one_locale';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
	return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/**
 * Resolves a locale from an `Accept-Language` header, honouring q-weights and
 * matching on the primary subtag so `tr-TR` still resolves to `tr`.
 */
export function localeFromAcceptLanguage(header: string | null | undefined): Locale {
	if (!header) return defaultLocale;

	const ranked = header
		.split(',')
		.map((part) => {
			const [tag, ...params] = part.trim().split(';');
			const quality = params
				.map((param) => param.trim())
				.find((param) => param.startsWith('q='))
				?.slice(2);

			return {
				primary: tag.trim().toLowerCase().split('-')[0],
				quality: quality === undefined ? 1 : Number.parseFloat(quality) || 0
			};
		})
		.filter((entry) => entry.quality > 0)
		.sort((a, b) => b.quality - a.quality);

	for (const entry of ranked) {
		if (isLocale(entry.primary)) return entry.primary;
	}

	return defaultLocale;
}
