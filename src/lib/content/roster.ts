import mediaManifest from './generated/member-media.json';
import type { LocalizedText } from './localized';

/**
 * The team: 70 students and 3 mentors.
 *
 * Roles are the labels the team supplied — they describe primary ownership, not
 * a silo, and are never inferred from a photograph.
 *
 * WHAT TO EDIT HERE, AND ONLY HERE
 * The member detail card is driven entirely by this file. To fill a member out,
 * add the fields to their entry; no component changes are needed:
 *
 *   grade      9 | 10 | 11 | 12. Students only.
 *   mentorNote what a mentor actually is, in their own words. Mentors only.
 *   intro      one or two sentences the member wrote about themselves. A plain
 *              string is shown in both languages; { tr, en } supplies both.
 *   tags       zero, one or many ids from `memberTags` below.
 *
 * Deliberately *not* stored:
 *  - birth years. The site never shows an age, so shipping 73 birth years to
 *    every visitor would be data we do not need. Only month and day are kept,
 *    which is all the birthday feature requires. A member whose date the team
 *    has not supplied simply has no `birthday`, and the card drops the row.
 *  - gender. Nothing in the design depends on it (placeholders are built from
 *    initials), so it is not part of the public payload.
 */
export type RoleId = 'organisation' | 'robotics' | 'pr' | 'finance' | 'mentor';

/**
 * School year. Mentors do not have one and must not be forced into one.
 *
 * 9 arrived with the 2026 intake; the union is the set of years actually on the
 * roster, so widen it when a year genuinely joins rather than leaving real grade
 * data unset to fit the type.
 */
export type Grade = 9 | 10 | 11 | 12;

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
		key: 'asafgokturkyalcinkaya',
		name: 'Asaf Göktürk Yalçınkaya',
		role: 'robotics',
		birthday: { month: 11, day: 8 },
		grade: 9,
		tags: []
	},
	{
		key: 'asiyeecrinkoyun',
		name: 'Asiye Ecrin Koyun',
		role: 'robotics',
		birthday: { month: 2, day: 5 },
		grade: 10,
		tags: []
	},
	{
		key: 'batuhanalemdag',
		name: 'Batuhan Alemdağ',
		role: 'robotics',
		birthday: { month: 2, day: 19 },
		grade: 9,
		tags: []
	},
	{
		key: 'beratsisman',
		name: 'Berat Şişman',
		role: 'robotics',
		birthday: { month: 4, day: 17 },
		grade: 9,
		tags: []
	},
	{
		key: 'egemenkurt',
		name: 'Egemen Kurt',
		role: 'robotics',
		grade: 9,
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
		key: 'elifdilapeker',
		name: 'Elif Dila Peker',
		role: 'robotics',
		grade: 9,
		tags: []
	},
	{
		key: 'emirtunaburkas',
		name: 'Emir Tuna Burkaş',
		role: 'robotics',
		birthday: { month: 3, day: 1 },
		grade: 9,
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
		key: 'keremturk',
		name: 'Kerem Türk',
		role: 'robotics',
		birthday: { month: 11, day: 4 },
		grade: 9,
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
		key: 'metehanaydin',
		name: 'Metehan Aydın',
		role: 'robotics',
		grade: 9,
		tags: []
	},
	{
		key: 'muratkeskinoglu',
		name: 'Murat Keskinoğlu',
		role: 'robotics',
		grade: 9,
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
		key: 'mustafakilic',
		name: 'Mustafa Kılıç',
		role: 'robotics',
		grade: 9,
		tags: []
	},
	{
		key: 'nevraezgun',
		name: 'Nevra Ezgün',
		role: 'robotics',
		grade: 10,
		tags: []
	},
	{
		key: 'yigitefeturhal',
		name: 'Yiğit Efe Turhal',
		role: 'robotics',
		grade: 9,
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
		key: 'zeynepkaya',
		name: 'Zeynep Kaya',
		role: 'robotics',
		grade: 9,
		tags: []
	},
	{
		key: 'zumranurkarahan',
		name: 'Zümra Nur Karahan',
		role: 'robotics',
		birthday: { month: 3, day: 8 },
		grade: 10,
		tags: []
	},
	{
		key: 'cinaryusufakaydin',
		name: 'Çınar Yusuf Akaydın',
		role: 'robotics',
		birthday: { month: 9, day: 10 },
		grade: 9,
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
		key: 'aysenuryayla',
		name: 'Ayşenur Yayla',
		role: 'pr',
		birthday: { month: 12, day: 1 },
		grade: 9,
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
		key: 'dilayyildirim',
		name: 'Dilay Yıldırım',
		role: 'pr',
		birthday: { month: 6, day: 11 },
		grade: 9,
		tags: []
	},
	{
		key: 'elfinserredere',
		name: 'Elfin Serre Dere',
		role: 'pr',
		birthday: { month: 7, day: 2 },
		grade: 9,
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
		key: 'elvindilakeles',
		name: 'Elvin Dila Keleş',
		role: 'pr',
		birthday: { month: 3, day: 5 },
		grade: 9,
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
		key: 'gokhunerdogan',
		name: 'Gökhun Erdoğan',
		role: 'pr',
		birthday: { month: 12, day: 2 },
		grade: 9,
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
		key: 'nehirgulay',
		name: 'Nehir Gülay',
		role: 'pr',
		birthday: { month: 6, day: 22 },
		grade: 11,
		tags: []
	},
	{
		key: 'osmanerturk',
		name: 'Osman Ertürk',
		role: 'pr',
		grade: 9,
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
		key: 'yagizalparslankilic',
		name: 'Yağız Alparslan Kılıç',
		role: 'pr',
		birthday: { month: 7, day: 11 },
		grade: 9,
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
		key: 'cannurituran',
		name: 'Can Nuri Turan',
		role: 'finance',
		birthday: { month: 4, day: 2 },
		grade: 9,
		tags: []
	},
	{
		key: 'esattanriver',
		name: 'Esat Tanrıver',
		role: 'finance',
		birthday: { month: 7, day: 13 },
		grade: 9,
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
	},
	{
		key: 'simgeinan',
		name: 'Simge İnan',
		role: 'mentor',
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

/** 70. Mentors are counted separately — they are not students. */
export const studentCount = roster.filter((member) => member.role !== 'mentor').length;

/** 3. */
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
