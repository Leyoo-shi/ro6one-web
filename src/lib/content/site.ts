/**
 * Team identity and site-wide constants.
 *
 * Everything in this file is either confirmed by the repository or explicitly
 * marked as pending. Do not add claims (awards, placements, counts, sponsors)
 * here unless the team has confirmed them.
 */
export const site = {
	/** Wordmark used in the header and footer. */
	name: 'RO6ONE',
	fullName: 'RO6ONE Robotics',

	teamNumber: '11919',
	teamLabel: 'FRC #11919',

	location: 'Trabzon, Türkiye',

	/** Used for canonical URLs and Open Graph; override with PUBLIC_SITE_URL. */
	url: 'https://ro6one.com',
	domain: 'ro6one.com',

	/**
	 * Season shown in the hero meta strip.
	 * TODO(team): confirm the label for the current competition season.
	 */
	season: {
		label: '2026'
	},

	/**
	 * TODO(team): publish a real contact address here.
	 * While this is empty the contact page shows an honest "not published yet"
	 * state instead of a mailto link that goes nowhere.
	 */
	contact: {
		email: ''
	},

	/**
	 * TODO(team): add official accounts only — no placeholder or guessed URLs.
	 * Example: { label: 'Instagram', href: 'https://instagram.com/...' }
	 */
	social: [] as Array<{ label: string; href: string }>,

	/**
	 * TODO(design): add a 1200×630 social preview image to /static and set the
	 * path here (e.g. '/og/ro6one-og.png') to enable og:image / twitter:image.
	 */
	ogImage: '' as string
};

export type Site = typeof site;
