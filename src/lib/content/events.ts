import type { MediaSlotId } from './media';

/**
 * The projects RO6ONE has run so far, oldest first.
 *
 * Structural facts live here; narrative copy lives in the dictionaries under
 * `events.<slug>`. Every field below is either supplied by the team or verified
 * against a public source listed in `coverage` / docs/content-sources.md.
 *
 * Nothing here may be extended with attendance figures, scores, rankings or
 * audience metrics unless the team supplies them.
 */
export type EventFact = {
	/** i18n key under `events.facts`. */
	key: string;
	/** Rendered as-is (numbers, dates, proper nouns) or resolved from i18n when `localized`. */
	value: string;
	localized?: boolean;
};

export type TeamEvent = {
	slug: 'steamfest' | 'offseason' | 'carsibasi';
	/**
	 * The official name where the team published one. Where it did not, a plain
	 * description of what the event was — never an invented title.
	 */
	name: string;
	/**
	 * ISO date or range start — used for <time datetime>, so `YYYY-MM` is a
	 * legitimate value when only the month is known. Do not sharpen a month into
	 * a day to make the markup look tidier.
	 */
	date: string;
	dateEnd?: string;
	venue?: string;
	city: string;
	facts: EventFact[];
	media: MediaSlotId[];
	/** Public reporting used to verify the facts above. */
	coverage: Array<{ outlet: string; href: string; kind: 'official' | 'press' }>;
};

export const events: TeamEvent[] = [
	{
		slug: 'steamfest',
		name: 'Spor STEAM Fest’26',
		date: '2026-04-28',
		city: 'Trabzon',
		facts: [
			{ key: 'date', value: '28.04.2026' },
			{ key: 'schools', value: '4' },
			{ key: 'role', value: 'organiser', localized: true },
			{ key: 'support', value: 'Trabzonspor' }
		],
		media: ['home.steamfest.court', 'home.steamfest.lab', 'impact.steamfest.wide'],
		coverage: [
			{
				outlet: 'Trabzon Merkez Fen Lisesi',
				href: 'https://trabzonfenlisesi.meb.k12.tr/icerikler/trabzonsporsponsorlugundasporsteamfest26festivalinigerceklestirdik_17428917.html',
				kind: 'official'
			}
		]
	},
	{
		slug: 'offseason',
		name: 'Trabzon Off-Season',
		date: '2026-07-10',
		dateEnd: '2026-07-12',
		venue: 'Hayri Gür Spor Salonu',
		city: 'Trabzon',
		facts: [
			{ key: 'date', value: '10–12.07.2026' },
			{ key: 'teams', value: '21' },
			{ key: 'role', value: 'organiser', localized: true },
			{ key: 'venue', value: 'Hayri Gür Spor Salonu' }
		],
		media: ['home.offseason.wide', 'home.offseason.detail', 'home.offseason.people'],
		coverage: [
			{
				outlet: 'Habertürk',
				href: 'https://www.haberturk.com/gundem/karadeniz-in-ilk-robot-turnuvasi-trabzon-da-duzenlenecek-3897053',
				kind: 'press'
			}
		]
	},
	{
		slug: 'carsibasi',
		/* The team published no name for this one, so this is a description. */
		name: 'Çarşıbaşı robotik eğitimi ve turnuvası',
		/*
		 * Month only, on purpose. The announcement is dated 14.10.2026 and says
		 * the event filled "the two days we have just left behind"; which two
		 * days that was is not stated anywhere, and guessing them would be
		 * inventing a fact. Ask the team if the exact dates are wanted.
		 */
		date: '2026-10',
		venue: 'Çarşıbaşı Ortaokulu',
		city: 'Trabzon',
		facts: [
			{ key: 'date', value: '10 · 2026' },
			{ key: 'schools', value: '2' },
			{ key: 'students', value: '~140' },
			{ key: 'role', value: 'organiser', localized: true }
		],
		media: ['impact.carsibasi.group'],
		coverage: [
			{
				outlet: 'RO6ONE · Instagram',
				href: 'https://www.instagram.com/p/Deesc8liMwY/',
				kind: 'official'
			}
		]
	}
];

/** Cities that sent teams to Trabzon Off-Season — verified by public reporting. */
export const offSeasonOrigins = ['İstanbul', 'Ankara', 'Bursa', 'Kocaeli', 'Trabzon'];

/** The two schools whose students took part at Çarşıbaşı — named in the team's post. */
export const carsibasiSchools = [
	'Çarşıbaşı Ortaokulu',
	'Çarşıbaşı İsmail Çavuş İmam Hatip Ortaokulu'
];

/** Teams RO6ONE ran the Çarşıbaşı days with — named in the team's post. */
export const carsibasiPartners = ['RoboLynx', 'Hypium', 'T2A'];

/** Schools that took part in Spor STEAM Fest’26 — verified by the school's own page. */
export const steamFestSchools = [
	'Trabzon Merkez Fen Lisesi',
	'Kanuni Anadolu Lisesi',
	'Trabzon Sosyal Bilimler Lisesi',
	'Trabzon Tevfik Serdar Anadolu Lisesi'
];

export function getEvent(slug: TeamEvent['slug']): TeamEvent {
	const event = events.find((item) => item.slug === slug);

	if (!event) throw new Error(`Unknown event: ${slug}`);

	return event;
}
