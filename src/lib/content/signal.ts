/**
 * The daily record.
 *
 * On days when nobody has a birthday, the same space shows one entry from this
 * deck. Every line is a fact the team supplied or that is verifiable in public
 * sources — there are no invented "fun facts" here, and the deck is short on
 * purpose. Copy lives in the dictionaries; this file only holds the order and
 * where each entry points.
 */
import type { Dictionary } from '$lib/i18n';

export type SignalEntry = {
	id: keyof Dictionary['daily']['signal']['facts'];
	/** Optional route the entry can be read about in full. */
	href?: '/about' | '/impact' | '/team' | '/robotics';
};

export const signalDeck: SignalEntry[] = [
	{ id: 'founded', href: '/about' },
	{ id: 'home', href: '/about' },
	{ id: 'number' },
	{ id: 'steamfest', href: '/impact' },
	{ id: 'steamfestConcept', href: '/impact' },
	{ id: 'offseason', href: '/impact' },
	{ id: 'offseasonTeams', href: '/impact' },
	{ id: 'platform', href: '/team' },
	{ id: 'infrastructure', href: '/team' },
	{ id: 'firstSeason', href: '/robotics' },
	{ id: 'steamForStem', href: '/impact' },
	{ id: 'stemForPeople', href: '/impact' }
];
