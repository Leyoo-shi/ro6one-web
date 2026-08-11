import type { LocalizedText } from './localized';

/**
 * Institutional relationships and supporters.
 *
 * These are two different things and the page treats them differently.
 * Trabzonspor is not a logo in a grid: the club's identity is part of the
 * team's own name, and the cooperation protocol with Trabzon Merkez Fen Lisesi
 * is what put the team on the map. Everything else is support, which is
 * valuable but structurally different.
 *
 * Nothing goes in this file until the relationship is confirmed and the other
 * party is happy to be named. Prospective conversations stay private.
 */
export type InstitutionalRelation = {
	id: string;
	name: string;
	/** Verified public milestone dates for the relationship. */
	since?: string;
	/** Official site. Omit rather than guess. */
	url?: string;
	/**
	 * Official brand asset under /static. Must come from the organization
	 * itself — never redrawn, recoloured or recombined.
	 */
	logo?: string;
};

export const institutions: InstitutionalRelation[] = [
	{
		id: 'trabzonspor',
		name: 'Trabzonspor',
		since: '2026-03',
		url: 'https://www.trabzonspor.org.tr',
		// TODO(team): add the official Trabzonspor mark, supplied by the club.
		// Do not trace, recolour or merge it with the RO6ONE wordmark.
		logo: undefined
	},
	{
		id: 'school',
		name: 'Trabzon Merkez Fen Lisesi',
		url: 'https://trabzonfenlisesi.meb.k12.tr'
	}
];

export type SupportTier = 'lead' | 'supporting' | 'inKind';

export type Supporter = {
	name: string;
	url?: string;
	logo?: string;
	description?: LocalizedText;
	tier?: SupportTier;
};

/**
 * Confirmed supporters only. Empty by design: conversations in progress are not
 * partnerships, and prospective names must never appear on a public page.
 */
export const supporters: Supporter[] = [];

/**
 * TODO(team): set to a path under /static (e.g. '/documents/ro6one-2027.pdf')
 * once the partnership document is finished; the page links it automatically.
 */
export const partnershipDocument = '';
