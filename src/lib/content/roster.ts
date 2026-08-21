import mediaManifest from './generated/member-media.json';
import type { LocalizedText } from './localized';

/**
 * The team: 49 students and 2 mentors.
 *
 * Roles are the labels the team supplied — they describe primary ownership, not
 * a silo, and are never inferred from a photograph.
 *
 * WHAT TO EDIT HERE, AND ONLY HERE
 * The member detail card is driven entirely by this file. To fill a member out,
 * add the fields to their entry; no component changes are needed:
 *
 *   grade      10 | 11 | 12. Students only.
 *   mentorNote what a mentor actually is, in their own words. Mentors only.
 *   intro      one or two sentences the member wrote about themselves. A plain
 *              string is shown in both languages; { tr, en } supplies both.
 *   tags       zero, one or many ids from `memberTags` below.
 *
 * Deliberately *not* stored:
 *  - birth years. The site never shows an age, so shipping 51 birth years to
 *    every visitor would be data we do not need. Only month and day are kept,
 *    which is all the birthday feature requires.
 *  - gender. Nothing in the design depends on it (placeholders are built from
 *    initials), so it is not part of the public payload.
 */
export type RoleId = 'organisation' | 'robotics' | 'pr' | 'finance' | 'mentor';

/** School year. Mentors do not have one and must not be forced into one. */
export type Grade = 10 | 11 | 12;

/**
 * Member tags.
 *
 * Three categories, deliberately kept apart so the UI can style them
 * differently and so a joke never renders as a credential:
 *
 *   skill    what someone actually does on the team
 *   fun      the team's own affectionate labels
 *   special  one-person titles
 *
 * Labels are NOT stored here — they live in the dictionaries under
 * `team.tags.*`, in both languages, like every other visible string. Adding a
 * tag means adding an id here and a label to both dictionaries.
 */
export type TagCategory = 'skill' | 'fun' | 'special';

export type TagId =
	| 'software'
	| 'mechanical'
	| 'electronics'
	| 'cad'
	| 'graphics'
	| 'editor'
	| 'camera'
	| 'videoEditor'
	| 'accounting'
	| 'communications'
	| 'sponsorship'
	| 'genco'
	| 'oldWolf'
	| 'tense'
	| 'excitable'
	| 'restless'
	| 'nightShift'
	| 'host'
	| 'everythingGuy';

export const memberTags: Record<TagId, TagCategory> = {
	software: 'skill',
	mechanical: 'skill',
	electronics: 'skill',
	cad: 'skill',
	graphics: 'skill',
	editor: 'skill',
	camera: 'skill',
	videoEditor: 'skill',
	accounting: 'skill',
	/* "İletişim" rather than "PR Ekibi": the PR *group* already exists as a
	   role, so a tag repeating it would read as a duplicate rather than a skill. */
	communications: 'skill',
	sponsorship: 'skill',

	/* The team's own words. Keep these warm — the label is one line to change
	   in the dictionaries if a better one turns up. */
	genco: 'fun',
	oldWolf: 'fun',
	tense: 'fun',
	excitable: 'fun',
	restless: 'fun',
	nightShift: 'fun',

	host: 'special',
	everythingGuy: 'special'
};

export type Member = {
	/** ASCII key: also the photo filename and the media manifest key. */
	key: string;
	name: string;
	role: RoleId;
	/** Month/day only. Absent when the team has not supplied a date. */
	birthday?: { month: number; day: number };
	/** Students only; mentors leave this unset. */
	grade?: Grade;
	/** Mentors only: what they are outside the team. */
	mentorNote?: LocalizedText;
	/** The member's own one or two sentences. Empty until they write it. */
	intro?: LocalizedText;
	/** Zero, one or many. Order is preserved as written. */
	tags?: TagId[];
};

/** Display order of the role groups. Mentors last: alongside, not above. */
export const roleOrder: RoleId[] = ['robotics', 'pr', 'organisation', 'finance', 'mentor'];

export const roster: Member[] = [
	{
		key: 'alaaddinbilgintopal',
		name: 'Alaaddin Bilgin Topal',
		role: 'robotics',
		birthday: { month: 1, day: 21 },
		grade: 12,
		tags: []
	},
	{
		key: 'betultellioglu',
		name: 'Betül Tellioğlu',
		role: 'robotics',
		birthday: { month: 5, day: 24 },
		grade: 12,
		tags: []
	},
	{
		key: 'elaecrenakyuz',
		name: 'Ela Ecren Akyüz',
		role: 'robotics',
		birthday: { month: 9, day: 9 },
		grade: 12,
		tags: []
	},
	{
		key: 'fatihkoroglu',
		name: 'Fatih Köroğlu',
		role: 'robotics',
		birthday: { month: 4, day: 13 },
		grade: 10,
		tags: []
	},
	{
		key: 'kaanyavuzcelik',
		name: 'Kaan Yavuz Çelik',
		role: 'robotics',
		birthday: { month: 9, day: 14 },
		grade: 11,
		tags: []
	},
	{
		key: 'kemalozturk',
		name: 'Kemal Öztürk',
		role: 'robotics',
		grade: 10,
		tags: []
	},
	{
		key: 'keremkongur',
		name: 'Kerem Kongur',
		role: 'robotics',
		grade: 11,
		tags: []
	},
	{
		key: 'koraybaki',
		name: 'Koray Baki',
		role: 'robotics',
		birthday: { month: 4, day: 27 },
		grade: 11,
		tags: []
	},
	{
		key: 'murathanmollamehmetoglu',
		name: 'Murathan Mollamehmetoğlu',
		role: 'robotics',
		birthday: { month: 3, day: 22 },
		grade: 10,
		tags: []
	},
	{
		key: 'mustafaerenkarpuz',
		name: 'Mustafa Eren Karpuz',
		role: 'robotics',
		grade: 11,
		tags: []
	},
	{
		key: 'yigityagizyazici',
		name: 'Yiğit Yağız Yazıcı',
		role: 'robotics',
		birthday: { month: 9, day: 16 },
		grade: 10,
		tags: []
	},
	{
		key: 'zeynepgoksal',
		name: 'Zeynep Göksal',
		role: 'robotics',
		birthday: { month: 3, day: 9 },
		grade: 10,
		tags: []
	},
	{
		key: 'omerfarukozkul',
		name: 'Ömer Faruk Özkul',
		role: 'robotics',
		birthday: { month: 6, day: 8 },
		grade: 12,
		tags: []
	},
	{
		key: 'omeruzun',
		name: 'Ömer Uzun',
		role: 'robotics',
		birthday: { month: 6, day: 9 },
		grade: 11,
		tags: []
	},
	{
		key: 'ayseozgeozdener',
		name: 'Ayşe Özge Özdener',
		role: 'pr',
		birthday: { month: 10, day: 27 },
		grade: 10,
		tags: []
	},
	{
		key: 'azraezgiturhan',
		name: 'Azra Ezgi Turhan',
		role: 'pr',
		grade: 12,
		tags: []
	},
	{
		key: 'batuhanverep',
		name: 'Batuhan Verep',
		role: 'pr',
		grade: 10,
		tags: []
	},
	{
		key: 'denizalisahin',
		name: 'Deniz Ali Şahin',
		role: 'pr',
		grade: 12,
		tags: []
	},
	{
		key: 'eliferoglu',
		name: 'Elif Eroğlu',
		role: 'pr',
		birthday: { month: 2, day: 24 },
		grade: 11,
		tags: []
	},
	{
		key: 'elifranakundakci',
		name: 'Elif Rana Kundakçı',
		role: 'pr',
		birthday: { month: 12, day: 13 },
		grade: 10,
		tags: []
	},
	{
		key: 'elifsenemozturk',
		name: 'Elif Senem Öztürk',
		role: 'pr',
		birthday: { month: 6, day: 27 },
		grade: 10,
		tags: []
	},
	{
		key: 'gizemalbayrak',
		name: 'Gizem Albayrak',
		role: 'pr',
		birthday: { month: 5, day: 16 },
		grade: 11,
		tags: []
	},
	{
		key: 'hamzanuriasan',
		name: 'Hamza Nuri Asan',
		role: 'pr',
		birthday: { month: 12, day: 27 },
		grade: 10,
		tags: []
	},
	{
		key: 'hayatkarahan',
		name: 'Hayat Karahan',
		role: 'pr',
		grade: 11,
		tags: []
	},
	{
		key: 'kaantanyel',
		name: 'Kaan Tanyel',
		role: 'pr',
		birthday: { month: 7, day: 25 },
		grade: 12,
		tags: []
	},
	{
		key: 'mehmetmesci',
		name: 'Mehmet Mesci',
		role: 'pr',
		grade: 10,
		tags: []
	},
	{
		key: 'muhammetsalihartun',
		name: 'Muhammet Salih Artun',
		role: 'pr',
		grade: 11,
		tags: []
	},
	{
		key: 'nehirgulay',
		name: 'Nehir Gülay',
		role: 'pr',
		birthday: { month: 6, day: 22 },
		grade: 11,
		tags: []
	},
	{
		key: 'nesibezenginler',
		name: 'Nesibe Zenginler',
		role: 'pr',
		birthday: { month: 1, day: 7 },
		grade: 12,
		tags: []
	},
	{
		key: 'sidelyacam',
		name: 'Sidelya Çam',
		role: 'pr',
		birthday: { month: 5, day: 9 },
		grade: 11,
		tags: []
	},
	{
		key: 'zeynepkarabacak',
		name: 'Zeynep Karabacak',
		role: 'pr',
		grade: 10,
		tags: []
	},
	{
		key: 'zeynepkosterelioglu',
		name: 'Zeynep Kösterelioğlu',
		role: 'pr',
		birthday: { month: 12, day: 1 },
		grade: 10,
		tags: []
	},
	{
		key: 'zeynepmorkan',
		name: 'Zeynep Morkan',
		role: 'pr',
		birthday: { month: 3, day: 10 },
		grade: 10,
		tags: []
	},
	{
		key: 'oykuyilmaz',
		name: 'Öykü Yılmaz',
		role: 'pr',
		birthday: { month: 8, day: 6 },
		grade: 11,
		tags: []
	},
	{
		key: 'ipekbilgin',
		name: 'İpek Bilgin',
		role: 'pr',
		birthday: { month: 8, day: 2 },
		grade: 10,
		tags: []
	},
	{
		key: 'ipekturgut',
		name: 'İpek Turgut',
		role: 'pr',
		birthday: { month: 10, day: 9 },
		grade: 10,
		tags: []
	},
	{
		key: 'iremozemtaskin',
		name: 'İrem Özem Taşkın',
		role: 'pr',
		birthday: { month: 1, day: 1 },
		grade: 10,
		tags: []
	},
	{
		key: 'doganefeasci',
		name: 'Doğan Efe Aşçı',
		role: 'organisation',
		birthday: { month: 5, day: 10 },
		grade: 11,
		tags: []
	},
	{
		key: 'furkanhacimahmutoglu',
		name: 'Furkan Hacımahmutoğlu',
		role: 'organisation',
		birthday: { month: 1, day: 4 },
		grade: 11,
		tags: []
	},
	{
		key: 'ilgazguven',
		name: 'Ilgaz Güven',
		role: 'organisation',
		birthday: { month: 12, day: 25 },
		grade: 11,
		tags: []
	},
	{
		key: 'taharemziaydin',
		name: 'Taha Remzi Aydın',
		role: 'organisation',
		birthday: { month: 12, day: 19 },
		grade: 12,
		tags: []
	},
	{
		key: 'yagmurhavvayenibaki',
		name: 'Yağmur Havva Yenibaki',
		role: 'organisation',
		birthday: { month: 5, day: 17 },
		grade: 11,
		tags: []
	},
	{
		key: 'yagizefekalayci',
		name: 'Yağız Efe Kalaycı',
		role: 'organisation',
		birthday: { month: 1, day: 7 },
		grade: 12,
		tags: []
	},
	{
		key: 'yigitpursali',
		name: 'Yiğit Pursalı',
		role: 'organisation',
		birthday: { month: 3, day: 28 },
		grade: 12,
		tags: []
	},
	{
		key: 'zuleyhaaydin',
		name: 'Züleyha Aydın',
		role: 'organisation',
		birthday: { month: 3, day: 21 },
		grade: 11,
		tags: []
	},
	{
		key: 'burakyilmazlar',
		name: 'Burak Yılmazlar',
		role: 'finance',
		birthday: { month: 2, day: 20 },
		grade: 12,
		tags: []
	},
	{
		key: 'oktaymetearas',
		name: 'Oktay Mete Aras',
		role: 'finance',
		birthday: { month: 3, day: 15 },
		grade: 12,
		tags: []
	},
	{
		key: 'tugbaezgikara',
		name: 'Tuğba Ezgi Kara',
		role: 'finance',
		birthday: { month: 4, day: 24 },
		grade: 12,
		tags: []
	},
	{
		key: 'zeynepberreisaoglu',
		name: 'Zeynep Berre İsaoğlu',
		role: 'finance',
		birthday: { month: 1, day: 25 },
		grade: 11,
		tags: []
	},
	{
		key: 'ceyhuntemel',
		name: 'Ceyhun Temel',
		role: 'mentor',
		mentorNote: 'Kocaeli Üniversitesi 2. sınıf öğrencisi',
		tags: []
	},
	{
		key: 'semramusrabektas',
		name: 'Semra Müşra Bektaş',
		role: 'mentor',
		birthday: { month: 2, day: 12 },
		mentorNote: 'Bilişim Teknolojileri Öğretmeni',
		tags: []
	}
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

/** 49. Mentors are counted separately — they are not students. */
export const studentCount = roster.filter((member) => member.role !== 'mentor').length;

/** 2. */
export const mentorCount = roster.filter((member) => member.role === 'mentor').length;

/** Tags of one category, in the order the member listed them. */
export function tagsOfCategory(member: Member, category: TagCategory): TagId[] {
	return (member.tags ?? []).filter((tag) => memberTags[tag] === category);
}

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
