/**
 * Team identity and site-wide constants.
 *
 * Everything here is either supplied by the team or verified against a public
 * source (see docs/content-sources.md). Do not add claims — awards, placements,
 * counts, sponsors, attendance — that neither of those two things covers.
 */
export const site = {
	/** Wordmark used in the header and footer. */
	name: 'RO6ONE',
	/** Engineering / editorial contexts. */
	fullName: 'RO6ONE Robotics',
	/** Formal institutional contexts only — not every heading. */
	legalName: 'Trabzonspor Ro6one Robotics',

	teamNumber: '11919',
	teamLabel: 'FRC #11919',

	location: 'Trabzon, Türkiye',
	/** Where the team was formed and still works. */
	school: 'Trabzon Merkez Fen Lisesi',

	/** February 2026. Rendered through the i18n month names. */
	founded: { year: 2026, month: 2 },

	/** Used for canonical URLs and Open Graph; override with PUBLIC_SITE_URL. */
	url: 'https://ro6one.com',
	domain: 'ro6one.com',

	/**
	 * Season shown in the hero meta strip.
	 * The team has not yet competed in an official FRC season; the upcoming one
	 * is the first. Do not turn this into a results claim.
	 */
	season: {
		label: '2027',
		status: 'first-official'
	},

	contact: {
		general: 'iletisim@ro6one.com',
		sponsorship: 'sponsorluk@ro6one.com'
	},

	/** Official accounts only. Never add a channel that is not confirmed. */
	social: [
		{
			id: 'instagram',
			label: 'Instagram',
			handle: '@ts_ro6one11919',
			href: 'https://instagram.com/ts_ro6one11919'
		},
		{
			id: 'youtube',
			label: 'YouTube',
			handle: '@trabzonsporro6onerobotik',
			href: 'https://youtube.com/@trabzonsporro6onerobotik'
		},
		{
			id: 'linkedin',
			label: 'LinkedIn',
			handle: 'Trabzonspor Ro6one Robotik',
			href: 'https://www.linkedin.com/company/trabzonspor-ro6one-robotik'
		}
	] as Array<{ id: string; label: string; handle: string; href: string }>,

	/**
	 * TODO(design): add a 1200×630 social preview built from real team
	 * photography once the archive arrives, then set the path here.
	 */
	ogImage: '' as string
};

export type Site = typeof site;
