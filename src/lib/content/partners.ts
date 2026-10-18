import type { LocalizedText } from './localized';

/**
 * Institutional relationships and supporters.
 *
 * These are two different things and the page treats them differently.
 * Trabzonspor is not a logo in a grid: the club's identity is part of the
 * team's own name, and the cooperation protocol with Trabzon Merkez Fen Lisesi
 * is what put the team on the map. Everything else is season support, which is
 * meaningful but structurally different — and is modelled below.
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

/**
 * A current-season supporter.
 *
 * `relationship` is the exact, documented thing the organization does for the
 * team — never a sales tier. There is no platinum, gold or main sponsor here,
 * because no such tier exists in the team's records. Importance is carried by
 * the layout, not by inflated vocabulary.
 *
 * Adding a supporter means adding a record below and dropping its official
 * logo under /static/media/partners. Nothing on the Partners page or the
 * homepage needs to be touched: both read this array.
 */
export type Supporter = {
	id: string;
	/** Localized only where the organization's own name differs by language. */
	name: LocalizedText;
	/** Official site, used for the outbound link. Omit rather than guess. */
	url?: string;
	/** What the support actually is, in the organization's own terms. */
	relationship: LocalizedText;
	/** One or two sentences of context. No amounts, no durations, no claims. */
	description?: LocalizedText;
	/**
	 * Official brand asset under /static. Must come from the organization
	 * itself — never redrawn, recoloured, cropped or re-proportioned.
	 */
	logo?: string;
	/**
	 * Alt text for the logo. Left unset when the organization's name is printed
	 * next to the mark, which is the case on both surfaces that render these:
	 * the logo is then redundant and takes `alt=""`. Set it for a supporter
	 * whose mark is the only identification it gets.
	 */
	logoAlt?: LocalizedText;
	/**
	 * The field the official artwork is drawn for. A reversed (white) mark needs
	 * a dark stage; a full-colour mark with dark type needs a light one. This
	 * decides the stage, never the logo: no supporter's artwork is recoloured to
	 * fit our background.
	 */
	logoField?: 'light' | 'dark';
	/**
	 * Intrinsic width ÷ height of the logo file.
	 *
	 * Used for optical sizing: two marks set to the same height do not read as
	 * the same size when one is a long wordmark and the other is nearly square,
	 * so the stage sizes them to equal *area* instead. Defaults to a neutral
	 * ratio, which leaves a logo at the base size.
	 */
	logoAspect?: number;
	/** Season the support covers, when it is tied to one. */
	season?: string;
	/** Internal provenance. Never rendered. */
	note?: string;
};

/**
 * Confirmed supporters only. A name appears here once the relationship exists
 * and the organization is happy to be named — never while a conversation is
 * still in progress.
 */
export const supporters: Supporter[] = [
	{
		id: 'boeing',
		name: 'Boeing',
		url: 'https://www.boeing.com',
		relationship: {
			en: 'FIRST Team Grant Support',
			tr: 'FIRST Takım Hibesi Desteği'
		},
		description: {
			en: 'Supporting Ro6one’s 2026–27 FIRST Robotics Competition season through the Boeing Team Grant program.',
			tr: 'Boeing Team Grant programı aracılığıyla Ro6one’un 2026–27 FIRST Robotics Competition sezonuna destek sağlıyor.'
		},
		logo: '/media/partners/boeing.svg',
		/* The reversed mark Boeing publishes for dark surfaces — it is the one
		   boeing.com itself runs in its header. */
		logoField: 'dark',
		/* 141.94 × 32.52 in the file. */
		logoAspect: 141.94 / 32.52,
		season: '2026–27',
		note: 'Logo: boeing.com official asset, https://www.boeing.com/content/dam/boeing/boeing-logo-white.svg (the white/reversed variant used in the boeing.com header). Downloaded unmodified. The team holds written permission to use Boeing branding in connection with this support relationship. No grant amount is published anywhere on this site.'
	},
	{
		id: 'fikret-yuksel-foundation',
		name: {
			en: 'Fikret Yüksel Foundation',
			tr: 'Fikret Yüksel Vakfı'
		},
		url: 'https://www.fikretyukselfoundation.org',
		relationship: {
			en: 'Team Support',
			tr: 'Takım Desteği'
		},
		description: {
			en: 'Supporting Ro6one’s first official FRC season as part of its work helping FIRST teams in Türkiye grow and remain sustainable.',
			tr: 'Türkiye’deki FIRST takımlarının büyümesini ve sürdürülebilirliğini destekleyen çalışmaları kapsamında Ro6one’un ilk resmî FRC sezonuna destek sağlıyor.'
		},
		logo: '/media/partners/fikret-yuksel-foundation.png',
		/* The Foundation publishes one logo: full colour, with black type. It
		   needs a light stage, so it gets one — the artwork is untouched. */
		logoField: 'light',
		/* 1200 × 395 in the file. */
		logoAspect: 1200 / 395,
		season: '2026–27',
		note: 'Logo: the Foundation’s own site, https://www.fikretyukselfoundation.org/wp-content/uploads/2023/11/F-Y-Tam-Renk.png (2856×939 RGBA, the full-colour "Tam Renk" original behind the header logo). Resampled to 1200px wide and palette-optimized; colours, proportions and artwork unchanged. No white/reversed variant is published by the Foundation.'
	}
];

/**
 * TODO(team): set to a path under /static (e.g. '/documents/ro6one-2027.pdf')
 * once the partnership document is finished; the page links it automatically.
 */
export const partnershipDocument = '';
