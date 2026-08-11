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
		need: 'Sport half of Spor STEAM Fest: football or volleyball action, students in the hall.'
	},
	{
		id: 'home.steamfest.lab',
		category: 'steamfest',
		aspect: '3 / 2',
		need: 'STEM half: a stand mid-demonstration, visitors leaning in, an experiment or a line-following robot on the floor.'
	},
	{
		id: 'home.offseason.wide',
		category: 'offseason',
		aspect: '21 / 9',
		need: 'Widest available frame of the field at Hayri Gür — full field, pits or stands visible. This is the largest image on the site.'
	},
	{
		id: 'home.offseason.detail',
		category: 'offseason',
		aspect: '1 / 1',
		need: 'Tight detail: a robot on the field, a driver station, or hands on a controller during a match.'
	},
	{
		id: 'home.offseason.people',
		category: 'offseason',
		aspect: '4 / 5',
		need: 'A human moment — volunteers, a queue of teams, the crowd, or the event mascot in context.'
	},

	// --------------------------------------------------------------- about ---
	{
		id: 'about.school',
		category: 'team',
		aspect: '16 / 9',
		need: 'Trabzon Merkez Fen Lisesi as a place: the building, a corridor, or the room the team works in.'
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
		need: 'Wide establishing frame of the festival area with both sport and STEM visible in one shot, if such a frame exists.'
	},
	{
		id: 'impact.offseason.stands',
		category: 'offseason',
		aspect: '3 / 2',
		need: 'Local visitors — children, families, students who are not on a team — watching the matches.'
	}
] as const satisfies readonly MediaSlot[];

export type MediaSlotId = (typeof slots)[number]['id'];

const registry = new Map<string, MediaSlot>(slots.map((slot) => [slot.id, slot]));

export function getMediaSlot(id: MediaSlotId): MediaSlot {
	const slot = registry.get(id);

	if (!slot) throw new Error(`Unknown media slot: ${id}`);

	return slot;
}

/** True once a slot has real photography behind it. */
export function hasImage(id: MediaSlotId): boolean {
	return Boolean(getMediaSlot(id).src);
}
