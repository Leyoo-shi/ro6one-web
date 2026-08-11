import { defaultLocale, type Locale } from '$lib/i18n';

/**
 * Content-file text that may or may not be translated yet.
 *
 * A plain string is used as-is in every language; an object supplies per-locale
 * variants and falls back to the default locale when one is missing. This lets
 * the team add real content (projects, members, partners) incrementally without
 * blocking on translation.
 */
export type LocalizedText = string | Partial<Record<Locale, string>>;

export function resolveText(text: LocalizedText | undefined, locale: Locale): string {
	if (!text) return '';
	if (typeof text === 'string') return text;

	return text[locale] ?? text[defaultLocale] ?? Object.values(text)[0] ?? '';
}
