import mediaManifest from './generated/member-media.json';

/**
 * The team.
 *
 * Roles are the labels the team supplied — they describe primary ownership, not
 * a silo, and are never inferred from a photograph.
 *
 * Deliberately *not* stored:
 *  - birth years. The site never shows an age, so shipping 51 birth years to
 *    every visitor would be data we do not need. Only month and day are kept,
 *    which is all the birthday feature requires.
 *  - gender. Nothing in the design depends on it (placeholders are built from
 *    initials), so it is not part of the public payload.
 */
export type RoleId = 'organisation' | 'robotics' | 'pr' | 'finance' | 'mentor';

export type Member = {
	/** ASCII key: also the photo filename and the media manifest key. */
	key: string;
	name: string;
	role: RoleId;
	/** Month/day only. Absent when the team has not supplied a date. */
	birthday?: { month: number; day: number };
};

/** Display order of the role groups. Mentors last: alongside, not above. */
export const roleOrder: RoleId[] = ['robotics', 'pr', 'organisation', 'finance', 'mentor'];

export const roster: Member[] = [
	{
		key: 'yigitpursali',
		name: 'Yiğit Pursalı',
		role: 'organisation',
		birthday: { month: 3, day: 28 }
	},
	{
		key: 'zuleyhaaydin',
		name: 'Züleyha Aydın',
		role: 'organisation',
		birthday: { month: 3, day: 21 }
	},
	{
		key: 'doganefeasci',
		name: 'Doğan Efe Aşçı',
		role: 'organisation',
		birthday: { month: 5, day: 10 }
	},
	{
		key: 'taharemziaydin',
		name: 'Taha Remzi Aydın',
		role: 'organisation',
		birthday: { month: 12, day: 19 }
	},
	{
		key: 'ilgazguven',
		name: 'Ilgaz Güven',
		role: 'organisation',
		birthday: { month: 12, day: 25 }
	},
	{
		key: 'yagmurhavvayenibaki',
		name: 'Yağmur Havva Yenibaki',
		role: 'organisation',
		birthday: { month: 5, day: 17 }
	},

	{
		key: 'alaaddinbilgintopal',
		name: 'Alaaddin Bilgin Topal',
		role: 'robotics',
		birthday: { month: 1, day: 21 }
	},
	{
		key: 'betultellioglu',
		name: 'Betül Tellioğlu',
		role: 'robotics',
		birthday: { month: 5, day: 24 }
	},
	{
		key: 'elaecrenakyuz',
		name: 'Ela Ecren Akyüz',
		role: 'robotics',
		birthday: { month: 9, day: 9 }
	},
	{ key: 'fatihkoroglu', name: 'Fatih Köroğlu', role: 'robotics', birthday: { month: 4, day: 13 } },
	{
		key: 'kaanyavuzcelik',
		name: 'Kaan Yavuz Çelik',
		role: 'robotics',
		birthday: { month: 9, day: 14 }
	},
	{ key: 'kemalozturk', name: 'Kemal Öztürk', role: 'robotics' },
	{ key: 'keremkongur', name: 'Kerem Kongur', role: 'robotics' },
	{ key: 'koraybaki', name: 'Koray Baki', role: 'robotics', birthday: { month: 4, day: 27 } },
	{
		key: 'murathanmollamehmetoglu',
		name: 'Murathan Mollamehmetoğlu',
		role: 'robotics',
		birthday: { month: 3, day: 22 }
	},
	{ key: 'mustafaerenkarpuz', name: 'Mustafa Eren Karpuz', role: 'robotics' },
	{
		key: 'omerfarukozkul',
		name: 'Ömer Faruk Özkul',
		role: 'robotics',
		birthday: { month: 6, day: 8 }
	},
	{ key: 'omeruzun', name: 'Ömer Uzun', role: 'robotics', birthday: { month: 6, day: 9 } },
	{
		key: 'yigityagizyazici',
		name: 'Yiğit Yağız Yazıcı',
		role: 'robotics',
		birthday: { month: 9, day: 16 }
	},
	{ key: 'zeynepgoksal', name: 'Zeynep Göksal', role: 'robotics', birthday: { month: 3, day: 9 } },
	{
		key: 'yagizefekalayci',
		name: 'Yağız Efe Kalaycı',
		role: 'robotics',
		birthday: { month: 1, day: 7 }
	},

	{ key: 'azraezgiturhan', name: 'Azra Ezgi Turhan', role: 'pr' },
	{ key: 'batuhanverep', name: 'Batuhan Verep', role: 'pr' },
	{ key: 'denizalisahin', name: 'Deniz Ali Şahin', role: 'pr' },
	{ key: 'eliferoglu', name: 'Elif Eroğlu', role: 'pr', birthday: { month: 2, day: 24 } },
	{
		key: 'elifranakundakci',
		name: 'Elif Rana Kundakçı',
		role: 'pr',
		birthday: { month: 12, day: 13 }
	},
	{
		key: 'elifsenemozturk',
		name: 'Elif Senem Öztürk',
		role: 'pr',
		birthday: { month: 6, day: 27 }
	},
	{ key: 'gizemalbayrak', name: 'Gizem Albayrak', role: 'pr', birthday: { month: 5, day: 16 } },
	{ key: 'hamzanuriasan', name: 'Hamza Nuri Asan', role: 'pr', birthday: { month: 12, day: 27 } },
	{ key: 'hayatkarahan', name: 'Hayat Karahan', role: 'pr' },
	{ key: 'ipekbilgin', name: 'İpek Bilgin', role: 'pr', birthday: { month: 8, day: 2 } },
	{ key: 'ipekturgut', name: 'İpek Turgut', role: 'pr', birthday: { month: 10, day: 9 } },
	{ key: 'kaantanyel', name: 'Kaan Tanyel', role: 'pr', birthday: { month: 7, day: 25 } },
	{ key: 'mehmetmesci', name: 'Mehmet Mesci', role: 'pr' },
	{ key: 'nehirgulay', name: 'Nehir Gülay', role: 'pr', birthday: { month: 6, day: 22 } },
	{ key: 'nesibezenginler', name: 'Nesibe Zenginler', role: 'pr', birthday: { month: 1, day: 7 } },
	{ key: 'oykuyilmaz', name: 'Öykü Yılmaz', role: 'pr', birthday: { month: 8, day: 6 } },
	{ key: 'iremozemtaskin', name: 'İrem Özem Taşkın', role: 'pr', birthday: { month: 1, day: 1 } },
	{
		key: 'ayseozgeozdener',
		name: 'Ayşe Özge Özdener',
		role: 'pr',
		birthday: { month: 10, day: 27 }
	},
	{ key: 'sidelyacam', name: 'Sidelya Çam', role: 'pr', birthday: { month: 5, day: 9 } },
	{ key: 'zeynepkarabacak', name: 'Zeynep Karabacak', role: 'pr' },
	{
		key: 'zeynepkosterelioglu',
		name: 'Zeynep Kösterelioğlu',
		role: 'pr',
		birthday: { month: 12, day: 1 }
	},
	{ key: 'zeynepmorkan', name: 'Zeynep Morkan', role: 'pr', birthday: { month: 3, day: 10 } },
	{ key: 'muhammetsalihartun', name: 'Muhammet Salih Artun', role: 'pr' },

	{
		key: 'burakyilmazlar',
		name: 'Burak Yılmazlar',
		role: 'finance',
		birthday: { month: 2, day: 20 }
	},
	{
		key: 'tugbaezgikara',
		name: 'Tuğba Ezgi Kara',
		role: 'finance',
		birthday: { month: 4, day: 24 }
	},
	{
		key: 'furkanhacimahmutoglu',
		name: 'Furkan Hacımahmutoğlu',
		role: 'finance',
		birthday: { month: 1, day: 4 }
	},
	{
		key: 'oktaymetearas',
		name: 'Oktay Mete Aras',
		role: 'finance',
		birthday: { month: 3, day: 15 }
	},
	{
		key: 'zeynepberreisaoglu',
		name: 'Zeynep Berre İsaoğlu',
		role: 'finance',
		birthday: { month: 1, day: 25 }
	},

	/* Birth year intentionally unknown; the day is what the feature needs. */
	{
		key: 'semramusrabektas',
		name: 'Semra Müşra Bektaş',
		role: 'mentor',
		birthday: { month: 2, day: 12 }
	},
	{ key: 'ceyhuntemel', name: 'Ceyhun Temel', role: 'mentor' }
];

/* ------------------------------------------------------------------ media -- */

type ManifestEntry = {
	/** [slot in the filename, real pixel width]. Widened by the JSON import. */
	srcset: number[][];
	placeholder: boolean;
	lowResolution: boolean;
	source: string;
};

const media = mediaManifest as Record<string, ManifestEntry>;

export type Portrait = {
	src: string;
	srcset: string;
	/** True when the tile is a generated stand-in rather than a photograph. */
	placeholder: boolean;
	lowResolution: boolean;
};

/**
 * Resolves a member's portrait from the generated manifest.
 *
 * Nothing here knows whether a photograph exists: that is decided by
 * scripts/process_media.py from the contents of images/members/ at build time.
 * Dropping a real photo in at images/members/<key>.jpg and re-running the
 * script is the entire process for replacing a placeholder.
 */
export function portraitFor(key: string): Portrait | null {
	const entry = media[key];

	if (!entry) return null;

	const base = `/media/members/${key}`;

	return {
		src: `${base}-${entry.srcset.at(-1)?.[0] ?? 640}.webp`,
		srcset: entry.srcset.map((pair) => `${base}-${pair[0]}.webp ${pair[1]}w`).join(', '),
		placeholder: entry.placeholder,
		lowResolution: entry.lowResolution
	};
}

export const rosterSize = roster.length;

export const portraitCount = roster.filter(
	(member) => !portraitFor(member.key)?.placeholder
).length;

export function membersByRole(role: RoleId): Member[] {
	return roster.filter((member) => member.role === role);
}

/* -------------------------------------------------------------- birthdays -- */

export type CalendarDay = { month: number; day: number };

/**
 * Today in Türkiye, regardless of where the server or the visitor is.
 *
 * Resolved once per request on the server and handed to the client (see
 * routes/+page.server.ts) so that server and browser can never disagree about
 * the date — the bug that would otherwise appear for a few hours every night.
 */
export function istanbulDay(now: Date = new Date()): CalendarDay {
	const parts = new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Europe/Istanbul',
		month: 'numeric',
		day: 'numeric'
	}).formatToParts(now);

	const value = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);

	return { month: value('month'), day: value('day') };
}

/** Everyone whose birthday is today. Order follows the roster, never "first match". */
export function birthdaysOn(day: CalendarDay): Member[] {
	return roster.filter(
		(member) => member.birthday?.month === day.month && member.birthday?.day === day.day
	);
}

/**
 * A stable index for a given date: the same day always selects the same entry,
 * on the server and in the browser, so nothing flickers at hydration.
 */
export function dailyIndex(day: CalendarDay, length: number): number {
	if (length <= 0) return 0;

	return (day.month * 31 + day.day) % length;
}
