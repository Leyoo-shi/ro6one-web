/**
 * Media slot registry.
 *
 * Compositions never hardcode an image path. They reference a *slot* — a place
 * in the design that is already shaped for a specific kind of photograph. Until
 * a slot has a `src`, `MediaFrame` renders a designed aperture instead of a
 * picture, and the page still reads as finished.
 *
 * Ingesting the real archive is therefore a data edit, not a redesign:
 *
 *   1. drop files into static/images/<category>/
 *   2. set `src` (plus `focal` and `alt`) on the matching slot below
 *
 * `need` is a note for whoever selects the photograph. It is never rendered.
 */
import eventManifest from './generated/event-media.json';
import type { LocalizedText } from './localized';

export type MediaCategory =
	'team' | 'steamfest' | 'offseason' | 'infrastructure' | 'robotics' | 'trabzonspor' | 'brand';

export type MediaSlot = {
	/** Stable id, referenced from components. */
	id: string;
	category: MediaCategory;
	/** CSS aspect-ratio for the frame; the design reserves this space either way. */
	aspect: string;
	/** Path under /static once the image exists. */
	src?: string;
	/** Required when `src` is set. Empty string marks a purely decorative image. */
	alt?: LocalizedText;
	caption?: LocalizedText;
	/** object-position as percentages, so a subject off-centre survives cropping. */
	focal?: { x: number; y: number };
	/** Loads eagerly and skips lazy decoding — reserve for above-the-fold slots. */
	priority?: boolean;
	/** Selection brief for the photo pass. Never rendered. */
	need: string;
};

const slots = [
	// ---------------------------------------------------------------- home ---
	{
		id: 'home.origin.workshop',
		category: 'team',
		aspect: '4 / 5',
		need: 'Vertical documentary shot of the team working at school — hands, tools, a table mid-build. Not a posed group photo.'
	},
	{
		id: 'home.steamfest.court',
		category: 'steamfest',
		aspect: '3 / 2',
		alt: {
			en: 'Two school football teams lined up on the pitch before kick-off, apartment blocks behind them.',
			tr: 'Maç öncesi sahada dizilmiş iki okul futbol takımı, arkalarında şehir.'
		},
		caption: {
			en: 'Two school teams line up before kick-off.',
			tr: 'İki okul takımı, maç başlamadan önce sahada.'
		},
		need: 'Sport half of Spor STEAM Fest: football or volleyball action, students in the hall.'
	},
	{
		id: 'home.steamfest.lab',
		category: 'steamfest',
		aspect: '3 / 2',
		alt: {
			en: 'Students in lab coats at the chemistry stand, coloured indicator solutions on the table.',
			tr: 'Kimya standında önlüklü öğrenciler; masada renkli indikatör çözeltileri.'
		},
		caption: {
			en: 'The chemistry stand, mid-demonstration.',
			tr: 'Kimya standı, gösterinin ortasında.'
		},
		need: 'STEM half: a stand mid-demonstration, visitors leaning in, an experiment or a line-following robot on the floor.'
	},
	{
		id: 'home.offseason.wide',
		category: 'offseason',
		aspect: '21 / 9',
		alt: {
			en: 'Hayri Gür Spor Salonu during the Off-Season: students lined along the barrier, a Trabzonspor tent and the stands behind them.',
			tr: 'Off-Season sırasında Hayri Gür Spor Salonu: bariyer boyunca dizilmiş öğrenciler, arkada Trabzonspor çadırı ve tribünler.'
		},
		caption: {
			en: 'Hayri Gür Spor Salonu, July 2026.',
			tr: 'Hayri Gür Spor Salonu, Temmuz 2026.'
		},
		need: 'Widest available frame of the field at Hayri Gür — full field, pits or stands visible. This is the largest image on the site.'
	},
	{
		id: 'home.offseason.field',
		category: 'offseason',
		aspect: '16 / 9',
		alt: {
			en: 'The competition field covered in yellow game pieces, with the scoring goal behind it.',
			tr: 'Sarı oyun toplarıyla kaplı yarışma sahası; arkada gol bölgesi.'
		},
		caption: {
			en: 'The field between matches.',
			tr: 'Maçlar arasında saha.'
		},
		need: 'The field itself, wide, with game pieces — the frame that reads as FRC at a glance.'
	},
	{
		id: 'home.offseason.detail',
		category: 'offseason',
		aspect: '1 / 1',
		alt: {
			en: 'A robot on the competition field surrounded by yellow game pieces.',
			tr: 'Yarışma sahasında, sarı toplarla çevrili bir robot.'
		},
		caption: {
			en: 'A robot working the field.',
			tr: 'Sahada çalışan bir robot.'
		},
		need: 'Tight detail: a robot on the field, a driver station, or hands on a controller during a match.'
	},
	{
		id: 'home.offseason.drivers',
		category: 'offseason',
		aspect: '3 / 2',
		alt: {
			en: 'Drivers at the station behind the field glass during a match.',
			tr: 'Maç sırasında saha camının arkasındaki sürücü istasyonunda takımlar.'
		},
		caption: {
			en: 'Drivers at the station, mid-match.',
			tr: 'Maçın ortasında sürücü istasyonu.'
		},
		need: 'Tight detail: a robot on the field, a driver station, or hands on a controller during a match.'
	},
	{
		id: 'home.offseason.people',
		category: 'offseason',
		aspect: '4 / 5',
		alt: {
			en: 'Students standing along the field barrier waiting for the next match.',
			tr: 'Sıradaki maçı bekleyen öğrenciler, saha bariyerinin önünde.'
		},
		caption: {
			en: 'Along the barrier, between matches.',
			tr: 'Maçlar arasında, bariyer boyunca.'
		},
		need: 'A human moment — volunteers, a queue of teams, the crowd, or the event mascot in context.'
	},
	{
		id: 'home.media.camera',
		category: 'team',
		aspect: '4 / 5',
		alt: {
			en: "A RO6ONE camera operator holding a camera inside the team's own oversized Instagram frame.",
			tr: 'Takımın kendi dev Instagram çerçevesinin içinde, elinde fotoğraf makinesi olan bir RO6ONE kamera operatörü.'
		},
		caption: {
			en: 'The media team, inside its own frame.',
			tr: 'Medya ekibi, kendi çerçevesinin içinde.'
		},
		need: 'A RO6ONE media-team member working. Identity must be provable from the frame itself, not guessed.'
	},
	{
		id: 'home.system.desk',
		category: 'steamfest',
		aspect: '3 / 2',
		alt: {
			en: 'Team members in lab coats running the chemistry stand at Spor STEAM Fest ’26, measuring solutions while visitors watch.',
			tr: 'Spor STEAM Fest ’26’da kimya standını yürüten önlüklü takım üyeleri; ziyaretçiler izlerken çözelti hazırlıyorlar.'
		},
		caption: {
			en: 'Running the chemistry stand at Spor STEAM Fest ’26.',
			tr: 'Spor STEAM Fest ’26’da kimya standının başında.'
		},
		need: 'The organization doing organizational work, photographed as people rather than as a diagram. Identity must be provable from the frame.'
	},

	// --------------------------------------------------------------- about ---
	{
		id: 'about.school',
		category: 'team',
		aspect: '16 / 9',
		alt: {
			en: 'The front of Trabzon Merkez Fen Lisesi with festival stands and bunting along the building.',
			tr: 'Trabzon Merkez Fen Lisesi’nin önü; bina boyunca festival standları ve flamalar.'
		},
		caption: {
			en: 'Trabzon Merkez Fen Lisesi, with the festival stands along the front.',
			tr: 'Trabzon Merkez Fen Lisesi; önünde festival standları.'
		},
		need: 'Trabzon Merkez Fen Lisesi as a place: the building, a corridor, or the room the team works in.'
	},
	{
		id: 'about.people',
		category: 'steamfest',
		aspect: '3 / 2',
		alt: {
			en: 'Team members and their coach standing together behind the chemistry stand they built for Spor STEAM Fest ’26.',
			tr: 'Spor STEAM Fest ’26 için kurdukları kimya standının arkasında bir arada duran takım üyeleri ve koçları.'
		},
		caption: {
			en: 'The team and its coach behind the chemistry stand.',
			tr: 'Kimya standının arkasında takım ve koçu.'
		},
		need: 'The team as itself, on its own stand. Identity provable from the frame; no individual is named.'
	},
	{
		id: 'about.protocol',
		category: 'trabzonspor',
		aspect: '3 / 2',
		need: 'The Trabzonspor cooperation protocol signing, or the team at the club. Institutional but not stiff.'
	},

	// ---------------------------------------------------------------- team ---
	{
		id: 'team.group',
		category: 'team',
		aspect: '16 / 9',
		need: 'The whole team together. The one deliberately posed photograph on the site.'
	},
	// ------------------------------------------------------ infrastructure ---
	{
		id: 'team.infrastructure',
		category: 'infrastructure',
		aspect: '16 / 10',
		alt: {
			en: 'Three team members in lab coats standing behind their own chemistry stand at Spor STEAM Fest ’26.',
			tr: 'Spor STEAM Fest ’26’da kendi kimya standının arkasında duran önlüklü üç takım üyesi.'
		},
		caption: {
			en: 'The team on its own stand at Spor STEAM Fest ’26.',
			tr: 'Spor STEAM Fest ’26’da kendi standının başında takım.'
		},
		/* Still wanted: the platform actually in use. Until then this slot shows
		   the people who run it, which is honest; the previous photograph showed
		   people who are not on the team at all, which was not. */
		need: 'Ekip Ro6one in use — a screen during a meeting, shot as a photograph of people working, not a bare UI capture.'
	},

	// ------------------------------------------------------------ robotics ---
	{
		id: 'robotics.build',
		category: 'robotics',
		aspect: '3 / 2',
		need: 'Fabrication in progress: a machined part, a subassembly on the bench, wiring being routed.'
	},
	{
		id: 'robotics.field',
		category: 'offseason',
		aspect: '16 / 9',
		alt: {
			en: 'A full FRC competition field built inside a sports hall, with three robots and yellow game pieces across it.',
			tr: 'Spor salonunun içine kurulmuş tam bir FRC yarışma sahası; üzerinde üç robot ve sarı oyun topları.'
		},
		caption: {
			en: 'A full FRC field, built inside a sports hall — Trabzon, July 2026.',
			tr: 'Spor salonuna kurulmuş tam bir FRC sahası — Trabzon, Temmuz 2026.'
		},
		need: 'What an FRC field actually is, for a page that has no competition robot of its own to show yet.'
	},
	{
		id: 'robotics.station',
		category: 'offseason',
		aspect: '3 / 2',
		alt: {
			en: 'The driver station during a match, with the field screen and match timer running.',
			tr: 'Maç sırasında sürücü istasyonu; saha ekranı ve maç sayacı çalışıyor.'
		},
		caption: {
			en: 'The driver station during a match.',
			tr: 'Maç sırasında sürücü istasyonu.'
		},
		need: 'The technical end of a competition, without claiming any robot in frame as ours.'
	},
	{
		id: 'robotics.detail',
		category: 'robotics',
		aspect: '1 / 1',
		need: 'Macro detail of mechanism or electronics. Texture over context.'
	},

	// -------------------------------------------------------------- impact ---
	{
		id: 'impact.steamfest.wide',
		category: 'steamfest',
		aspect: '21 / 9',
		alt: {
			en: 'The volleyball tournament under way in the school sports hall, teams and referee on court.',
			tr: 'Okulun spor salonunda sürmekte olan voleybol turnuvası; sahada takımlar ve hakem.'
		},
		caption: {
			en: 'The volleyball tournament, in the school sports hall.',
			tr: 'Voleybol turnuvası, okulun spor salonunda.'
		},
		need: 'Wide establishing frame of the festival area with both sport and STEM visible in one shot, if such a frame exists.'
	},
	{
		id: 'impact.offseason.stands',
		category: 'offseason',
		aspect: '3 / 2',
		alt: {
			en: 'The crowd along the field barrier watching a match, under the arena stage lights.',
			tr: 'Salon sahne ışıkları altında, bariyer boyunca maçı izleyen kalabalık.'
		},
		caption: {
			en: 'The crowd along the field.',
			tr: 'Saha boyunca kalabalık.'
		},
		need: 'Local visitors — children, families, students who are not on a team — watching the matches.'
	}
] as const satisfies readonly MediaSlot[];

export type MediaSlotId = (typeof slots)[number]['id'];

const registry = new Map<string, MediaSlot>(slots.map((slot) => [slot.id, slot]));

type GeneratedEntry = { srcset: number[][]; ratio: string; source: string };

const generated = eventManifest as Record<string, GeneratedEntry>;

export type ResolvedSlot = MediaSlot & { srcset?: string };

/**
 * Merges a declared slot with whatever scripts/process_media.py produced for it.
 *
 * The division of labour: the script decides pixels (crop, sizes, format) from
 * scripts/event_selection.json, and this file decides words (alt text and
 * caption, in both languages). Neither knows about the other's job, and a
 * component only ever asks for a slot.
 */
export function getMediaSlot(id: MediaSlotId): ResolvedSlot {
	const slot = registry.get(id);

	if (!slot) throw new Error(`Unknown media slot: ${id}`);

	const entry = generated[id];

	if (!entry) return slot;

	const base = `/media/events/${id}`;

	return {
		...slot,
		src: `${base}-${entry.srcset.at(-1)?.[0] ?? 1280}.webp`,
		srcset: entry.srcset.map((pair) => `${base}-${pair[0]}.webp ${pair[1]}w`).join(', ')
	};
}

/** True once a slot has real photography behind it. */
export function hasImage(id: MediaSlotId): boolean {
	return Boolean(getMediaSlot(id).src);
}
