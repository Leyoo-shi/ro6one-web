import type { LocalizedText } from './localized';

/**
 * `lead` renders larger than `supporting`; `inKind` is for material, machining
 * or service support. Tiers are optional — a flat list works fine.
 */
export type PartnerTier = 'lead' | 'supporting' | 'inKind';

export type Partner = {
	name: string;
	/** Official site. Omit rather than guess. */
	url?: string;
	/** Logo in /static — prefer SVG or a transparent PNG. */
	logo?: string;
	description?: LocalizedText;
	tier?: PartnerTier;
};

/**
 * Intentionally empty: no partner is listed until the partnership is confirmed
 * and the organization is happy to be named. The /partners page renders a
 * truthful empty state in the meantime.
 */
export const partners: Partner[] = [];

/**
 * TODO(team): set this to a path in /static (e.g. '/documents/ro6one-partnership.pdf')
 * once the sponsorship document exists. The partners page links it when present.
 */
export const partnershipDocument = '';
